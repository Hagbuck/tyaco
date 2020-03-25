protocol   = 'http'
host       = 'localhost'
port       = 2020
api        = 'api'
def_params = 'token=123'

url = '{protocol}://{host}:{port}/{api}/{item}?{params}'

def build_url(api_item, params = None):
	p = def_params
	if params:
		p += '&' + params
	return url.format(protocol = protocol, host = host, port = port, api = api, item = api_item, params = p)
