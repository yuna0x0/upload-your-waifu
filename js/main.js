var dirTree;
$('#photoGallery').photoSwipe();
$.getJSON("dirTree.json", function (data) {
    dirTree = data;
});

$("#submit").click(function () {
    $("#errorStatus").empty();
    $("#photoGallery").empty();
    $('#photoGallery').photoSwipe('update');
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
                    $.when($("#photoGallery").append('<div class="card bg-dark text-white"><img id="' + searchID + "-" + j + '" class="card-img" src="waifu/' + POSIXphotoPath + '" alt="Card image"> <div class="card-img-overlay"> <h5 class="card-title" style="background-color: rgba(0, 0, 0, 0.5); margin-left: -20px; margin-right: -20px; margin-top: -20px;">' + dirTree.children[i].children[j].name + '</h5> </div> </div>')).done(function () {
                        $('#photoGallery').photoSwipe('update');
                    });

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
