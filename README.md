## Demo of Downsampling action for Elasticsearch TSDB


Run elasticsearch with the following settings:

```sh
./gradlew run -Dtests.heap.size=4G -Dtests.jvm.argline="-da" \
     -Dtests.es.indices.lifecycle.poll_interval=60s \
     -Dtests.es.xpack.security.enabled=false \
     -Dtests.es.xpack.license.self_generated.type=trial
```