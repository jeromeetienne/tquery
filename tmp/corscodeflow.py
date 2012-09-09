from urllib2 import urlopen, HTTPError
from httplib import responses
from traceback import format_exc

def application(environ, start_response):
    req = None
    try:
        url = environ['PATH_INFO'].lstrip('/')
        if url.startswith('http'):
            req = urlopen(url)

            start_response('200 OK', [
                ('Content-Type', req.headers['content-type']),
                ('Access-Control-Allow-Origin', '*'),
            ])

            return [req.read()]
        else:
            start_response('400 Bad Request', [
                ('Content-Type', 'text/plain'),
                ('Access-Control-Allow-Origin', '*'),
            ])
            return ['Bad Request']

    except HTTPError, error:
        msg = '%i %s' % (error.code, responses[error.code])
        start_response(msg, [
            ('Content-Type', 'text/plain'),
            ('Access-Control-Allow-Origin', '*'),
        ])
        return [msg]
    except:
        content = format_exc()
        start_response('500 Server Error', [
            ('Content-Type', 'text/plain'),
            ('Access-Control-Allow-Origin', '*'),
        ])
        return [content]
    finally:
        if req: req.close()