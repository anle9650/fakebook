$(document).ready(() => {
    $.get(`/api/users`, (results = {}) => {
        let data = results.data;
        if (!data || !data.users) return;
        data.users.forEach((user) => {
            $(".usersDiv").append(
                `<div>
                    <a href="/users/${user._id}">${user.name.first} ${user.name.last}</a>
                    <button class=${user.following ? "unfollow-button" : "follow-button"} data-id="${user._id}">
                    ${user.following ? "Unfollow" : "Follow"}
                    </button>
                </div>`
            );
        });
    }).then(() => {
        addFollowButtonListener();
    });
});

let addFollowButtonListener = () => {
    $(".follow-button").click((event) => {
        let $button = $(event.target),
            userId = $button.data("id");
        $.get(`/api/users/${userId}/follow`, (results = {}) => {
            let data = results.data;
            if (data && data.success) {
                $button
                    .text("Unfollow")
                    .addClass("unfollow-button")
                    .removeClass("follow-button");
            } else {
                $button.text("Try again");
            }
        });
    });
}