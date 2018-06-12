"use strict"
window.addEventListener("load", gettingData);
let data;
//Getting data every 10 seconds
setInterval(gettingData, 100000000);

let allOrders = 0; 
let b1Customers = [], b2Customers = [], b3Customers = [], i;
let mydata = {"timestamp":1528704419454,"bar":{"name":"FooBar","closingTime":"22:00:00"},"queue":[{"id":8,"startTime":1528704336575,"order":["Hoppily Ever After","Hoppily Ever After","Mowintime","Ruined Childhood"]},{"id":9,"startTime":1528704336575,"order":["Mowintime"]},{"id":10,"startTime":1528704396577,"order":["Hollaback Lager","Steampunk"]},{"id":11,"startTime":1528704396577,"order":["Mowintime","Mowintime"]}],"serving":[{"id":5,"startTime":1528704336575,"order":["Hollaback Lager","Hollaback Lager","Mowintime","Mowintime"]},{"id":6,"startTime":1528704336575,"order":["Hoppily Ever After","Hoppily Ever After","Steampunk"]},{"id":7,"startTime":1528704336575,"order":["Hoppily Ever After","Mowintime","Mowintime","Steampunk"]}],"bartenders":[{"name":"Peter","status":"WORKING","statusDetail":"pourBeer","usingTap":3,"servingCustomer":7},{"name":"Jonas","status":"WORKING","statusDetail":"pourBeer","usingTap":1,"servingCustomer":5},{"name":"Martin","status":"WORKING","statusDetail":"pourBeer","usingTap":2,"servingCustomer":6}],"taps":[{"id":0,"level":2300,"capacity":2500,"beer":"Hoppily Ever After","inUse":false},{"id":1,"level":2200,"capacity":2500,"beer":"Mowintime","inUse":true},{"id":2,"level":2400,"capacity":2500,"beer":"Steampunk","inUse":true},{"id":3,"level":2450,"capacity":2500,"beer":"Hoppily Ever After","inUse":true},{"id":4,"level":2450,"capacity":2500,"beer":"Ruined Childhood","inUse":false},{"id":5,"level":2350,"capacity":2500,"beer":"Hollaback Lager","inUse":false},{"id":6,"level":2400,"capacity":2500,"beer":"Mowintime","inUse":false}],"storage":[{"name":"El Hefe","amount":5},{"name":"Fairy Tale Ale","amount":5},{"name":"GitHop","amount":6},{"name":"Hollaback Lager","amount":4},{"name":"Hoppily Ever After","amount":6},{"name":"Mowintime","amount":6},{"name":"Row 26","amount":9},{"name":"Ruined Childhood","amount":5},{"name":"Sleighride","amount":2},{"name":"Steampunk","amount":8}]};

