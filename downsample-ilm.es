// ILM Policy for Downsampling a data stream

/*

./gradlew run -Dtests.heap.size=4G -Dtests.jvm.argline="-da" \
     -Dtests.es.indices.lifecycle.poll_interval=60s \
     -Dtests.es.xpack.security.enabled=false \
     -Dtests.es.xpack.license.self_generated.type=trial
*/

PUT _ilm/policy/datastream_policy   
{
  "policy": {                       
    "phases": {
      "hot": {                      
        "actions": {
          "rollover": {             
            "max_docs": 1
          },
          "rollup": {
  	        "config": {
  	          "fixed_interval": "1h"
  	        }
  	      }
        }
      }
    }
  }
}



DELETE _index_template/datastream_template

PUT _index_template/datastream_template
{
    "index_patterns": ["datastream*"],
    "data_stream": { },
    "template": {
        "settings": {
            "index": {
                "mode": "time_series",
                "number_of_replicas": 0,
                "number_of_shards": 2
            },
            "index.lifecycle.name": "datastream_policy"
        },
        "mappings": {
            "properties": {
                "@timestamp": {
                    "type": "date"
                },
                "kubernetes": {
                    "properties": {
                        "container": {
                            "properties": {
                                "cpu": {
                                    "properties": {
                                        "usage": {
                                            "properties": {
                                                "core": {
                                                    "properties": {
                                                        "ns": {
                                                            "type": "long"
                                                        }
                                                    }
                                                },
                                                "limit": {
                                                    "properties": {
                                                        "pct": {
                                                            "type": "float"
                                                        }
                                                    }
                                                },
                                                "nanocores": {
                                                    "type": "long",
                                                    "time_series_metric": "gauge"
                                                },
                                                "node": {
                                                    "properties": {
                                                        "pct": {
                                                            "type": "float"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "memory": {
                                    "properties": {
                                        "available": {
                                            "properties": {
                                                "bytes": {
                                                    "type": "long",
                                                    "time_series_metric": "gauge"
                                                }
                                            }
                                        },
                                        "majorpagefaults": {
                                            "type": "long"
                                        },
                                        "pagefaults": {
                                            "type": "long",
                                            "time_series_metric": "gauge"
                                        },
                                        "rss": {
                                            "properties": {
                                                "bytes": {
                                                    "type": "long",
                                                    "time_series_metric": "gauge"
                                                }
                                            }
                                        },
                                        "usage": {
                                            "properties": {
                                                "bytes": {
                                                    "type": "long",
                                                    "time_series_metric": "gauge"
                                                },
                                                "limit": {
                                                    "properties": {
                                                        "pct": {
                                                            "type": "float"
                                                        }
                                                    }
                                                },
                                                "node": {
                                                    "properties": {
                                                        "pct": {
                                                            "type": "float"
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "workingset": {
                                            "properties": {
                                                "bytes": {
                                                    "type": "long",
                                                    "time_series_metric": "gauge"
                                                }
                                            }
                                        }
                                    }
                                },
                                "name": {
                                    "type": "keyword"
                                },
                                "start_time": {
                                    "type": "date"
                                }
                            }
                        },
                        "host": {
                            "type": "keyword",
                            "time_series_dimension": true
                        },
                        "namespace": {
                            "type": "keyword",
                            "time_series_dimension": true
                        },
                        "node": {
                            "type": "keyword",
                            "time_series_dimension": true
                        },
                        "pod": {
                            "type": "keyword",
                            "time_series_dimension": true
                        }
                    }
                }
            }
        }
    }
}




PUT /datastream/_bulk?refresh
{"create": {}}
{"@timestamp":"2022-06-21T09:49:00Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":91153,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":463314616},"usage":{"bytes":307007078,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":585236},"rss":{"bytes":102728},"pagefaults":120901,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:45:50Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":124501,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":982546514},"usage":{"bytes":360035574,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":1339884},"rss":{"bytes":381174},"pagefaults":178473,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:44:50Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":38907,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":862723768},"usage":{"bytes":379572388,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":431227},"rss":{"bytes":386580},"pagefaults":233166,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:44:40Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":86706,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":567160996},"usage":{"bytes":103266017,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":1724908},"rss":{"bytes":105431},"pagefaults":233166,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:44:00Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":150069,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":639054643},"usage":{"bytes":265142477,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":1786511},"rss":{"bytes":189235},"pagefaults":138172,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:42:40Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":82260,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":854735585},"usage":{"bytes":309798052,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":924058},"rss":{"bytes":110838},"pagefaults":259073,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:42:10Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":153404,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":279586406},"usage":{"bytes":214904955,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":1047265},"rss":{"bytes":91914},"pagefaults":302252,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:40:20Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":125613,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":822782853},"usage":{"bytes":100475044,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":2109932},"rss":{"bytes":278446},"pagefaults":74843,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:40:10Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":100046,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":567160996},"usage":{"bytes":362826547,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":1986724},"rss":{"bytes":402801},"pagefaults":296495,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}
{"create": {}}
{"@timestamp":"2022-06-21T09:38:30Z","kubernetes":{"host":"gke-apps-0","node":"gke-apps-0-0","pod":"gke-apps-0-0-0","container":{"cpu":{"usage":{"nanocores":40018,"core":{"ns":12828317850},"node":{"pct":2.77905e-05},"limit":{"pct":2.77905e-05}}},"memory":{"available":{"bytes":1062428344},"usage":{"bytes":265142477,"node":{"pct":0.01770037710617187},"limit":{"pct":9.923134671484496e-05}},"workingset":{"bytes":2294743},"rss":{"bytes":340623},"pagefaults":224530,"majorpagefaults":0},"start_time":"2021-03-30T07:59:06Z","name":"container-name-44"},"namespace":"namespace26"}}




GET datastream/_search


GET _data_stream




GET /.ds-datastream-*/_ilm/explain


GET /_data_stream/datastream/_stats?human=true

/////////////////////////


GET _cat/indices

POST /datastream/_refresh

POST /datastream/_rollover








/////////////////////////

DELETE _data_stream/datastream
