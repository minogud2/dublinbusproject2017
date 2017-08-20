window.onload = function(){
    openNav();
    closeNav();
    loadTwitter();
    googleTranslateElementInit();
};

// functions for opening and closing navbar
function openNav() {
        if (document.getElementById("mySidenav").style.width === '0px') {
            document.getElementById("mySidenav").style.width = "250px";
        } else {
            document.getElementById("mySidenav").style.width = "0px"; 
        }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//functions to load in google language bar
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', 
    includedLanguages: 'en,es,fr,it,ja,ko,pt,ru',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 
    'google_translate_element');
			}

// function for loading in twitter data from python script for AA roadwatch. 
// The last 9 tweets displayed from the account.
function loadTwitter(){
    var text = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getTwitterText", null, function(d) {
    console.log(d)
    var twitter1_text= d['text'][0]
    var twitter2_text= d['text'][1]
    var twitter3_text= d['text'][2]
    var twitter4_text= d['text'][3]
    var twitter5_text= d['text'][4]
    var twitter6_text= d['text'][5]
    var twitter7_text= d['text'][6]
    var twitter8_text= d['text'][7]
    var twitter9_text= d['text'][8]
       
    var https_find1 = twitter1_text.indexOf("https")
    twitter1_text=twitter1_text.substring(0,https_find1)
    var https_find2 = twitter2_text.indexOf("https")
    twitter2_text=twitter2_text.substring(0,https_find2)
    var https_find3 = twitter3_text.indexOf("https")
    twitter3_text=twitter3_text.substring(0,https_find3)
    var https_find4 = twitter4_text.indexOf("https")
    twitter4_text=twitter4_text.substring(0,https_find4)
    var https_find5 = twitter5_text.indexOf("https")
    twitter5_text=twitter5_text.substring(0,https_find5)
    var https_find6 = twitter6_text.indexOf("https")
    twitter6_text=twitter6_text.substring(0,https_find6)
    var https_find7 = twitter7_text.indexOf("https")
    twitter7_text=twitter7_text.substring(0,https_find7)
    var https_find8 = twitter8_text.indexOf("https")
    twitter8_text=twitter8_text.substring(0,https_find8)
    var https_find9 = twitter9_text.indexOf("https")
    twitter9_text=twitter9_text.substring(0,https_find9)
    
    twitter1_text=twitter1_text.substring(0,twitter1_text.lastIndexOf(".")+1)
    twitter2_text=twitter2_text.substring(0,twitter2_text.lastIndexOf(".")+1)
    twitter3_text=twitter3_text.substring(0,twitter3_text.lastIndexOf(".")+1)
    twitter4_text=twitter4_text.substring(0,twitter4_text.lastIndexOf(".")+1)
    twitter5_text=twitter5_text.substring(0,twitter5_text.lastIndexOf(".")+1)
    twitter6_text=twitter6_text.substring(0,twitter6_text.lastIndexOf(".")+1)
    twitter7_text=twitter7_text.substring(0,twitter7_text.lastIndexOf(".")+1)
    twitter8_text=twitter8_text.substring(0,twitter8_text.lastIndexOf(".")+1)
    twitter9_text=twitter9_text.substring(0,twitter9_text.lastIndexOf(".")+1)
    
    console.log(twitter1_text)
    var twitter1_time=d['create_time'][0]
    var twitter2_time=d['create_time'][1]
    var twitter3_time=d['create_time'][2]
    var twitter4_time=d['create_time'][3]
    var twitter5_time=d['create_time'][4]
    var twitter6_time=d['create_time'][5]
    var twitter7_time=d['create_time'][6]
    var twitter8_time=d['create_time'][7]
    var twitter9_time=d['create_time'][8]
    
    var length1=twitter1_time.length
    twitter1_time=twitter1_time.substring(0,length1-10)
    var length2=twitter2_time.length
    twitter2_time=twitter2_time.substring(0,length2-10)
    var length3=twitter3_time.length
    twitter3_time=twitter3_time.substring(0,length3-10)
    var length4=twitter4_time.length
    twitter4_time=twitter4_time.substring(0,length4-10)
    var length5=twitter5_time.length
    twitter5_time=twitter5_time.substring(0,length5-10)
    var length6=twitter6_time.length
    twitter6_time=twitter6_time.substring(0,length6-10)
    var length7=twitter7_time.length
    twitter7_time=twitter7_time.substring(0,length7-10)
    var length8=twitter8_time.length
    twitter8_time=twitter8_time.substring(0,length8-10)
    var length9=twitter9_time.length
    twitter9_time=twitter9_time.substring(0,length9-10)

    document.getElementById('tweet1').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter1_time+"<br><br>"+twitter1_text;
    document.getElementById('tweet2').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter2_time+"<br><br>"+twitter2_text;
    document.getElementById('tweet3').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter3_time+"<br><br>"+twitter3_text;
    document.getElementById('tweet4').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter4_time+"<br><br>"+twitter4_text;
    document.getElementById('tweet5').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter5_time+"<br><br>"+twitter5_text;
    document.getElementById('tweet6').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter6_time+"<br><br>"+twitter6_text;
    document.getElementById('tweet7').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter7_time+"<br><br>"+twitter7_text+"";
    document.getElementById('tweet8').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter8_time+"<br><br>"+twitter8_text;
    document.getElementById('tweet9').innerHTML = "<b><i class='fa fa-twitter fa-fw'></i>&nbsp;Update:&nbsp;</b>" +twitter9_time+"<br><br>"+twitter9_text;
    }
  )};                