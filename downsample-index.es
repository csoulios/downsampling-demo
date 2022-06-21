DELETE /sample-01*



PUT /sample-01
{
    "settings": {
        "index": {
            "mode": "time_series",
            "time_series": {
                "start_time": "2021-04-01T00:00:00Z",
                "end_time": "2021-04-30T23:59:59Z"
            },
            "routing_path": [
                "kubernetes.namespace", "kubernetes.host", "kubernetes.node","kubernetes.pod"
            ],
            "number_of_replicas": 0,
            "number_of_shards": 2
        }
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




GET /sample-01


GET /sample-01*/_search


/*

curl -s -H "Content-Type: application/json" \
   -XPOST http://localhost:9200/sample-01/_bulk?pretty \
   --data-binary @sample-01-raw.json

*/


GET /sample-01*/_search
{
  "size": 0,
  "aggs": {
    "tsid": {
      "terms": {
        "field": "_tsid"
      },
      "aggs": {
        "over_time": {
          "date_histogram": {
            "field": "@timestamp",
            "fixed_interval": "1d"
          },
          "aggs": {
            "min": {
              "min": {
                "field": "kubernetes.container.memory.usage.bytes"
              }
            },
            "max": {
              "max": {
                "field": "kubernetes.container.memory.usage.bytes"
              }
            },
            "avg": {
              "avg": {
                "field": "kubernetes.container.memory.usage.bytes"
              }
            }
          }
        }
      }
    }
  }
}


PUT /sample-01/_block/write


POST /sample-01/_rollup/sample-01-rollup
{
  "fixed_interval": "1h"
}