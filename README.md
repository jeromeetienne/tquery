## How to Get Started

or how to get the boilerplate :)
boilerplate for tquery is a template to get you started. You download it and
modify it until it fits your needs. It is a fast way to start a
clean project with tquery.
So first you get the files, then you launch the http server to serve them

```bash
curl -OL https://github.com/downloads/jeromeetienne/tquery/tqueryboilerplate.zip
unzip tqueryboilerplate.zip
cd tqueryboilerplate
make server
```

Then you open a browser on [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to
see it running. Up to you to modify index.html until it fits your needs. 

```html
<!doctype html><title>Minimal tQuery Page</title>
<script src="./tquery-all.js"></script>
<body><script>
    var world   = tQuery.createWorld().boilerplate().start();
    var object  = tQuery.createTorus().addTo(world);
</script></body>
```