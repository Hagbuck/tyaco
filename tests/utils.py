protocol   = 'http'
host       = 'tyaco.fr'
port       = 80
api        = 'api'

url = '{protocol}://{host}:{port}/{api}/{item}?{params}'

def build_url(api_item, params = None):
	return url.format(protocol = protocol, host = host, port = port, api = api, item = api_item, params = params)
