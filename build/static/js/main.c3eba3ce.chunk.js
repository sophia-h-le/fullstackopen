(this.webpackJsonpexercise2_6=this.webpackJsonpexercise2_6||[]).push([[0],{19:function(e,n,t){},20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(14),a=t.n(c),r=(t(19),t(3)),i=(t(20),t(0)),s=function(e){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h3",{children:"Add A New"}),Object(i.jsxs)("form",{onSubmit:e.addPerson,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})]})},u=function(e){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h3",{children:"Search by Name: "}),Object(i.jsx)("input",{value:e.newFilter,onChange:e.handleFilterChange})]})},l=t(4),d=t.n(l),h="/api/persons",f=function(){return d.a.get(h).then((function(e){return e.data}))},j=function(e){return d.a.post(h,e).then((function(e){return e.data}))},b=function(e){if(window.confirm("".concat(e.name," already exists in phonebook. Proceed to replace?")))return d.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}));throw"User changed their mind"},m=function(e){if(window.confirm("Delete '".concat(e.name,"'?")))return d.a.delete("".concat(h,"/").concat(e.id));throw"User changed their mind"},O=function(e){var n=e.person,t=e.removePerson;return Object(i.jsxs)("li",{children:[n.name," ",n.number,Object(i.jsx)("button",{onClick:t,children:"delete"})]})},v=function(e){var n=e.notiClass,t=e.content;return null==={content:t}||"noNoti"==={notiClass:n}?null:Object(i.jsx)("div",{className:n,children:t})},g=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(""),l=Object(r.a)(a,2),d=l[0],h=l[1],g=Object(o.useState)(""),x=Object(r.a)(g,2),C=x[0],p=x[1],w=Object(o.useState)(t),N=Object(r.a)(w,2),F=N[0],S=N[1];Object(o.useEffect)((function(){console.log("effect"),f().then((function(e){c(e),S(e)})).catch((function(e){console.log("Error: ",e)}))}),[]),console.log("render",t.length,"persons");var P=Object(o.useState)({notiClass:"noNoti",content:""}),T=Object(r.a)(P,2),k=T[0],y=T[1],L=Object(o.useState)(""),D=Object(r.a)(L,2),E=D[0],A=D[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(v,{notiClass:k.notiClass,content:k.content}),Object(i.jsx)(u,{newFilter:E,handleFilterChange:function(e){var n=e.target.value;A(n);var o=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())>0}));S(o)}}),Object(i.jsx)(s,{addPerson:function(e){e.preventDefault(),console.log("button clicked",e.target);var n={name:d,number:C};if(t.some((function(e){return e.name===n.name}))){var o=t.find((function(e){return e.name===n.name}));n.id=o.id,b(n).then((function(e){var o=t.map((function(n){return n.id!==e.id?n:e}));c(o),S(o),h(""),p(""),y({notiClass:"success",content:"The number of ".concat(n.name," was updated sucessfully")}),setTimeout((function(){y({notiClass:"noNoti",content:""})}),3e3)})).catch((function(e){var o=t.filter((function(e){return e.id!==n.id}));c(o),S(o),h(""),p(""),y({notiClass:"failure",content:"The information of '".concat(n.name,"' was already removed from the server")}),setTimeout((function(){y({notiClass:"noNoti",content:""})}),3e3)}))}else j(n).then((function(e){var o=t.concat(e);c(o),S(o),h(""),p(""),y({notiClass:"success",content:"The number of ".concat(n.name," was added to the phonebook")}),setTimeout((function(){y({notiClass:"noNoti",content:""})}),3e3)}))},newName:d,handleNameChange:function(e){console.log(e.target.value),h(e.target.value)},newNumber:C,handleNumberChange:function(e){console.log(e.target.value),p(e.target.value)}}),Object(i.jsx)("ul",{children:F.map((function(e){return Object(i.jsx)(O,{person:e,removePerson:function(){return n=e,console.log("remove ".concat(n.name)),void m(n).then((function(){var e=t.filter((function(e){return e!==n}));c(e),S(e)}));var n}},e.id)}))})]})},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,a=n.getLCP,r=n.getTTFB;t(e),o(e),c(e),a(e),r(e)}))};a.a.render(Object(i.jsx)(g,{}),document.getElementById("root")),x()}},[[40,1,2]]]);
//# sourceMappingURL=main.c3eba3ce.chunk.js.map