module.exports = member => {
    let username = member.user.username;
    member.message('Sunucuya Hoşgeldin **' + username + '** Eğleniceğini Düşünüyorum!');
};
