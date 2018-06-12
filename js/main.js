"use strict"
window.addEventListener("load", gettingData);
let data;
//Getting data every 10 seconds
setInterval(gettingData, 1000);

let allOrders = 0; 
let b1Customers = [], b2Customers = [], b3Customers = [], i;
let mydata = {"timestamp":1528704419454,"bar":{"name":"FooBar","closingTime":"22:00:00"},"queue":[{"id":8,"startTime":1528704336575,"order":["Hoppily Ever After","Hoppily Ever After","Mowintime","Ruined Childhood"]},{"id":9,"startTime":1528704336575,"order":["Mowintime"]},{"id":10,"startTime":1528704396577,"order":["Hollaback Lager","Steampunk"]},{"id":11,"startTime":1528704396577,"order":["Mowintime","Mowintime"]}],"serving":[{"id":5,"startTime":1528704336575,"order":["Hollaback Lager","Hollaback Lager","Mowintime","Mowintime"]},{"id":6,"startTime":1528704336575,"order":["Hoppily Ever After","Hoppily Ever After","Steampunk"]},{"id":7,"startTime":1528704336575,"order":["Hoppily Ever After","Mowintime","Mowintime","Steampunk"]}],"bartenders":[{"name":"Peter","status":"WORKING","statusDetail":"pourBeer","usingTap":3,"servingCustomer":7},{"name":"Jonas","status":"WORKING","statusDetail":"pourBeer","usingTap":1,"servingCustomer":5},{"name":"Martin","status":"WORKING","statusDetail":"pourBeer","usingTap":2,"servingCustomer":6}],"taps":[{"id":0,"level":2300,"capacity":2500,"beer":"Hoppily Ever After","inUse":false},{"id":1,"level":2200,"capacity":2500,"beer":"Mowintime","inUse":true},{"id":2,"level":2400,"capacity":2500,"beer":"Steampunk","inUse":true},{"id":3,"level":2450,"capacity":2500,"beer":"Hoppily Ever After","inUse":true},{"id":4,"level":2450,"capacity":2500,"beer":"Ruined Childhood","inUse":false},{"id":5,"level":2350,"capacity":2500,"beer":"Hollaback Lager","inUse":false},{"id":6,"level":2400,"capacity":2500,"beer":"Mowintime","inUse":false}],"storage":[{"name":"El Hefe","amount":5},{"name":"Fairy Tale Ale","amount":5},{"name":"GitHop","amount":6},{"name":"Hollaback Lager","amount":4},{"name":"Hoppily Ever After","amount":6},{"name":"Mowintime","amount":6},{"name":"Row 26","amount":9},{"name":"Ruined Childhood","amount":5},{"name":"Sleighride","amount":2},{"name":"Steampunk","amount":8}]};

function gettingData(){
    
    let dashboardBarInfo = document.querySelector(".bar-info");
    let dashboardBartenderInfo = document.querySelector(".bartender-info");
    let dashboardBeerLevel = document.querySelector(".beer-level");
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
    statusBoard.textContent = barData.closingTime;
    dashboardBarInfo.appendChild(barClone);

    //Setting beer info data in the template
    //....
    
    //Setting bartender data in the template

    let bartenderData = data.bartenders;
    bartenderData.forEach(function(bartender){
        let bartenderInfoTemplate = document.querySelector("#bartenderInfoTemplate").content;
        let bartenderClone = bartenderInfoTemplate.cloneNode(true);
        let bartenderName = bartenderClone.querySelector(".bartender h2");
        let bartenderStatus = bartenderClone.querySelector(".bartender-status");
        let bartenderPeopleServed = bartenderClone.querySelector(".bartender .people-served");

        bartenderName.textContent = "Bartender: "+bartender.name;
        bartenderStatus.textContent = "Status: "+bartender.status;
        
        
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
            bartenderPeopleServed.textContent = "People served: "+b1Customers.length;
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
            bartenderPeopleServed.textContent = "People served: "+b2Customers.length;
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
            bartenderPeopleServed.textContent = "People served: "+b3Customers.length;
        }

        dashboardBartenderInfo.appendChild(bartenderClone);
    });

    

    //Setting beer level data in the template
    
    let beerData = data.taps;
    beerData.forEach(function(tap){
        let beerLevelTemplate = document.querySelector("#beerLevelTemplate").content;
        let beerLevelClone = beerLevelTemplate.cloneNode(true);
        let beerName = beerLevelClone.querySelector(".beer-left h2");
        let beerLevel = beerLevelClone.querySelector(".beer-level");

        beerName.textContent = "Beer: "+tap.beer;
        beerLevel.textContent = "Level: "+tap.level;

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
        let person = document.createElement("div");
        //person.setAttribute("src","person.svg");
        person.style.height = "100px";
        person.style.width = "50px";
        person.style.backgroundColor = "red";
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

    storageData.forEach(function(storageUnit){
        let storageInfoTemplate = document.querySelector("#storageInfoTemplate").content;
        let storageClone = storageInfoTemplate.cloneNode(true);
        let storageStatus = storageClone.querySelector(".storage-status progress");
        let storageName = storageClone.querySelector(".storage-name");
        let storageWarning = storageClone.querySelector(".storage-warning");

        storageName.textContent = storageUnit.name;
        storageStatus.setAttribute("value", storageUnit.amount);
        dashboardStorageInfo.appendChild(storageClone);

        if(storageUnit.amount<3){
            storageWarning.textContent = "You need to buy more "+storageUnit.name+" beer"
        }
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












