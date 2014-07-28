Ember.TEMPLATES["Home/HomeIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Get started today <b> for\r\n                                free </b>");
  }

  data.buffer.push("<div class=\"container\">\r\n    <div class=\"vlt-page\">\r\n\r\n        <div class=\"vlt-hp\">\r\n            <div class=\"jumbotron\">\r\n                <div class=\"vlt-message\">\r\n                    <div class=\"vlt-visual col-md-4 text-center\">\r\n                        <img src=\"/static/vaultier/images/logo-hp.png\">\r\n                    </div>\r\n                    <div class=\"vlt-text  col-md-8 text-center\">\r\n                        <h1>\r\n                            Vaultier\r\n                        </h1>\r\n\r\n                        <p class=\"lead\">\r\n                            Easy and secure password and credentials sharing across teams.\r\n                        </p>\r\n\r\n                        <p>\r\n                            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-success")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "AuthRegister", options) : helperMissing.call(depth0, "link-to", "AuthRegister", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </p>\r\n                    </div>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n\r\n            </div>\r\n\r\n            <div class=\"row top-30\">\r\n                <div class=\"col-lg-4 vlt-feature vlt-feature-secure\">\r\n                    <h2 class=\"bottom-30\">Absolutely Secure</h2>\r\n\r\n                    <p class=\"lead\">\r\n                        We use advanced security based on RSA encryption. All your data stored in our databases are\r\n                        cyphered and\r\n                        cannot be readed by\r\n                        anybody else than you and your team.\r\n                    </p>\r\n\r\n                    <!--\r\n                    <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n                    -->\r\n\r\n                </div>\r\n                <div class=\"col-lg-4 vlt-feature vlt-feature-team\">\r\n                    <h2 class=\"bottom-30\">Team Productivity</h2>\r\n\r\n                    <p class=\"lead\">Invite and colaborate with your team. You can selectively grant access permission to\r\n                        any\r\n                        team member to share credentials. </p>\r\n\r\n                    <!--\r\n                    <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n                    -->\r\n                </div>\r\n                <div class=\"col-lg-4 vlt-feature vlt-feature-cloud\">\r\n                    <h2 class=\"bottom-30\">Cloud Solution</h2>\r\n\r\n                    <p class=\"lead\">Vaultier is online. It is always available from web browser or mobile. No need to\r\n                        install,\r\n                        works out of the box</p>\r\n\r\n                    <!--\r\n                    <p><a class=\"btn btn-primary\" href=\"#\">View details »</a></p>\r\n                    -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

//# sourceMappingURL=home.tpl.js.map