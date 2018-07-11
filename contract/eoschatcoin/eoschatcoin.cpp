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

class eoschatcoin : public eosio::contract 
{
public:
	using contract::contract;
	eoschatcoin(account_name self):
		eosio::contract(self),
		ttts(_self, _self)
	{
	  
	}
	
	/// @abi action 	
	void mine(const account_name caller,const account_name from,const account_name to,uint64_t pkey)
	{
		eosio_assert(caller == N(eoschat), "caller != N(eoschat)");
		require_auth(caller);
		auto itr = ttts.find(caller);
		if (itr == ttts.end())
		{
			ttts.emplace(_self,
			[&](auto& t){
				t.caller = caller;
				t.from = from;
				t.to = to;
				t.pkey = pkey;
			});
		}
		else
		{
			ttts.modify(itr,_self,
			[&](auto& t){
				t.caller = caller;
				t.from = from;
				t.to = to;
				t.pkey = pkey;
			});
		}
	}


private:
	
	//@abi table ttt i64
	struct ttt
	{
		account_name caller;
		account_name from;
		account_name to;
		uint64_t pkey;

		uint64_t primary_key()const { return caller; }

		EOSLIB_SERIALIZE( ttt, (caller)(from)(to)(pkey) )
	};
	typedef eosio::multi_index< N(ttt), ttt> ttt_index;
	ttt_index ttts;


};

EOSIO_ABI( eoschatcoin, (mine) )


