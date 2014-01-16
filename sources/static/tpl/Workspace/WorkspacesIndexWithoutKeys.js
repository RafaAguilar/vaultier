Ember.TEMPLATES["Workspace/WorkspacesIndexWithoutKeys"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"alert alert-warning top-15\">\n        <b>Not approved yet.<br/></b>\n        Your access to this workspace has not been approved yet. You will not be able to see secret informations in\n        workspace\n    </div>\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"alert alert-danger top-15\">\n        <b>Workspace key error. <br/></b>\n        Your workspace key cannot be decoded. It means you have no access to workspace secret data\n    </div>\n");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "view.workspace.hasValidKey", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "view.workspace.keyError", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
