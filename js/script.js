function nameWarn()
{
    let errorMsg = document.getElementById("formNameWarn");
    let name = document.getElementById("formName");

    if(name.value.length == 0)
    {
        errorMsg.textContent = "Meno nesmie byť prázdne !";
        name.style.border = "1px solid red";
        return false;
    }
    else
    {
        name.style.border = "1px solid lightgrey";
        errorMsg.textContent = "";
        return true;
    }
}

function surnameWarn()
{
    let errorMsg = document.getElementById("formSurnameWarn");
    let surname = document.getElementById("formSurname");

    if(surname.value.length == 0)
    {
        errorMsg.textContent = "Priezvisko nesmie byť prázdne !";
        surname.style.border = "1px solid red";
        return false;
    }
    else
    { 
        surname.style.border = "1px solid lightgrey";    
        errorMsg.textContent = "";
        return true;
    }
}

function emailWarn()
{
    let errorMsg = document.getElementById("formEmailWarn");
    let email = document.getElementById("formEmail");
    let emailFormat = /^([A-Za-z0-9_\-\.]){3,}\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(email.value.length == 0)
    {
        errorMsg.textContent = "Email nesmie byť prázdny !";
        email.style.border = "1px solid red";
        return false;
    }
    
    if(!emailFormat.test(email.value))
    {
        errorMsg.textContent = "Email je v nesprávnom tvare !";
        email.style.border = "1px solid red";
        return false;
    }
    else
    {
        email.style.border = "1px solid lightgrey";    
        errorMsg.textContent = "";
        return true;
    }
}

function dateOfBirthWarn()
{
    let errorMsg = document.getElementById("formDateofBirthWarn");
    let birthDate = new Date(document.getElementById("formDateofBirth").value);
    let userAge = document.getElementById("formAge");

    let differenceInMs = Date.now() - birthDate.getTime();
    let realAge = Math.abs(new Date(differenceInMs).getUTCFullYear()-1970);

    if(isNaN(birthDate))
    {    
        errorMsg.textContent = "Dátum narodenia nesmie byť prázdny !";
        document.getElementById("formDateofBirth").style.border = "1px solid red";
        return false;
    }
    else
    {
        document.getElementById("formDateofBirth").style.border = "1px solid lightgrey";
        if((userAge.value == "") || (userAge.value == null))
        {
            errorMsg.textContent = "";
            userAge.style.border = "1px solid lightgrey";
            return true;    
        }
        else
        {
            if(userAge.value == realAge)
            {
                errorMsg.textContent = "";
                userAge.style.border = "1px solid lightgrey";
                return true;
            }
            else
            {
                errorMsg.textContent = "Vek sa nezhoduje s dátumom narodenia !";
                userAge.style.border = "1px solid red";
                return false;
            }
        }
    }
}

function isFan()
{
    if(document.getElementById("formNflYes").checked)
    {
        document.getElementById("formExplain").style.display = "none";
        document.getElementById("formNflChoose").style.display = "block";
        document.getElementById("typeOfFan").style.display = "block";
        pickTeam();
    }
    else
    {
        document.getElementById("formNflChoose").style.display = "none";
        document.getElementById("formExplain").style.display = "block";
        document.getElementById("typeOfFan").style.display = "none";
    }
}

function defineFan()
{
    if(document.getElementById("otherFan").checked)
        document.getElementById("ownFanDefinition").style.display = "block";
    else
        document.getElementById("ownFanDefinition").style.display = "none";
}

function pickTeam()
{

    var conferenceList = {
        AFC : ["AFC_West", "AFC_South", "AFC_East", "AFC_North"],
        NFC : ["NFC_West", "NFC_South", "NFC_East", "NFC_North"]
    }

    var divisionList = {
        AFC_West : ["Kansas_City_Chiefs", "Las_Vegas_Raiders", "Denver_Broncos", "Los_Angeles_Chargers"],
        AFC_South : ["Tennessee_Titans", "Indianapolis_Colts", "Houston_Texans", "Jacksonville_Jaguars"],
        AFC_East : ["Buffalo_Bills", "New_England_Patriots", "Miami_Dolphins", "New_York_Jets"],
        AFC_North : ["Pittsburgh_Steelers", "Baltimore_Ravens", "Cleveland_Browns", "Cincinnati_Bengals"],
        NFC_West : ["Seattle_Seahawks", "Los_Angeles_Rams", "Arizona_Cardinals", "San_Francisco_49ers"],
        NFC_South : ["New_Orleans_Saints", "Tampa_Bay_Buccaneers", "Carolina_Panthers", "Atlanta_Falcons"],
        NFC_East : ["Dallas_Cowboys", "Philadelphia_Eagles", "Washington_Football_Team", "New_York_Giants"],
        NFC_North : ["Green_Bay_Packers", "Chicago_Bears", "Detroit_Lions", "Minnesota_Vikings"]
    }

    var conference = document.getElementById("formNflConference");
    var division = document.getElementById("formNflDivision");
    var team = document.getElementById("formNflTeam");

    conference.innerHTML = "<option hidden>Vyberte konferenciu</option>";
    team.innerHTML = "<option hidden>Vyberte tím</option>";
    division.innerHTML = "<option hidden>Vyberte divíziu</option>";

    for (confName in conferenceList)
        conference.innerHTML = conference.innerHTML + "<option value=" + confName + ">"  + confName + "</option>";

    conference.addEventListener("change", function(e){
        
        team.innerHTML = "<option hidden>Vyberte tím</option>";
        division.innerHTML = "<option hidden>Vyberte divíziu</option>";
        conf = e.target.value;

        if(conf in conferenceList)
            for(i=0; i < conferenceList[conf].length; i++)
            { 
                conferenceList[conf][i]=conferenceList[conf][i].replace("_"," ");
                division.innerHTML = division.innerHTML + "<option value='" + conferenceList[conf][i] + "'>" + conferenceList[conf][i] + "</option>";
            }
    });

    division.addEventListener("change", function(e){

        team.innerHTML = "<option hidden>Vyberte tím</option>";
        dvsn = e.target.value.replace(" ", "_");

        if(dvsn in divisionList)
            for(i=0; i < divisionList[dvsn].length; i++)
            {
                divisionList[dvsn][i] = divisionList[dvsn][i].replaceAll("_"," ");
                console.log(divisionList[dvsn][i]);
                team.innerHTML = team.innerHTML + "<option value='" + divisionList[dvsn][i] + "'>" + divisionList[dvsn][i] + "</option>";
            }
                
    });
}

function formVal()
{
    return [nameWarn(), surnameWarn(), emailWarn(), dateOfBirthWarn()].every(Boolean);
}