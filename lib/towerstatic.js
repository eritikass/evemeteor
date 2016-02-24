/**
 * Created by eritikass on 24/02/16.
 */


// @link https://github.com/eritikass/google_spreadsheet_eve_postracker/blob/master/towerdata.gs#L36
POS_DATA = {
    "12235":{
        "typeID":"12235",
        "typeName":"Amarr Control Tower",
        "fuel":{
            "hour":40,
            "typeID":4247
        }
    },
    "20059":{
        "typeID":"20059",
        "typeName":"Amarr Control Tower Medium",
        "fuel":{
            "hour":20,
            "typeID":4247
        }
    },
    "20060":{
        "typeID":"20060",
        "typeName":"Amarr Control Tower Small",
        "fuel":{
            "hour":10,
            "typeID":4247
        }
    },
    "27539":{
        "typeID":"27539",
        "typeName":"Angel Control Tower",
        "fuel":{
            "hour":36,
            "typeID":4246
        }
    },
    "27607":{
        "typeID":"27607",
        "typeName":"Angel Control Tower Medium",
        "fuel":{
            "hour":18,
            "typeID":4246
        }
    },
    "27610":{
        "typeID":"27610",
        "typeName":"Angel Control Tower Small",
        "fuel":{
            "hour":9,
            "typeID":4246
        }
    },
    "27530":{
        "typeID":"27530",
        "typeName":"Blood Control Tower",
        "fuel":{
            "hour":36,
            "typeID":4247
        }
    },
    "27589":{
        "typeID":"27589",
        "typeName":"Blood Control Tower Medium",
        "fuel":{
            "hour":18,
            "typeID":4247
        }
    },
    "27592":{
        "typeID":"27592",
        "typeName":"Blood Control Tower Small",
        "fuel":{
            "hour":9,
            "typeID":4247
        }
    },
    "16213":{
        "typeID":"16213",
        "typeName":"Caldari Control Tower",
        "fuel":{
            "hour":40,
            "typeID":4051
        }
    },
    "20061":{
        "typeID":"20061",
        "typeName":"Caldari Control Tower Medium",
        "fuel":{
            "hour":20,
            "typeID":4051
        }
    },
    "20062":{
        "typeID":"20062",
        "typeName":"Caldari Control Tower Small",
        "fuel":{
            "hour":10,
            "typeID":4051
        }
    },
    "27532":{
        "typeID":"27532",
        "typeName":"Dark Blood Control Tower",
        "fuel":{
            "hour":32,
            "typeID":4247
        }
    },
    "27591":{
        "typeID":"27591",
        "typeName":"Dark Blood Control Tower Medium",
        "fuel":{
            "hour":16,
            "typeID":4247
        }
    },
    "27594":{
        "typeID":"27594",
        "typeName":"Dark Blood Control Tower Small",
        "fuel":{
            "hour":8,
            "typeID":4247
        }
    },
    "27540":{
        "typeID":"27540",
        "typeName":"Domination Control Tower",
        "fuel":{
            "hour":32,
            "typeID":4246
        }
    },
    "27609":{
        "typeID":"27609",
        "typeName":"Domination Control Tower Medium",
        "fuel":{
            "hour":16,
            "typeID":4246
        }
    },
    "27612":{
        "typeID":"27612",
        "typeName":"Domination Control Tower Small",
        "fuel":{
            "hour":8,
            "typeID":4246
        }
    },
    "27535":{
        "typeID":"27535",
        "typeName":"Dread Guristas Control Tower",
        "fuel":{
            "hour":32,
            "typeID":4051
        }
    },
    "27597":{
        "typeID":"27597",
        "typeName":"Dread Guristas Control Tower Medium",
        "fuel":{
            "hour":16,
            "typeID":4051
        }
    },
    "27600":{
        "typeID":"27600",
        "typeName":"Dread Guristas Control Tower Small",
        "fuel":{
            "hour":8,
            "typeID":4051
        }
    },
    "12236":{
        "typeID":"12236",
        "typeName":"Gallente Control Tower",
        "fuel":{
            "hour":40,
            "typeID":4312
        }
    },
    "20063":{
        "typeID":"20063",
        "typeName":"Gallente Control Tower Medium",
        "fuel":{
            "hour":20,
            "typeID":4312
        }
    },
    "20064":{
        "typeID":"20064",
        "typeName":"Gallente Control Tower Small",
        "fuel":{
            "hour":10,
            "typeID":4312
        }
    },
    "27533":{
        "typeID":"27533",
        "typeName":"Guristas Control Tower",
        "fuel":{
            "hour":36,
            "typeID":4051
        }
    },
    "27595":{
        "typeID":"27595",
        "typeName":"Guristas Control Tower Medium",
        "fuel":{
            "hour":18,
            "typeID":4051
        }
    },
    "27598":{
        "typeID":"27598",
        "typeName":"Guristas Control Tower Small",
        "fuel":{
            "hour":9,
            "typeID":4051
        }
    },
    "16214":{
        "typeID":"16214",
        "typeName":"Minmatar Control Tower",
        "fuel":{
            "hour":40,
            "typeID":4246
        }
    },
    "20065":{
        "typeID":"20065",
        "typeName":"Minmatar Control Tower Medium",
        "fuel":{
            "hour":20,
            "typeID":4246
        }
    },
    "20066":{
        "typeID":"20066",
        "typeName":"Minmatar Control Tower Small",
        "fuel":{
            "hour":10,
            "typeID":4246
        }
    },
    "27780":{
        "typeID":"27780",
        "typeName":"Sansha Control Tower",
        "fuel":{
            "hour":36,
            "typeID":4247
        }
    },
    "27782":{
        "typeID":"27782",
        "typeName":"Sansha Control Tower Medium",
        "fuel":{
            "hour":18,
            "typeID":4247
        }
    },
    "27784":{
        "typeID":"27784",
        "typeName":"Sansha Control Tower Small",
        "fuel":{
            "hour":9,
            "typeID":4247
        }
    },
    "27536":{
        "typeID":"27536",
        "typeName":"Serpentis Control Tower",
        "fuel":{
            "hour":36,
            "typeID":4312
        }
    },
    "27601":{
        "typeID":"27601",
        "typeName":"Serpentis Control Tower Medium",
        "fuel":{
            "hour":18,
            "typeID":4312
        }
    },
    "27604":{
        "typeID":"27604",
        "typeName":"Serpentis Control Tower Small",
        "fuel":{
            "hour":9,
            "typeID":4312
        }
    },
    "27538":{
        "typeID":"27538",
        "typeName":"Shadow Control Tower",
        "fuel":{
            "hour":32,
            "typeID":4312
        }
    },
    "27603":{
        "typeID":"27603",
        "typeName":"Shadow Control Tower Medium",
        "fuel":{
            "hour":16,
            "typeID":4312
        }
    },
    "27606":{
        "typeID":"27606",
        "typeName":"Shadow Control Tower Small",
        "fuel":{
            "hour":8,
            "typeID":4312
        }
    },
    "27786":{
        "typeID":"27786",
        "typeName":"True Sansha Control Tower",
        "fuel":{
            "hour":32,
            "typeID":4247
        }
    },
    "27788":{
        "typeID":"27788",
        "typeName":"True Sansha Control Tower Medium",
        "fuel":{
            "hour":16,
            "typeID":4247
        }
    },
    "27790":{
        "typeID":"27790",
        "typeName":"True Sansha Control Tower Small",
        "fuel":{
            "hour":8,
            "typeID":4247
        }
    }
};