function gettingData(){
    
    let dashboardBarInfo = document.querySelector(".bar-info");
    let dashboardBartenderInfo = document.querySelector(".bartender-info");
    let dashboardBeerLevel = document.querySelector(".beer-levels");
    let dashboardQueueInfo = document.querySelector(".queue-info");
    let dashboardServingInfo = document.querySelector(".serving-info");
    let dashboardStorageInfo = document.querySelector(".storage-info");
    let dashboardBeerInfo = document.querySelector(".beer-info");


    dashboardBarInfo.innerHTML = "";
    dashboardBartenderInfo.innerHTML = "";
    dashboardBeerLevel.innerHTML = "";
    dashboardQueueInfo.innerHTML = "";
    dashboardServingInfo.innerHTML = "";
    dashboardStorageInfo.innerHTML = "";
    dashboardBeerInfo.innerHTML = "";

    data = JSON.parse(FooBar.getData()); //mydata
    
    console.log(data);

        
    
    


    
    
    //Setting bar data in the template
    
    let barData = data.bar;
    let barInfoTemplate = document.querySelector("#barInfoTemplate").content;
    let barClone = barInfoTemplate.cloneNode(true);
    let statusBoard = barClone.querySelector(".status-board");
    let barName = barClone.querySelector(".bar-name");
    let closesInDiv = barClone.querySelector(".closes-in");
    
    barName.textContent = barData.name + " dashboard";
    dashboardBarInfo.appendChild(barClone);

    let now     = new Date(); 
    let year    = now.getFullYear();
    let month   = now.getMonth()+1; 
    let day     = now.getDate();
    let hour    = now.getHours();
    let minute  = now.getMinutes();

    console.log("Time: "+hour+":"+minute);

    let hoursInMinutes = hour*60;

    let currentTimeInMinutes = hoursInMinutes+minute;
    //let currentTimeInMinutes = 510;

    //console.log(hoursInMinutes);
    //console.log(currentTimeInMinutes);

    //22:00 = 1320
    //23:00 = 1380
    //00:00 = 0
    //01:00 = 60
    //02:00 = 120
    //03:00 = 180
    //04:00 = 240
    //05:00 = 300
    //06:00 = 360
    //07:00 = 420
    //08:00 = 480
    //09:00 = 540

    let opensIn;

    if((currentTimeInMinutes>=1320 && currentTimeInMinutes<=1380)||(currentTimeInMinutes>=0 && currentTimeInMinutes<=540)){
        statusBoard.innerHTML = "Bar is <span class='bar-closed'>closed</span>";

        if(currentTimeInMinutes>=1320 && currentTimeInMinutes<1380){
            let newCurrentTimeInMinutes=currentTimeInMinutes-1380;
            opensIn = Math.round((540 - newCurrentTimeInMinutes)/60);
            console.log('First IF');
        }
        if(currentTimeInMinutes>=1380 && currentTimeInMinutes<1440){
            let newCurrentTimeInMinutesTwo=currentTimeInMinutes-1500;
            console.log('Else IF'+newCurrentTimeInMinutesTwo);
            opensIn = Math.round((540 - newCurrentTimeInMinutesTwo)/60);
            //PROBLEM HERE
        }
        if(currentTimeInMinutes>=0 && currentTimeInMinutes<=540){
            opensIn = Math.round((540 - currentTimeInMinutes)/60);
            console.log('Else');
        }
        if(opensIn==0){
            let opensInMinutesLeft=(540 - currentTimeInMinutes)%60;
            closesInDiv.textContent = "Opens in "+opensInMinutesLeft+" minutes";
        }else{
            closesInDiv.textContent = "Opens in "+opensIn+" hours";
        }
        
        
        console.log(opensIn);
        //540 - (-60) 
        //if 1380, then 1380-1500 
        //if 1320, then 1320-1380
    }else{
        statusBoard.innerHTML = "Bar is <span class='bar-open'>open</span>";
        //console.log("Minutes until closing time: "+(1320-currentTimeInMinutes));
        let closesIn = Math.round((1320-currentTimeInMinutes)/60);
        if(closesIn==0){
            let minutesLeft=(1320-currentTimeInMinutes)%60;
            closesInDiv.textContent = "Closes in "+minutesLeft+" minutes";
        }else{
            closesInDiv.textContent = "Closes in "+closesIn+" hours";
        }
        
    }



    

    



    //Setting beer info data in the template
    //....
    
    //Setting bartender data in the template

    let bartenderData = data.bartenders;
    bartenderData.forEach(function(bartender){
        let bartenderInfoTemplate = document.querySelector("#bartenderInfoTemplate").content;
        let bartenderClone = bartenderInfoTemplate.cloneNode(true);
        let bartenderName = bartenderClone.querySelector(".bartender-name");
        let bartenderStatus = bartenderClone.querySelector(".bartender-status");
        let bartenderPeopleServed = bartenderClone.querySelector(".bartender .people-served");
        let bartenderImg = bartenderClone.querySelector(".bartender-image");

        bartenderName.textContent = bartender.name;

        if(bartender.status=='WORKING'){
            bartenderStatus.textContent = "Pouring beer";
        }
        if(bartender.status=='READY'){
            bartenderStatus.textContent = "Chilling";
        }

        
        
        
        //console.log("Serving customer: "+bartender.servingCustomer);

        if(bartender.name=="Jonas"){
            if(bartender.servingCustomer==null){
                console.log("Current customer for Jonas: "+bartender.servingCustomer);
                console.log("Array of served customers for Jonas: "+b1Customers);
            }else{
                b1Customers.push(bartender.servingCustomer);
                console.log("Current customer for Jonas: "+bartender.servingCustomer);
                console.log("Array of served customers for Jonas: "+b1Customers);
            }
            bartenderPeopleServed.textContent = b1Customers.length+" customers served";
            bartenderImg.setAttribute("src", "images/1.jpg");
        }
        if(bartender.name=="Peter"){
            if(bartender.servingCustomer==null){
                console.log("Current customer for Peter: "+bartender.servingCustomer);
                console.log("Array of served customers for Peter: "+b2Customers);
            }else{
                b2Customers.push(bartender.servingCustomer);
                console.log("Current customer for Peter: "+bartender.servingCustomer);
                console.log("Array of served customers for Peter: "+b2Customers);
            }
            bartenderPeopleServed.textContent = b2Customers.length+" customers served";
            bartenderImg.setAttribute("src", "images/2.jpg");
        }
        if(bartender.name=="Martin"){
            if(bartender.servingCustomer==null){
                console.log("Current customer for Martin: "+bartender.servingCustomer);
                console.log("Array of served customers for Martin: "+b3Customers);
            }else{
                b3Customers.push(bartender.servingCustomer);
                console.log("Current customer for Martin: "+bartender.servingCustomer);
                console.log("Array of served customers for Martin: "+b3Customers);
            }
            bartenderPeopleServed.textContent = b3Customers.length+" customers served";
            bartenderImg.setAttribute("src", "images/3.jpg");
        }

        dashboardBartenderInfo.appendChild(bartenderClone);
    });

    

    //Setting beer level data in the template
    
    let beerData = data.taps;
    beerData.sort(function (a, b) {
        return a.level - b.level;
    });
    beerData.forEach(function(tap){
        let beerLevelTemplate = document.querySelector("#beerLevelTemplate").content;
        let beerLevelClone = beerLevelTemplate.cloneNode(true);
        let beerName = beerLevelClone.querySelector(".beer-left h2");
        let beerLevel = beerLevelClone.querySelector(".beer-level");
        let beerLevelOutline = beerLevelClone.querySelector(".beer-level-outline");
        
        

        beerName.textContent = tap.beer;

        let newTapLevel = tap.level/15;
        beerLevel.style.height = newTapLevel+"px";
        beerLevel.textContent = Math.round((tap.level/2500*100))+"%";
        if(tap.level>=2000){
            beerLevel.style.backgroundColor="#00e276";
            beerLevelOutline.style.border="2px solid #00e276";
            beerName.style.color="#00e276";
        }
        if(tap.level>=800&&tap.level<2000){
            beerLevel.style.backgroundColor="#ffb32c";
            beerLevelOutline.style.border="2px solid #ffb32c";
            beerName.style.color="#ffb32c";
        }
        if(tap.level<800){
            beerLevel.style.backgroundColor="#ff4c2e";
            beerLevelOutline.style.border="2px solid #ff4c2e";
            beerName.style.color="#ff4c2e";
        }
        if(tap.level<20){
            let newTapLevelTwo=newTapLevel+20;
            beerLevel.style.height = newTapLevelTwo+"px";
            beerLevel.style.backgroundColor="white";
            beerLevel.style.color="#ff4c2e";
        }

        dashboardBeerLevel.appendChild(beerLevelClone);
    });

    //Setting queue data in the template
    
    let queueData = data.queue;
    //test for serving queue:
    let orderLength;
    
    // queueData.forEach(function(queue){
    //     console.log(queue.order.length);
    //     orderLength = queue.order.length;
    //     allOrders += orderLength;
    // });
    
    
    

    let queueInfoTemplate = document.querySelector("#queueInfoTemplate").content;
    let queueClone = queueInfoTemplate.cloneNode(true);
    let peopleInQueue = queueClone.querySelector(".people-in-queue");
    let queueViz = queueClone.querySelector(".queue");

    peopleInQueue.textContent = "People in queue: "+queueData.length;
    for(i=1; i<=queueData.length; i++){
        let person = document.createElement("img");
        person.setAttribute("src","images/person.svg");
        person.style.height = "100px";
        person.style.width = "50px";

        peopleInQueue.style.height=queueData.length*50;

        queueViz.appendChild(person);
    }

    dashboardQueueInfo.appendChild(queueClone);

    
    //Setting serving data in the template
    
    let servingInfoTemplate = document.querySelector("#servingInfoTemplate").content;
    let servingClone = servingInfoTemplate.cloneNode(true);
    let servingData = data.serving;
    let beersServed = servingClone.querySelector(".beers-served");

    servingData.forEach(function(oneServe){
        //console.log(oneServe.order.length);
        orderLength = oneServe.order.length;
        allOrders += orderLength;
    });

    beersServed.textContent = allOrders;
    dashboardServingInfo.appendChild(servingClone);

    //console.log("Orders in total: "+allOrders);
    
    
    let storageData = data.storage;

    storageData.sort(function (a, b) {
        return a.amount - b.amount;
    });

    storageData.forEach(function(storageUnit){
        let storageInfoTemplate = document.querySelector("#storageInfoTemplate").content;
        let storageClone = storageInfoTemplate.cloneNode(true);
        let storageStatus = storageClone.querySelector(".storage-status progress");
        let storageName = storageClone.querySelector(".storage-name");
        let storageWarning = storageClone.querySelector(".storage-warning");
        let progressEl = storageClone.querySelector("progress");
        let progressBox = storageClone.querySelector(".progress-box");

        storageName.textContent = storageUnit.name;
        if(storageUnit.amount==1){
            storageStatus.setAttribute("value", storageUnit.amount+2);
        }
        if(storageUnit.amount>=2){
            storageStatus.setAttribute("value", storageUnit.amount+1);
        }
        // if(storageUnit.amount>2){
        //     storageStatus.setAttribute("value", storageUnit.amount);
        // }
        progressEl.dataset.label=storageUnit.amount+"/10";

        if(storageUnit.amount<3){
            progressBox.classList.add("low-storage");
            storageName.style.color="#ff4c2e";
            storageWarning.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Soon out of stock";
        };
        if(storageUnit.amount>=3&&storageUnit.amount<7){
            progressBox.classList.add("medium-storage");
            storageName.style.color="#ffb32c";
        };
        if(storageUnit.amount>=7){
            progressBox.classList.add("high-storage");
            storageName.style.color="#00e276";
        };

        dashboardStorageInfo.appendChild(storageClone);

        
    });

    let beertypeData = data.beertypes;
    console.log(beertypeData);

    beertypeData.forEach(function(beertype){
        let beerInfoTemplate = document.querySelector("#beerInfoTemplate").content;
        let beerClone = beerInfoTemplate.cloneNode(true);
        let beerName = beerClone.querySelector(".beer-description h2");
        let beerAroma = beerClone.querySelector(".aroma");
        let beerAppearance = beerClone.querySelector(".appearance");
        let beerFlavor = beerClone.querySelector(".flavor");
        let beerMouthfeel = beerClone.querySelector(".mouthfeel");
        let beerOverallImpression = beerClone.querySelector(".overall-impression");

        beerName.textContent = beertype.name;
        beerAroma.textContent = "Aroma: "+beertype.description.aroma;
        beerAppearance.textContent = "Appearance: "+beertype.description.appearance;
        beerFlavor.textContent = "Flavor: "+beertype.description.flavor;
        beerMouthfeel.textContent = "Mouth feel: "+beertype.description.mouthfeel;
        beerOverallImpression.textContent = "Overall impression: "+beertype.description.overallImpression;

        dashboardBeerInfo.appendChild(beerClone);
    });
    
    
    

};












