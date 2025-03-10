


/*
 @preserve
 bstreeview.js
 Version: 1.2.0
 Authors: Sami CHNITER <sami.chniter@gmail.com>
 Copyright 2020
 License: Apache License 2.0
 Project: https://github.com/nhmvienna/bs5treeview
*/
!function (t, e, i, s) { "use strict";
var n = { expandIcon: "fa fa-angle-down fa-fw",
collapseIcon: "fa fa-angle-right fa-fw", expandClass: 'show',
indent: 1.25, parentsMarginLeft: "1.25rem", openNodeLinkOnNewTab: !0 },
a = '<div role="treeitem" class="list-group-item" data-bs-toggle="collapse"></div>',
 d = '<div role="group" class="list-group collapse" id="itemid"></div>',
 o = '<i class="state-icon"></i>', r = '<i class="item-icon"></i>';
 function l(e, i) {
 this.element = e,
 this.itemIdPrefix = e.id + "-item-",
  this.settings = t.extend({}, n, i),
  this.init() } t.extend(l.prototype,
  { init: function () { this.tree = [], this.nodes = [],
  this.settings.data && (this.settings.data.isPrototypeOf(String)
  && (this.settings.data = t.parseJSON(this.settings.data)),
  this.tree = t.extend(!0, [], this.settings.data), delete this.settings.data),
  t(this.element).addClass("bstreeview"), this.initData({ nodes: this.tree });
  var i = this; this.build(t(this.element), this.tree, 0),
  t(this.element).on("click", ".list-group-item",
  function (s) { t(".state-icon", this).
  toggleClass(i.settings.expandIcon).toggleClass(i.settings.collapseIcon),
  s.target.hasAttribute("href") && (i.settings.openNodeLinkOnNewTab ?
  e.open(s.target.getAttribute("href"), "_blank") :
  e.location = s.target.getAttribute("href")) }) },
  initData: function (e) { if (e.nodes) { var i = e, s = this; t.each(e.nodes,
  function (t, e) { e.nodeId = s.nodes.length, e.parentId = i.nodeId, s.nodes.push(e),
  e.nodes && s.initData(e) }) } }, build: function (e, i, s) { var n = this,
  l = n.settings.parentsMarginLeft; s > 0
  && (l = (n.settings.indent + s * n.settings.indent).toString() + "rem;"),
  s += 1, t.each(i, function (i, g)
  { var h = t(a).attr("data-bs-target",
  "#" + n.itemIdPrefix + g.nodeId).attr("style", "padding-left:" + l)
  .attr("aria-level", s);
  if (g.nodes) { var c = t(o).addClass((g.expanded)?n.settings.expandIcon:n.settings.collapseIcon); h.append(c) }
  if (g.icon) { var f = t(r).addClass(g.icon); h.append(f) }
   if (h.append(g.text), g.href && h.attr("href", g.href),
   g.class && h.addClass(g.class), g.id && h.attr("id", g.id), e.append(h), g.nodes)
    { var p = t(d).attr("id", n.itemIdPrefix + g.nodeId); e.append(p), n.build(p, g.nodes, s);
     if (g.expanded) p.addClass(n.settings.expandClass) } }) } }),
     t.fn.bstreeview = function (e) { return this.each(function ()
     { t.data(this, "plugin_bstreeview") || t.data(this, "plugin_bstreeview", new l(this, e)) }) } }(jQuery, window, document);