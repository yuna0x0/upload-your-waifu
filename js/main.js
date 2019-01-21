var dirTree;
var photoSwipeUpdateInterval;
function getPageParams() {
    var pageUrl_string = window.location.href;
    var pageUrl = new URL(pageUrl_string);
    var pageID = pageUrl.searchParams.get("id");
    if (pageID) {
        $("#searchID").val(pageID);
        $("#submit").trigger("click");
    }
}

$.when($.getJSON("dirTree.json", function (data) { dirTree = data })).then(function () {
    getPageParams();
});

$("#submit").click(function () {
    $("#errorStatus").empty();
    $("#photoGallery").empty();
    clearInterval(photoSwipeUpdateInterval);
    var searchID = $("#searchID").val();
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + searchID;
        window.history.pushState({ path: newurl }, '', newurl);
    }
    for (var i = 0; i < dirTree.children.length; i++) {
        if (dirTree.children[i].name == searchID) {
            if (dirTree.children[i].children.length) {
                for (var j = 0; j < dirTree.children[i].children.length; j++) {
                    if (dirTree.children[i].children[j].name == ".DS_Store") {
                        continue;
                    }
                    var photoPath = dirTree.children[i].children[j].path;
                    var POSIXphotoPath = photoPath.replace(/\\/g, "/");
                    $("#photoGallery").append('<hr><img id="' + searchID + "-" + j + '" class="card-img" src="waifu/' + POSIXphotoPath + '" alt="' + dirTree.children[i].children[j].name + '"><p><strong>' + dirTree.children[i].children[j].name + '</<strong></p>');
                    $('#photoGallery').photoSwipe();
                    photoSwipeUpdateInterval = setInterval(function () {
                        $('#photoGallery').photoSwipe('update');
                    }, 300);
                }
            }
            else {
                $("#errorStatus").text("No pictures found in this ID's Directory! <br> <a href='https://github.com/edisonlee55/upload-your-waifu' style='color: #03a9f4'>Learn and Contribute your waifu's pictures (*'ω'*)</a>");
            }
            break;
        }
        else {
            $("#errorStatus").html("Directory with this ID is not found! <br> <a href='https://github.com/edisonlee55/upload-your-waifu' style='color: #03a9f4'>Learn and Contribute your waifu's pictures (*'ω'*)</a>");
        }
    }
});
