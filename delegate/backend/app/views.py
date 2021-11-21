import pprint

from flask import url_for, redirect, render_template, flash, g, session, request, jsonify
from app import app
from web3.providers.eth_tester import EthereumTesterProvider
from web3 import Web3
from eth_tester import PyEVMBackend

from app.utils import deploy_contract, compile_source_file




@app.route("/api/", methods=['post', ])
def poh_check():
    app.logger.debug(request.json)

    signer = request.json.get('address')
    message = request.json.get('message')
    signature = request.json.get('signature')
    if signer and message and signature:
        data = f"signer: {signer}, message: {message}, signed value: {signature}"
        w3 = Web3(EthereumTesterProvider(PyEVMBackend()))

        contract_source_path = '../../contracts/Evidence.sol'
        compiled_sol = compile_source_file(contract_source_path)

        contract_id, contract_interface = compiled_sol.popitem()

        abi_path = '../../abi/CoreEvidence.json'
        address, abi = deploy_contract(w3, contract_interface, abi_path)
        print(f'Deployed {contract_id} to: {address}\n')
        # TODO here the interaction with contract should be done
        # store_var_contract = w3.eth.contract(address=address, abi=abi)
        #
        # gas_estimate = store_var_contract.functions.setVar(255).estimateGas()
        # print(f'Gas estimate to transact with setVar: {gas_estimate}')
        #
        # if gas_estimate < 100000:
        #     print("Sending transaction to setVar(255)\n")
        #     tx_hash = store_var_contract.functions.setVar(255).transact()
        #     receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        #     print("Transaction receipt mined:")
        #     pprint.pprint(dict(receipt))
        #     print("\nWas transaction successful?")
        #     pprint.pprint(receipt["status"])
        # else:
        #     print("Gas cost exceeds 100000")
        app.logger.info(data)
        return jsonify({
            "message": "data received successfully",
            "identity_text": "SomeIdentityTextValue"
        }), 200
    else:
        return jsonify({
            "message": "Error, data is not valid"
        }), 400


@app.route("/api/verify/", methods=['post', ])
def verify():
    app.logger.debug(request.json)

    textToVerify = request.json.get('verifyText')
    print(textToVerify)
    if textToVerify:
        return jsonify({
                "message": "data received successfully",

            }), 200
    else:
        return jsonify({
            "message": "Error, data is not valid"
        }), 400