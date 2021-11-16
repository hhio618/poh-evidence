from solcx import compile_source


def compile_source_file(file_path):
    with open(file_path, 'r') as f:
        source = f.read()

    return compile_source(source)


def deploy_contract(w3, contract_interface, abi_path):
    abi = None
    with open(abi_path) as f:
        abi = f.read().rstrip()
    if not abi:
        raise ValueError('ABI value is None')
    tx_hash = w3.eth.contract(
        abi=abi,
        bytecode=contract_interface['bin']).constructor().transact()

    address = w3.eth.get_transaction_receipt(tx_hash)['contractAddress']
    return address, abi
