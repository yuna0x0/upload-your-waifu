var dirTree;
$('#photoGallery').photoSwipe();
$.getJSON("dirTree.json", function (data) {
    dirTree = data;
});
setInterval(function () {
    $('#photoGallery').photoSwipe('update');
}, 300);
$("#submit").click(function () {
    $("#errorStatus").empty();
    $("#photoGallery").empty();
    var searchID = $("#searchID").val();
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
