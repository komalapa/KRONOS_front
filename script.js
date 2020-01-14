const testJSONstr=`[
    {
        "locality-guid": "123456789",
        "locality-name": "Москва",
        "locality-type": "город",
        "fedsubj-name": "Москва",
        "fedsubj-type": "г.о.",
        "time-zone": "3"
    },
    {
        "locality-guid": "987654321",
        "locality-name": "Самара",
        "locality-type": "город",
        "fedsubj-name": "Самарская",
        "fedsubj-type": "обл.",
        "time-zone": "4"
    },
    {
        "locality-guid": "987654999",
        "locality-name": "Сергеевка",
        "locality-type": "деревня",
        "fedsubj-name": "Самарская",
        "fedsubj-type": "обл.",
        "time-zone": "4"
    }
]`

var glCurrentTime;
var glCurrentZone;

function findJSONPart(searchStr){
    //console.log(testJSONstr);
    let JSONforSearch = JSON.parse(testJSONstr);
    //console.log(JSONforSearch);
    //console.log("json 1 ln: "+JSONforSearch[1]["locality-name"]);
    //console.log("indexof: "+JSONforSearch[1]["locality-name"].indexOf(searchStr));
    //JSONforSearch.forEach(() =>{
    //});
    for(let i in JSONforSearch){
        //console.log("JS str: "+ JSONforSearch[i]["locality-name"]);
        //console.log("searchSTR: "+ searchStr)
        //console.log("indexof: "+JSONforSearch[i]["locality-name"].indexOf(searchStr));
        if(JSONforSearch[i]["locality-name"].indexOf(searchStr)!=-1){
            //console.log("!!!!: "+JSONforSearch[i]["locality-name"]);
            let findObj = Object.assign({}, JSONforSearch[i]);
            return JSONforSearch[i];
        } 
      }
}
//не ожидает "половинчатых" зон
    function getUserTimeZone(){
        var d = new Date();
        timeZoneMinutes = d.getTimezoneOffset();
        timeZoneHours=(-1)*timeZoneMinutes/60;
        glCurrentZone=timeZoneHours;
        if (timeZoneHours>0) {
            return ("GMT +"+timeZoneHours); 
        }
        return ("GMT "+timeZoneHours);
    }

    function getUserTime(){
        var time = new Date(Date.now());
        glCurrentTime = time;
        return time;
    };

new Vue({
    el: '#searchAPP',
    data: {
        searchStr:"Населенный пункт",
        localityGuid: "",
        localityName: "",
        localityType: "",
        fedsubjName: "",
        fedsubjType: "",
        timeZone: "",
        localityTime: "",
        starOFF: "",
        starOFFalt: ""
    },
    methods:{
        searchLocStr: function(){
            //console.log("searchSTR: "+this.searchStr);
            //console.log("search-result"+findJSONPart(this.searchStr));
            
            let found = findJSONPart(this.searchStr);
            let localityTimeStr=(glCurrentTime.getHours()-parseInt(glCurrentZone)+parseInt(found["time-zone"]))+":"+(glCurrentTime.getMinutes());
            this.localityGuid=found["locality-guid"];
            this.localityName=found["locality-name"];
            this.localityType=found["locality-type"];
            this.fedsubjName=found["fedsubj-name"];
            this.fedsubjType=found["fedsubj-type"];
            this.timeZone="GMT +"+found["time-zone"];
            this.localityTime=localityTimeStr;
            this.starOFF="img/icons/grade-24px.svg";
            this.starOFFalt="star off";

            //console.log(this);
        }
    }
  })

  new Vue({
    el: 'footer',
    data: {
        currentTime:"",
        currentZone:""
    },
    methods:{
        getUserZone: function(){
            this.currentZone=getUserTimeZone();
            console.log(this.currentZone);
        },
        getUserTime: function(){
            time= getUserTime();
            console.log(time);
            console.log(time.getHours());
            this.currentTime=time.getHours()+":"+time.getMinutes();
            console.log(this.currentTime);
        }
    },
    created: function(){
        this.getUserZone(),
        this.getUserTime()
    }
    
  })
