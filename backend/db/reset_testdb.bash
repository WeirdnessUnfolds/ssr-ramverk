mongosh --eval "use testdocs" --eval "db.dropDatabase()"
mongoimport --db testdocs -c testcollection --jsonArray convertedsqldb.json