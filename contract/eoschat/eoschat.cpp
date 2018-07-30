#include <utility>
#include <vector>
#include <string>
#include <eosiolib/eosio.hpp>
#include <eosiolib/contract.hpp>
#include <eosiolib/crypto.h>
#include <eosiolib/system.h>

using eosio::indexed_by;
using eosio::const_mem_fun;
using eosio::print;
using eosio::name;
using eosio::permission_level;
using eosio::action;
using eosio::pack;

class eoschat : public eosio::contract 
{
public:
	using contract::contract;
	eoschat(account_name self):
		eosio::contract(self),
		msgs(_self, _self),
		readtags(_self,_self),
		maxids(_self,_self),
		upuks(_self,_self)
	{
	  
	}
	
	/// @abi action 	
	void send(const account_name from,const account_name to,bool encrypt,uint16_t dataType,std::string data)
	{
		require_auth(from);
		auto itr = msgs.emplace(from,
		[&](auto& m){
			m.pkey = getMaxID();
			m.to = to;
			m.from = from;
			m.encrypt = encrypt;
			m.dataType = dataType;
            m.data = data;
			m.tot = (uint128_t(to) << 64) + uint128_t(current_time());
		});
		//auto a = action();
		//a.account = N(eoschatcoin);
		//a.name = N(mine);
		//a.data = pack(std::make_tuple(_self,from,to,itr->pkey));
		//a.send();
		
		action(
			permission_level{ _self, N(active) },
			N(eoschatcoin), N(mine),
			std::make_tuple(_self,from,to,itr->pkey)
		).send();
	}
	
	/// @abi action 
	void del(uint64_t pkey)
	{
		auto itr = msgs.find(pkey);
		eosio_assert( itr != msgs.end(), "pkey does not exists" );
		require_auth(itr->from);
		msgs.erase(itr);
	}

	/// @abi action 
	void tag(account_name owner,uint64_t tag)
	{
		require_auth(owner);
		if (tag == 0)
		{
			auto itr = readtags.find(owner);
			if (itr != readtags.end())
			{
				readtags.erase(itr);
			}
			return;
		}
		auto itr = readtags.find(owner);
		if (itr == readtags.end())
		{
			readtags.emplace(owner,
			[&](auto& rt){
				rt.owner = owner;
				rt.tag = tag;
			});
		}
		else
		{
			readtags.modify(itr, owner,
			[&](auto& rt){
				rt.owner = owner;
				rt.tag = tag;
            });
		}
	}
	
	/// @abi action 
	void setpubkey(account_name owner,std::string pubkey)
	{
		require_auth(owner);
		auto itr = upuks.find(owner);
		if (itr == upuks.end())
		{
			upuks.emplace(owner,
			[&](auto& u){
				u.user = owner;
				u.pubkey = pubkey;
				u.version = 1;
			});
		}
		else
		{
			upuks.modify(itr, owner,
			[&](auto& u){
				u.user = owner;
				u.pubkey = pubkey;
				++ u.version;
            });
		}
	}

private:
	
	//@abi table msgtt i64
	struct msgt
	{
		uint64_t pkey;
		account_name to;
		account_name from;
		bool encrypt;
		uint16_t dataType;
		std::string data;
		uint128_t tot;

		uint64_t primary_key()const { return pkey; }
		account_name by_to()const { return to; }
		uint128_t by_tot()const { return tot; }

		EOSLIB_SERIALIZE( msgt, (pkey)(to)(from)(encrypt)(dataType)(data)(tot) )
	};
	typedef eosio::multi_index< N(msgtt), msgt,
		indexed_by< N(byto), const_mem_fun<msgt, account_name, &msgt::by_to > > ,
		indexed_by< N(bytot), const_mem_fun<msgt, uint128_t, &msgt::by_tot > > 
	> msgt_index;
	msgt_index msgs;

	//@abi table readtag i64
	struct readtag
	{
		account_name owner;
		uint64_t tag;

		uint64_t primary_key()const { return owner; }

		EOSLIB_SERIALIZE( readtag, (owner)(tag) )
	};
	typedef eosio::multi_index< N(readtag), readtag> readtag_index;
	readtag_index readtags;

	uint64_t getMaxID()
	{
		auto itr = maxids.find(1);
		if (itr == maxids.end())
		{
			maxids.emplace(_self,[&](auto& m){
				m.k = 1;
				m.v = 100;
			});
			return 100;
		}
		else
		{
			uint64_t r = itr->v + 1;
			maxids.modify(itr,_self,
			[&](auto& m){
				m.k = 1;
				m.v = r;
			});
			return r;
		}
	}

	//@abi table maxid i64
	struct maxid
	{
		uint64_t k;
		uint64_t v;

		uint64_t primary_key()const { return k; }

		EOSLIB_SERIALIZE( maxid, (k)(v) )
	};
	typedef eosio::multi_index< N(maxid), maxid> maxid_index;
	maxid_index maxids;

	//@abi table upuk i64
	struct upuk // user public key
	{
		account_name user;
		std::string pubkey;
		uint64_t version;

		uint64_t primary_key()const { return user; }

		EOSLIB_SERIALIZE( upuk, (user)(pubkey)(version) )
	};
	eosio::multi_index< N(upuk), upuk> upuks;


};

EOSIO_ABI( eoschat, (send)(del)(tag)(setpubkey) )


