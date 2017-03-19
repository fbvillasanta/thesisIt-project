module.exports = {

    'facebookAuth' : {
        'clientID'        : 'APP_ID', // your App ID
        'clientSecret'    : 'APP_SECRET', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'APP_ID',
        'consumerSecret'     : 'APP_SECRET',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'APP_ID',
        'clientSecret'     : 'APP_SECRET',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
