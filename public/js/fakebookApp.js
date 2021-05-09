$(document).ready(() => {
    $.get(`/api/users`, (results = {}) => {
        let data = results.data;
        if (!data || !data.users) return;
        data.users.forEach((user) => {
            $(".usersDiv").append(
                `<div>
                    <a href="/users/${user._id}">${user.name.first} ${user.name.last}</a>
                    <button class="follow-button ${user.following ? 'following' : 'notFollowing'}" data-id="${user._id}">
                    ${user.following ? "Unfollow" : "Follow"}
                    </button>
                </div>`
            );
        });
    })
    .then(() => {
        addFollowButtonListener();
    })
});

let addFollowButtonListener = () => {
    $(".follow-button").click((event) => {
        let $button = $(event.target),
            userId = $button.data("id");

        if ($button.hasClass('notFollowing')) {
            $.get(`/api/users/${userId}/follow`, (results = {}) => {
                let data = results.data;
                if (data && data.success) {
                    $button
                        .text("Unfollow")
                        .addClass("following")
                        .removeClass("notFollowing");
                } else {
                    $button.text("Try again");
                }
            });
        } else {
            $.get(`/api/users/${userId}/unfollow`, (results = {}) => {
                let data = results.data;
                if (data && data.success) {
                    $button
                        .text("Follow")
                        .addClass("notFollowing")
                        .removeClass("following");
                } else {
                    $button.text("Try again");
                }
            });
        }
    });
}