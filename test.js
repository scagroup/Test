//Test
    /*
    * Write string preparation function, which fill template in with data from
    * specified object
    *
    * Data object
    * user: {
    * id: 20
    * type_id: 'test'
    * }
    *
    * Template: /api/items/%id%/%type_id%
    * Expected result: /api/items/20/test
    */
    const user = {
        id: 20,
        name: "John Dow",
        role: "QA",
        salary: 100
    };
    
    const apiTemplatesSet1 = [
        "/api/items/%id%/%name%",
        "/api/items/%id%/%role%",
        "/api/items/%id%/%salary%"
    ];
    
    var mySplit = (line) => {
        result = "";
        separator = "/"
        if (line.substr(0, 1) == separator){
            result = line.trim().substr(1, line.length);
        } else if (line.substr(-1) == separator){
            result = line.trim().slice(1, line.length-1);
        } else result = line;
        
        return result.split(separator);
    }
    
    const apiPathes = apiTemplatesSet1.map(apiPathTemplate => {
        return getApiPath(user, apiPathTemplate);
    });
    
    function getApiPath(obj, template) {
        let result = "";
        if (obj.name && obj.role && obj.salary){
                let vartemp = mySplit(template);
                let res = [];
                vartemp.forEach((arr, i) => {
                    if (arr.substr(-1) == "%" && arr.substr(0,1) == "%"){
                        res[i] = obj[arr.slice(1, arr.length -1)];
                    }else{
                        res[i] = arr;
                    }
                })
                result = "/" + res.join("/");
        }
        return result;
    }
    console.log(JSON.stringify(apiPathes));
    /*
    * expected:
    * ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"]
    */
//Test
