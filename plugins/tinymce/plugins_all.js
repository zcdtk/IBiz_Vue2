(function () {
var advlist = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var applyListFormat = function (editor, listName, styleValue) {
    var cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
    editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
  };
  var $_55fky08fjkmcwo2a = { applyListFormat: applyListFormat };
  var register = function (editor) {
    editor.addCommand('ApplyUnorderedListStyle', function (ui, value) {
      $_55fky08fjkmcwo2a.applyListFormat(editor, 'UL', value['list-style-type']);
    });
    editor.addCommand('ApplyOrderedListStyle', function (ui, value) {
      $_55fky08fjkmcwo2a.applyListFormat(editor, 'OL', value['list-style-type']);
    });
  };
  var $_cjqqqe8ejkmcwo28 = { register: register };
  var getNumberStyles = function (editor) {
    var styles = editor.getParam('advlist_number_styles', 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var getBulletStyles = function (editor) {
    var styles = editor.getParam('advlist_bullet_styles', 'default,circle,disc,square');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var $_2zo4iv8hjkmcwo2f = {
    getNumberStyles: getNumberStyles,
    getBulletStyles: getBulletStyles
  };
  var isChildOfBody = function (editor, elm) {
    return editor.$.contains(editor.getBody(), elm);
  };
  var isTableCellNode = function (node) {
    return node && /^(TH|TD)$/.test(node.nodeName);
  };
  var isListNode = function (editor) {
    return function (node) {
      return node && /^(OL|UL|DL)$/.test(node.nodeName) && isChildOfBody(editor, node);
    };
  };
  var getSelectedStyleType = function (editor) {
    var listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
    return editor.dom.getStyle(listElm, 'listStyleType') || '';
  };
  var $_djj0lo8ijkmcwo2g = {
    isTableCellNode: isTableCellNode,
    isListNode: isListNode,
    getSelectedStyleType: getSelectedStyleType
  };
  var styleValueToText = function (styleValue) {
    return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, function (chr) {
      return chr.toUpperCase();
    });
  };
  var toMenuItems = function (styles) {
    return global$1.map(styles, function (styleValue) {
      var text = styleValueToText(styleValue);
      var data = styleValue === 'default' ? '' : styleValue;
      return {
        text: text,
        data: data
      };
    });
  };
  var $_cbyrf58jjkmcwo2h = { toMenuItems: toMenuItems };
  var findIndex = function (list, predicate) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if (predicate(element)) {
        return index;
      }
    }
    return -1;
  };
  var listState = function (editor, listName) {
    return function (e) {
      var ctrl = e.control;
      editor.on('NodeChange', function (e) {
        var tableCellIndex = findIndex(e.parents, $_djj0lo8ijkmcwo2g.isTableCellNode);
        var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
        var lists = global$1.grep(parents, $_djj0lo8ijkmcwo2g.isListNode(editor));
        ctrl.active(lists.length > 0 && lists[0].nodeName === listName);
      });
    };
  };
  var updateSelection = function (editor) {
    return function (e) {
      var listStyleType = $_djj0lo8ijkmcwo2g.getSelectedStyleType(editor);
      e.control.items().each(function (ctrl) {
        ctrl.active(ctrl.settings.data === listStyleType);
      });
    };
  };
  var addSplitButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'splitbutton',
      tooltip: tooltip,
      menu: $_cbyrf58jjkmcwo2h.toMenuItems(styles),
      onPostRender: listState(editor, nodeName),
      onshow: updateSelection(editor),
      onselect: function (e) {
        $_55fky08fjkmcwo2a.applyListFormat(editor, nodeName, e.control.settings.data);
      },
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'button',
      tooltip: tooltip,
      onPostRender: listState(editor, nodeName),
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addControl = function (editor, id, tooltip, cmd, nodeName, styles) {
    if (styles.length > 0) {
      addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
    } else {
      addButton(editor, id, tooltip, cmd, nodeName, styles);
    }
  };
  var register$1 = function (editor) {
    addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', $_2zo4iv8hjkmcwo2f.getNumberStyles(editor));
    addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', $_2zo4iv8hjkmcwo2f.getBulletStyles(editor));
  };
  var $_d74fz58gjkmcwo2b = { register: register$1 };
  global.add('advlist', function (editor) {
    var hasPlugin = function (editor, plugin) {
      var plugins = editor.settings.plugins ? editor.settings.plugins : '';
      return global$1.inArray(plugins.split(/[ ,]/), plugin) !== -1;
    };
    if (hasPlugin(editor, 'lists')) {
      $_d74fz58gjkmcwo2b.register(editor);
      $_cjqqqe8ejkmcwo28.register(editor);
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var wordcount = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var regExps = {
    aletter: '[A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05F3\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u24B6-\u24E9\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005\u303b\u303c\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790\ua791\ua7a0-\ua7a9\ua7fa-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
    midnumlet: '[-\'\\.\u2018\u2019\u2024\uFE52\uFF07\uFF0E]',
    midletter: '[:\xB7\xB7\u05F4\u2027\uFE13\uFE55\uFF1A]',
    midnum: '[\xB1+*/,;;\u0589\u060C\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]',
    numeric: '[0-9\u0660-\u0669\u066B\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9]',
    cr: '\\r',
    lf: '\\n',
    newline: '[\x0B\f\x85\u2028\u2029]',
    extend: '[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f\u109a-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b6-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u192b\u1930-\u193b\u19b0-\u19c0\u19c8\u19c9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f\u1b00-\u1b04\u1b34-\u1b44\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1baa\u1be6-\u1bf3\u1c24-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\uA672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe3-\uabea\uabec\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]',
    format: '[\xAD\u0600-\u0603\u06DD\u070F\u17b4\u17b5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
    katakana: '[\u3031-\u3035\u309B\u309C\u30A0-\u30fa\u30fc-\u30ff\u31f0-\u31ff\u32D0-\u32FE\u3300-\u3357\uff66-\uff9d]',
    extendnumlet: '[=_\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f\u2200-\u22FF<>]',
    punctuation: '[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uff3f\uFF5B\uFF5D\uFF5F-\uFF65]'
  };
  var characterIndices = {
    ALETTER: 0,
    MIDNUMLET: 1,
    MIDLETTER: 2,
    MIDNUM: 3,
    NUMERIC: 4,
    CR: 5,
    LF: 6,
    NEWLINE: 7,
    EXTEND: 8,
    FORMAT: 9,
    KATAKANA: 10,
    EXTENDNUMLET: 11,
    AT: 12,
    OTHER: 13
  };
  var SETS = [
    new RegExp(regExps.aletter),
    new RegExp(regExps.midnumlet),
    new RegExp(regExps.midletter),
    new RegExp(regExps.midnum),
    new RegExp(regExps.numeric),
    new RegExp(regExps.cr),
    new RegExp(regExps.lf),
    new RegExp(regExps.newline),
    new RegExp(regExps.extend),
    new RegExp(regExps.format),
    new RegExp(regExps.katakana),
    new RegExp(regExps.extendnumlet),
    new RegExp('@')
  ];
  var EMPTY_STRING = '';
  var PUNCTUATION = new RegExp('^' + regExps.punctuation + '$');
  var WHITESPACE = /^\s+$/;
  var $_449maathjkmcwsee = {
    characterIndices: characterIndices,
    SETS: SETS,
    EMPTY_STRING: EMPTY_STRING,
    PUNCTUATION: PUNCTUATION,
    WHITESPACE: WHITESPACE
  };
  var each = function (o, cb, s) {
    var n, l;
    if (!o) {
      return 0;
    }
    s = s || o;
    if (o.length !== undefined) {
      for (n = 0, l = o.length; n < l; n++) {
        if (cb.call(s, o[n], n, o) === false) {
          return 0;
        }
      }
    } else {
      for (n in o) {
        if (o.hasOwnProperty(n)) {
          if (cb.call(s, o[n], n, o) === false) {
            return 0;
          }
        }
      }
    }
    return 1;
  };
  var map = function (array, callback) {
    var out = [];
    each(array, function (item, index) {
      out.push(callback(item, index, array));
    });
    return out;
  };
  var $_3uizbntjjkmcwsen = {
    each: each,
    map: map
  };
  var SETS$1 = $_449maathjkmcwsee.SETS;
  var OTHER = $_449maathjkmcwsee.characterIndices.OTHER;
  var getType = function (char) {
    var j, set, type = OTHER;
    var setsLength = SETS$1.length;
    for (j = 0; j < setsLength; ++j) {
      set = SETS$1[j];
      if (set && set.test(char)) {
        type = j;
        break;
      }
    }
    return type;
  };
  var memoize = function (func) {
    var cache = {};
    return function (char) {
      if (cache[char]) {
        return cache[char];
      } else {
        var result = func(char);
        cache[char] = result;
        return result;
      }
    };
  };
  var classify = function (string) {
    var memoized = memoize(getType);
    return $_3uizbntjjkmcwsen.map(string.split(''), memoized);
  };
  var $_5uy6wmtijkmcwsel = { classify: classify };
  var ci = $_449maathjkmcwsee.characterIndices;
  var isWordBoundary = function (map, index) {
    var prevType;
    var type = map[index];
    var nextType = map[index + 1];
    var nextNextType;
    if (index < 0 || index > map.length - 1 && index !== 0) {
      return false;
    }
    if (type === ci.ALETTER && nextType === ci.ALETTER) {
      return false;
    }
    nextNextType = map[index + 2];
    if (type === ci.ALETTER && (nextType === ci.MIDLETTER || nextType === ci.MIDNUMLET || nextType === ci.AT) && nextNextType === ci.ALETTER) {
      return false;
    }
    prevType = map[index - 1];
    if ((type === ci.MIDLETTER || type === ci.MIDNUMLET || nextType === ci.AT) && nextType === ci.ALETTER && prevType === ci.ALETTER) {
      return false;
    }
    if ((type === ci.NUMERIC || type === ci.ALETTER) && (nextType === ci.NUMERIC || nextType === ci.ALETTER)) {
      return false;
    }
    if ((type === ci.MIDNUM || type === ci.MIDNUMLET) && nextType === ci.NUMERIC && prevType === ci.NUMERIC) {
      return false;
    }
    if (type === ci.NUMERIC && (nextType === ci.MIDNUM || nextType === ci.MIDNUMLET) && nextNextType === ci.NUMERIC) {
      return false;
    }
    if (type === ci.EXTEND || type === ci.FORMAT || prevType === ci.EXTEND || prevType === ci.FORMAT || nextType === ci.EXTEND || nextType === ci.FORMAT) {
      return false;
    }
    if (type === ci.CR && nextType === ci.LF) {
      return false;
    }
    if (type === ci.NEWLINE || type === ci.CR || type === ci.LF) {
      return true;
    }
    if (nextType === ci.NEWLINE || nextType === ci.CR || nextType === ci.LF) {
      return true;
    }
    if (type === ci.KATAKANA && nextType === ci.KATAKANA) {
      return false;
    }
    if (nextType === ci.EXTENDNUMLET && (type === ci.ALETTER || type === ci.NUMERIC || type === ci.KATAKANA || type === ci.EXTENDNUMLET)) {
      return false;
    }
    if (type === ci.EXTENDNUMLET && (nextType === ci.ALETTER || nextType === ci.NUMERIC || nextType === ci.KATAKANA)) {
      return false;
    }
    if (type === ci.AT) {
      return false;
    }
    return true;
  };
  var $_5dv29stkjkmcwsep = { isWordBoundary: isWordBoundary };
  var EMPTY_STRING$1 = $_449maathjkmcwsee.EMPTY_STRING;
  var WHITESPACE$1 = $_449maathjkmcwsee.WHITESPACE;
  var PUNCTUATION$1 = $_449maathjkmcwsee.PUNCTUATION;
  var isProtocol = function (word) {
    return word === 'http' || word === 'https';
  };
  var findWordEnd = function (str, index) {
    var i;
    for (i = index; i < str.length; ++i) {
      var chr = str.charAt(i);
      if (WHITESPACE$1.test(chr)) {
        break;
      }
    }
    return i;
  };
  var extractUrl = function (word, str, index) {
    var endIndex = findWordEnd(str, index + 1);
    var peakedWord = str.substring(index + 1, endIndex);
    if (peakedWord.substr(0, 3) === '://') {
      return {
        word: word + peakedWord,
        index: endIndex
      };
    }
    return {
      word: word,
      index: index
    };
  };
  var doGetWords = function (str, options) {
    var i = 0;
    var map = $_5uy6wmtijkmcwsel.classify(str);
    var len = map.length;
    var word = [];
    var words = [];
    var chr;
    var includePunctuation;
    var includeWhitespace;
    if (!options) {
      options = {};
    }
    if (options.ignoreCase) {
      str = str.toLowerCase();
    }
    includePunctuation = options.includePunctuation;
    includeWhitespace = options.includeWhitespace;
    for (; i < len; ++i) {
      chr = str.charAt(i);
      word.push(chr);
      if ($_5dv29stkjkmcwsep.isWordBoundary(map, i)) {
        word = word.join(EMPTY_STRING$1);
        if (word && (includeWhitespace || !WHITESPACE$1.test(word)) && (includePunctuation || !PUNCTUATION$1.test(word))) {
          if (isProtocol(word)) {
            var obj = extractUrl(word, str, i);
            words.push(obj.word);
            i = obj.index;
          } else {
            words.push(word);
          }
        }
        word = [];
      }
    }
    return words;
  };
  var getWords = function (str, options) {
    return doGetWords(str.replace(/\ufeff/g, ''), options);
  };
  var $_h7nfltgjkmcwsea = { getWords: getWords };
  var getTextContent = function (editor) {
    return editor.removed ? '' : editor.getBody().innerText;
  };
  var getCount = function (editor) {
    return $_h7nfltgjkmcwsea.getWords(getTextContent(editor)).length;
  };
  var $_bjntw8tfjkmcwse9 = { getCount: getCount };
  var get = function (editor) {
    var getCount = function () {
      return $_bjntw8tfjkmcwse9.getCount(editor);
    };
    return { getCount: getCount };
  };
  var $_eb00d3tejkmcwse8 = { get: get };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');
  var setup = function (editor) {
    var wordsToText = function (editor) {
      return global$2.translate([
        '{0} words',
        $_bjntw8tfjkmcwse9.getCount(editor)
      ]);
    };
    var update = function () {
      editor.theme.panel.find('#wordcount').text(wordsToText(editor));
    };
    editor.on('init', function () {
      var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];
      var debouncedUpdate = global$1.debounce(update, 300);
      if (statusbar) {
        global$1.setEditorTimeout(editor, function () {
          statusbar.insert({
            type: 'label',
            name: 'wordcount',
            text: wordsToText(editor),
            classes: 'wordcount',
            disabled: editor.settings.readonly
          }, 0);
          editor.on('setcontent beforeaddundo undo redo keyup', debouncedUpdate);
        }, 0);
      }
    });
  };
  var $_8spwwmtljkmcwser = { setup: setup };
  global.add('wordcount', function (editor) {
    $_8spwwmtljkmcwser.setup(editor);
    return $_eb00d3tejkmcwse8.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var advlist = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var applyListFormat = function (editor, listName, styleValue) {
    var cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
    editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
  };
  var $_55fky08fjkmcwo2a = { applyListFormat: applyListFormat };
  var register = function (editor) {
    editor.addCommand('ApplyUnorderedListStyle', function (ui, value) {
      $_55fky08fjkmcwo2a.applyListFormat(editor, 'UL', value['list-style-type']);
    });
    editor.addCommand('ApplyOrderedListStyle', function (ui, value) {
      $_55fky08fjkmcwo2a.applyListFormat(editor, 'OL', value['list-style-type']);
    });
  };
  var $_cjqqqe8ejkmcwo28 = { register: register };
  var getNumberStyles = function (editor) {
    var styles = editor.getParam('advlist_number_styles', 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var getBulletStyles = function (editor) {
    var styles = editor.getParam('advlist_bullet_styles', 'default,circle,disc,square');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var $_2zo4iv8hjkmcwo2f = {
    getNumberStyles: getNumberStyles,
    getBulletStyles: getBulletStyles
  };
  var isChildOfBody = function (editor, elm) {
    return editor.$.contains(editor.getBody(), elm);
  };
  var isTableCellNode = function (node) {
    return node && /^(TH|TD)$/.test(node.nodeName);
  };
  var isListNode = function (editor) {
    return function (node) {
      return node && /^(OL|UL|DL)$/.test(node.nodeName) && isChildOfBody(editor, node);
    };
  };
  var getSelectedStyleType = function (editor) {
    var listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
    return editor.dom.getStyle(listElm, 'listStyleType') || '';
  };
  var $_djj0lo8ijkmcwo2g = {
    isTableCellNode: isTableCellNode,
    isListNode: isListNode,
    getSelectedStyleType: getSelectedStyleType
  };
  var styleValueToText = function (styleValue) {
    return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, function (chr) {
      return chr.toUpperCase();
    });
  };
  var toMenuItems = function (styles) {
    return global$1.map(styles, function (styleValue) {
      var text = styleValueToText(styleValue);
      var data = styleValue === 'default' ? '' : styleValue;
      return {
        text: text,
        data: data
      };
    });
  };
  var $_cbyrf58jjkmcwo2h = { toMenuItems: toMenuItems };
  var findIndex = function (list, predicate) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if (predicate(element)) {
        return index;
      }
    }
    return -1;
  };
  var listState = function (editor, listName) {
    return function (e) {
      var ctrl = e.control;
      editor.on('NodeChange', function (e) {
        var tableCellIndex = findIndex(e.parents, $_djj0lo8ijkmcwo2g.isTableCellNode);
        var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
        var lists = global$1.grep(parents, $_djj0lo8ijkmcwo2g.isListNode(editor));
        ctrl.active(lists.length > 0 && lists[0].nodeName === listName);
      });
    };
  };
  var updateSelection = function (editor) {
    return function (e) {
      var listStyleType = $_djj0lo8ijkmcwo2g.getSelectedStyleType(editor);
      e.control.items().each(function (ctrl) {
        ctrl.active(ctrl.settings.data === listStyleType);
      });
    };
  };
  var addSplitButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'splitbutton',
      tooltip: tooltip,
      menu: $_cbyrf58jjkmcwo2h.toMenuItems(styles),
      onPostRender: listState(editor, nodeName),
      onshow: updateSelection(editor),
      onselect: function (e) {
        $_55fky08fjkmcwo2a.applyListFormat(editor, nodeName, e.control.settings.data);
      },
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'button',
      tooltip: tooltip,
      onPostRender: listState(editor, nodeName),
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addControl = function (editor, id, tooltip, cmd, nodeName, styles) {
    if (styles.length > 0) {
      addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
    } else {
      addButton(editor, id, tooltip, cmd, nodeName, styles);
    }
  };
  var register$1 = function (editor) {
    addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', $_2zo4iv8hjkmcwo2f.getNumberStyles(editor));
    addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', $_2zo4iv8hjkmcwo2f.getBulletStyles(editor));
  };
  var $_d74fz58gjkmcwo2b = { register: register$1 };
  global.add('advlist', function (editor) {
    var hasPlugin = function (editor, plugin) {
      var plugins = editor.settings.plugins ? editor.settings.plugins : '';
      return global$1.inArray(plugins.split(/[ ,]/), plugin) !== -1;
    };
    if (hasPlugin(editor, 'lists')) {
      $_d74fz58gjkmcwo2b.register(editor);
      $_cjqqqe8ejkmcwo28.register(editor);
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var wordcount = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var regExps = {
    aletter: '[A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05F3\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u24B6-\u24E9\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005\u303b\u303c\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790\ua791\ua7a0-\ua7a9\ua7fa-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
    midnumlet: '[-\'\\.\u2018\u2019\u2024\uFE52\uFF07\uFF0E]',
    midletter: '[:\xB7\xB7\u05F4\u2027\uFE13\uFE55\uFF1A]',
    midnum: '[\xB1+*/,;;\u0589\u060C\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]',
    numeric: '[0-9\u0660-\u0669\u066B\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9]',
    cr: '\\r',
    lf: '\\n',
    newline: '[\x0B\f\x85\u2028\u2029]',
    extend: '[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f\u109a-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b6-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u192b\u1930-\u193b\u19b0-\u19c0\u19c8\u19c9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f\u1b00-\u1b04\u1b34-\u1b44\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1baa\u1be6-\u1bf3\u1c24-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\uA672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe3-\uabea\uabec\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]',
    format: '[\xAD\u0600-\u0603\u06DD\u070F\u17b4\u17b5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
    katakana: '[\u3031-\u3035\u309B\u309C\u30A0-\u30fa\u30fc-\u30ff\u31f0-\u31ff\u32D0-\u32FE\u3300-\u3357\uff66-\uff9d]',
    extendnumlet: '[=_\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f\u2200-\u22FF<>]',
    punctuation: '[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uff3f\uFF5B\uFF5D\uFF5F-\uFF65]'
  };
  var characterIndices = {
    ALETTER: 0,
    MIDNUMLET: 1,
    MIDLETTER: 2,
    MIDNUM: 3,
    NUMERIC: 4,
    CR: 5,
    LF: 6,
    NEWLINE: 7,
    EXTEND: 8,
    FORMAT: 9,
    KATAKANA: 10,
    EXTENDNUMLET: 11,
    AT: 12,
    OTHER: 13
  };
  var SETS = [
    new RegExp(regExps.aletter),
    new RegExp(regExps.midnumlet),
    new RegExp(regExps.midletter),
    new RegExp(regExps.midnum),
    new RegExp(regExps.numeric),
    new RegExp(regExps.cr),
    new RegExp(regExps.lf),
    new RegExp(regExps.newline),
    new RegExp(regExps.extend),
    new RegExp(regExps.format),
    new RegExp(regExps.katakana),
    new RegExp(regExps.extendnumlet),
    new RegExp('@')
  ];
  var EMPTY_STRING = '';
  var PUNCTUATION = new RegExp('^' + regExps.punctuation + '$');
  var WHITESPACE = /^\s+$/;
  var $_449maathjkmcwsee = {
    characterIndices: characterIndices,
    SETS: SETS,
    EMPTY_STRING: EMPTY_STRING,
    PUNCTUATION: PUNCTUATION,
    WHITESPACE: WHITESPACE
  };
  var each = function (o, cb, s) {
    var n, l;
    if (!o) {
      return 0;
    }
    s = s || o;
    if (o.length !== undefined) {
      for (n = 0, l = o.length; n < l; n++) {
        if (cb.call(s, o[n], n, o) === false) {
          return 0;
        }
      }
    } else {
      for (n in o) {
        if (o.hasOwnProperty(n)) {
          if (cb.call(s, o[n], n, o) === false) {
            return 0;
          }
        }
      }
    }
    return 1;
  };
  var map = function (array, callback) {
    var out = [];
    each(array, function (item, index) {
      out.push(callback(item, index, array));
    });
    return out;
  };
  var $_3uizbntjjkmcwsen = {
    each: each,
    map: map
  };
  var SETS$1 = $_449maathjkmcwsee.SETS;
  var OTHER = $_449maathjkmcwsee.characterIndices.OTHER;
  var getType = function (char) {
    var j, set, type = OTHER;
    var setsLength = SETS$1.length;
    for (j = 0; j < setsLength; ++j) {
      set = SETS$1[j];
      if (set && set.test(char)) {
        type = j;
        break;
      }
    }
    return type;
  };
  var memoize = function (func) {
    var cache = {};
    return function (char) {
      if (cache[char]) {
        return cache[char];
      } else {
        var result = func(char);
        cache[char] = result;
        return result;
      }
    };
  };
  var classify = function (string) {
    var memoized = memoize(getType);
    return $_3uizbntjjkmcwsen.map(string.split(''), memoized);
  };
  var $_5uy6wmtijkmcwsel = { classify: classify };
  var ci = $_449maathjkmcwsee.characterIndices;
  var isWordBoundary = function (map, index) {
    var prevType;
    var type = map[index];
    var nextType = map[index + 1];
    var nextNextType;
    if (index < 0 || index > map.length - 1 && index !== 0) {
      return false;
    }
    if (type === ci.ALETTER && nextType === ci.ALETTER) {
      return false;
    }
    nextNextType = map[index + 2];
    if (type === ci.ALETTER && (nextType === ci.MIDLETTER || nextType === ci.MIDNUMLET || nextType === ci.AT) && nextNextType === ci.ALETTER) {
      return false;
    }
    prevType = map[index - 1];
    if ((type === ci.MIDLETTER || type === ci.MIDNUMLET || nextType === ci.AT) && nextType === ci.ALETTER && prevType === ci.ALETTER) {
      return false;
    }
    if ((type === ci.NUMERIC || type === ci.ALETTER) && (nextType === ci.NUMERIC || nextType === ci.ALETTER)) {
      return false;
    }
    if ((type === ci.MIDNUM || type === ci.MIDNUMLET) && nextType === ci.NUMERIC && prevType === ci.NUMERIC) {
      return false;
    }
    if (type === ci.NUMERIC && (nextType === ci.MIDNUM || nextType === ci.MIDNUMLET) && nextNextType === ci.NUMERIC) {
      return false;
    }
    if (type === ci.EXTEND || type === ci.FORMAT || prevType === ci.EXTEND || prevType === ci.FORMAT || nextType === ci.EXTEND || nextType === ci.FORMAT) {
      return false;
    }
    if (type === ci.CR && nextType === ci.LF) {
      return false;
    }
    if (type === ci.NEWLINE || type === ci.CR || type === ci.LF) {
      return true;
    }
    if (nextType === ci.NEWLINE || nextType === ci.CR || nextType === ci.LF) {
      return true;
    }
    if (type === ci.KATAKANA && nextType === ci.KATAKANA) {
      return false;
    }
    if (nextType === ci.EXTENDNUMLET && (type === ci.ALETTER || type === ci.NUMERIC || type === ci.KATAKANA || type === ci.EXTENDNUMLET)) {
      return false;
    }
    if (type === ci.EXTENDNUMLET && (nextType === ci.ALETTER || nextType === ci.NUMERIC || nextType === ci.KATAKANA)) {
      return false;
    }
    if (type === ci.AT) {
      return false;
    }
    return true;
  };
  var $_5dv29stkjkmcwsep = { isWordBoundary: isWordBoundary };
  var EMPTY_STRING$1 = $_449maathjkmcwsee.EMPTY_STRING;
  var WHITESPACE$1 = $_449maathjkmcwsee.WHITESPACE;
  var PUNCTUATION$1 = $_449maathjkmcwsee.PUNCTUATION;
  var isProtocol = function (word) {
    return word === 'http' || word === 'https';
  };
  var findWordEnd = function (str, index) {
    var i;
    for (i = index; i < str.length; ++i) {
      var chr = str.charAt(i);
      if (WHITESPACE$1.test(chr)) {
        break;
      }
    }
    return i;
  };
  var extractUrl = function (word, str, index) {
    var endIndex = findWordEnd(str, index + 1);
    var peakedWord = str.substring(index + 1, endIndex);
    if (peakedWord.substr(0, 3) === '://') {
      return {
        word: word + peakedWord,
        index: endIndex
      };
    }
    return {
      word: word,
      index: index
    };
  };
  var doGetWords = function (str, options) {
    var i = 0;
    var map = $_5uy6wmtijkmcwsel.classify(str);
    var len = map.length;
    var word = [];
    var words = [];
    var chr;
    var includePunctuation;
    var includeWhitespace;
    if (!options) {
      options = {};
    }
    if (options.ignoreCase) {
      str = str.toLowerCase();
    }
    includePunctuation = options.includePunctuation;
    includeWhitespace = options.includeWhitespace;
    for (; i < len; ++i) {
      chr = str.charAt(i);
      word.push(chr);
      if ($_5dv29stkjkmcwsep.isWordBoundary(map, i)) {
        word = word.join(EMPTY_STRING$1);
        if (word && (includeWhitespace || !WHITESPACE$1.test(word)) && (includePunctuation || !PUNCTUATION$1.test(word))) {
          if (isProtocol(word)) {
            var obj = extractUrl(word, str, i);
            words.push(obj.word);
            i = obj.index;
          } else {
            words.push(word);
          }
        }
        word = [];
      }
    }
    return words;
  };
  var getWords = function (str, options) {
    return doGetWords(str.replace(/\ufeff/g, ''), options);
  };
  var $_h7nfltgjkmcwsea = { getWords: getWords };
  var getTextContent = function (editor) {
    return editor.removed ? '' : editor.getBody().innerText;
  };
  var getCount = function (editor) {
    return $_h7nfltgjkmcwsea.getWords(getTextContent(editor)).length;
  };
  var $_bjntw8tfjkmcwse9 = { getCount: getCount };
  var get = function (editor) {
    var getCount = function () {
      return $_bjntw8tfjkmcwse9.getCount(editor);
    };
    return { getCount: getCount };
  };
  var $_eb00d3tejkmcwse8 = { get: get };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');
  var setup = function (editor) {
    var wordsToText = function (editor) {
      return global$2.translate([
        '{0} words',
        $_bjntw8tfjkmcwse9.getCount(editor)
      ]);
    };
    var update = function () {
      editor.theme.panel.find('#wordcount').text(wordsToText(editor));
    };
    editor.on('init', function () {
      var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];
      var debouncedUpdate = global$1.debounce(update, 300);
      if (statusbar) {
        global$1.setEditorTimeout(editor, function () {
          statusbar.insert({
            type: 'label',
            name: 'wordcount',
            text: wordsToText(editor),
            classes: 'wordcount',
            disabled: editor.settings.readonly
          }, 0);
          editor.on('setcontent beforeaddundo undo redo keyup', debouncedUpdate);
        }, 0);
      }
    });
  };
  var $_8spwwmtljkmcwser = { setup: setup };
  global.add('wordcount', function (editor) {
    $_8spwwmtljkmcwser.setup(editor);
    return $_eb00d3tejkmcwse8.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var autolink = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var getAutoLinkPattern = function (editor) {
    return editor.getParam('autolink_pattern', /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i);
  };
  var getDefaultLinkTarget = function (editor) {
    return editor.getParam('default_link_target', '');
  };
  var $_etr1bi8vjkmcwo3m = {
    getAutoLinkPattern: getAutoLinkPattern,
    getDefaultLinkTarget: getDefaultLinkTarget
  };
  var rangeEqualsDelimiterOrSpace = function (rangeString, delimiter) {
    return rangeString === delimiter || rangeString === ' ' || rangeString.charCodeAt(0) === 160;
  };
  var handleEclipse = function (editor) {
    parseCurrentLine(editor, -1, '(');
  };
  var handleSpacebar = function (editor) {
    parseCurrentLine(editor, 0, '');
  };
  var handleEnter = function (editor) {
    parseCurrentLine(editor, -1, '');
  };
  var scopeIndex = function (container, index) {
    if (index < 0) {
      index = 0;
    }
    if (container.nodeType === 3) {
      var len = container.data.length;
      if (index > len) {
        index = len;
      }
    }
    return index;
  };
  var setStart = function (rng, container, offset) {
    if (container.nodeType !== 1 || container.hasChildNodes()) {
      rng.setStart(container, scopeIndex(container, offset));
    } else {
      rng.setStartBefore(container);
    }
  };
  var setEnd = function (rng, container, offset) {
    if (container.nodeType !== 1 || container.hasChildNodes()) {
      rng.setEnd(container, scopeIndex(container, offset));
    } else {
      rng.setEndAfter(container);
    }
  };
  var parseCurrentLine = function (editor, endOffset, delimiter) {
    var rng, end, start, endContainer, bookmark, text, matches, prev, len, rngText;
    var autoLinkPattern = $_etr1bi8vjkmcwo3m.getAutoLinkPattern(editor);
    var defaultLinkTarget = $_etr1bi8vjkmcwo3m.getDefaultLinkTarget(editor);
    if (editor.selection.getNode().tagName === 'A') {
      return;
    }
    rng = editor.selection.getRng(true).cloneRange();
    if (rng.startOffset < 5) {
      prev = rng.endContainer.previousSibling;
      if (!prev) {
        if (!rng.endContainer.firstChild || !rng.endContainer.firstChild.nextSibling) {
          return;
        }
        prev = rng.endContainer.firstChild.nextSibling;
      }
      len = prev.length;
      setStart(rng, prev, len);
      setEnd(rng, prev, len);
      if (rng.endOffset < 5) {
        return;
      }
      end = rng.endOffset;
      endContainer = prev;
    } else {
      endContainer = rng.endContainer;
      if (endContainer.nodeType !== 3 && endContainer.firstChild) {
        while (endContainer.nodeType !== 3 && endContainer.firstChild) {
          endContainer = endContainer.firstChild;
        }
        if (endContainer.nodeType === 3) {
          setStart(rng, endContainer, 0);
          setEnd(rng, endContainer, endContainer.nodeValue.length);
        }
      }
      if (rng.endOffset === 1) {
        end = 2;
      } else {
        end = rng.endOffset - 1 - endOffset;
      }
    }
    start = end;
    do {
      setStart(rng, endContainer, end >= 2 ? end - 2 : 0);
      setEnd(rng, endContainer, end >= 1 ? end - 1 : 0);
      end -= 1;
      rngText = rng.toString();
    } while (rngText !== ' ' && rngText !== '' && rngText.charCodeAt(0) !== 160 && end - 2 >= 0 && rngText !== delimiter);
    if (rangeEqualsDelimiterOrSpace(rng.toString(), delimiter)) {
      setStart(rng, endContainer, end);
      setEnd(rng, endContainer, start);
      end += 1;
    } else if (rng.startOffset === 0) {
      setStart(rng, endContainer, 0);
      setEnd(rng, endContainer, start);
    } else {
      setStart(rng, endContainer, end);
      setEnd(rng, endContainer, start);
    }
    text = rng.toString();
    if (text.charAt(text.length - 1) === '.') {
      setEnd(rng, endContainer, start - 1);
    }
    text = rng.toString().trim();
    matches = text.match(autoLinkPattern);
    if (matches) {
      if (matches[1] === 'www.') {
        matches[1] = 'http://www.';
      } else if (/@$/.test(matches[1]) && !/^mailto:/.test(matches[1])) {
        matches[1] = 'mailto:' + matches[1];
      }
      bookmark = editor.selection.getBookmark();
      editor.selection.setRng(rng);
      editor.execCommand('createlink', false, matches[1] + matches[2]);
      if (defaultLinkTarget) {
        editor.dom.setAttrib(editor.selection.getNode(), 'target', defaultLinkTarget);
      }
      editor.selection.moveToBookmark(bookmark);
      editor.nodeChanged();
    }
  };
  var setup = function (editor) {
    var autoUrlDetectState;
    editor.on('keydown', function (e) {
      if (e.keyCode === 13) {
        return handleEnter(editor);
      }
    });
    if (global$1.ie) {
      editor.on('focus', function () {
        if (!autoUrlDetectState) {
          autoUrlDetectState = true;
          try {
            editor.execCommand('AutoUrlDetect', false, true);
          } catch (ex) {
          }
        }
      });
      return;
    }
    editor.on('keypress', function (e) {
      if (e.keyCode === 41) {
        return handleEclipse(editor);
      }
    });
    editor.on('keyup', function (e) {
      if (e.keyCode === 32) {
        return handleSpacebar(editor);
      }
    });
  };
  var $_eivkp88tjkmcwo3h = { setup: setup };
  global.add('autolink', function (editor) {
    $_eivkp88tjkmcwo3h.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var autosave = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var fireRestoreDraft = function (editor) {
    return editor.fire('RestoreDraft');
  };
  var fireStoreDraft = function (editor) {
    return editor.fire('StoreDraft');
  };
  var fireRemoveDraft = function (editor) {
    return editor.fire('RemoveDraft');
  };
  var $_8zd9yr9bjkmcwo50 = {
    fireRestoreDraft: fireRestoreDraft,
    fireStoreDraft: fireStoreDraft,
    fireRemoveDraft: fireRemoveDraft
  };
  var parse = function (time, defaultTime) {
    var multiples = {
      s: 1000,
      m: 60000
    };
    time = /^(\d+)([ms]?)$/.exec('' + (time || defaultTime));
    return (time[2] ? multiples[time[2]] : 1) * parseInt(time, 10);
  };
  var $_1vgqti9djkmcwo52 = { parse: parse };
  var shouldAskBeforeUnload = function (editor) {
    return editor.getParam('autosave_ask_before_unload', true);
  };
  var getAutoSavePrefix = function (editor) {
    var prefix = editor.getParam('autosave_prefix', 'tinymce-autosave-{path}{query}{hash}-{id}-');
    prefix = prefix.replace(/\{path\}/g, document.location.pathname);
    prefix = prefix.replace(/\{query\}/g, document.location.search);
    prefix = prefix.replace(/\{hash\}/g, document.location.hash);
    prefix = prefix.replace(/\{id\}/g, editor.id);
    return prefix;
  };
  var shouldRestoreWhenEmpty = function (editor) {
    return editor.getParam('autosave_restore_when_empty', false);
  };
  var getAutoSaveInterval = function (editor) {
    return $_1vgqti9djkmcwo52.parse(editor.settings.autosave_interval, '30s');
  };
  var getAutoSaveRetention = function (editor) {
    return $_1vgqti9djkmcwo52.parse(editor.settings.autosave_retention, '20m');
  };
  var $_btqg8h9cjkmcwo51 = {
    shouldAskBeforeUnload: shouldAskBeforeUnload,
    getAutoSavePrefix: getAutoSavePrefix,
    shouldRestoreWhenEmpty: shouldRestoreWhenEmpty,
    getAutoSaveInterval: getAutoSaveInterval,
    getAutoSaveRetention: getAutoSaveRetention
  };
  var isEmpty = function (editor, html) {
    var forcedRootBlockName = editor.settings.forced_root_block;
    html = global$2.trim(typeof html === 'undefined' ? editor.getBody().innerHTML : html);
    return html === '' || new RegExp('^<' + forcedRootBlockName + '[^>]*>((\xA0|&nbsp;|[ \t]|<br[^>]*>)+?|)</' + forcedRootBlockName + '>|<br>$', 'i').test(html);
  };
  var hasDraft = function (editor) {
    var time = parseInt(global$1.getItem($_btqg8h9cjkmcwo51.getAutoSavePrefix(editor) + 'time'), 10) || 0;
    if (new Date().getTime() - time > $_btqg8h9cjkmcwo51.getAutoSaveRetention(editor)) {
      removeDraft(editor, false);
      return false;
    }
    return true;
  };
  var removeDraft = function (editor, fire) {
    var prefix = $_btqg8h9cjkmcwo51.getAutoSavePrefix(editor);
    global$1.removeItem(prefix + 'draft');
    global$1.removeItem(prefix + 'time');
    if (fire !== false) {
      $_8zd9yr9bjkmcwo50.fireRemoveDraft(editor);
    }
  };
  var storeDraft = function (editor) {
    var prefix = $_btqg8h9cjkmcwo51.getAutoSavePrefix(editor);
    if (!isEmpty(editor) && editor.isDirty()) {
      global$1.setItem(prefix + 'draft', editor.getContent({
        format: 'raw',
        no_events: true
      }));
      global$1.setItem(prefix + 'time', new Date().getTime().toString());
      $_8zd9yr9bjkmcwo50.fireStoreDraft(editor);
    }
  };
  var restoreDraft = function (editor) {
    var prefix = $_btqg8h9cjkmcwo51.getAutoSavePrefix(editor);
    if (hasDraft(editor)) {
      editor.setContent(global$1.getItem(prefix + 'draft'), { format: 'raw' });
      $_8zd9yr9bjkmcwo50.fireRestoreDraft(editor);
    }
  };
  var startStoreDraft = function (editor, started) {
    var interval = $_btqg8h9cjkmcwo51.getAutoSaveInterval(editor);
    if (!started.get()) {
      setInterval(function () {
        if (!editor.removed) {
          storeDraft(editor);
        }
      }, interval);
      started.set(true);
    }
  };
  var restoreLastDraft = function (editor) {
    editor.undoManager.transact(function () {
      restoreDraft(editor);
      removeDraft(editor);
    });
    editor.focus();
  };
  var $_4kalmm98jkmcwo4w = {
    isEmpty: isEmpty,
    hasDraft: hasDraft,
    removeDraft: removeDraft,
    storeDraft: storeDraft,
    restoreDraft: restoreDraft,
    startStoreDraft: startStoreDraft,
    restoreLastDraft: restoreLastDraft
  };
  var curry = function (f, editor) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      return f.apply(null, [editor].concat(args));
    };
  };
  var get = function (editor) {
    return {
      hasDraft: curry($_4kalmm98jkmcwo4w.hasDraft, editor),
      storeDraft: curry($_4kalmm98jkmcwo4w.storeDraft, editor),
      restoreDraft: curry($_4kalmm98jkmcwo4w.restoreDraft, editor),
      removeDraft: curry($_4kalmm98jkmcwo4w.removeDraft, editor),
      isEmpty: curry($_4kalmm98jkmcwo4w.isEmpty, editor)
    };
  };
  var $_epu93997jkmcwo4v = { get: get };
  var global$3 = tinymce.util.Tools.resolve('tinymce.EditorManager');
  global$3._beforeUnloadHandler = function () {
    var msg;
    global$2.each(global$3.get(), function (editor) {
      if (editor.plugins.autosave) {
        editor.plugins.autosave.storeDraft();
      }
      if (!msg && editor.isDirty() && $_btqg8h9cjkmcwo51.shouldAskBeforeUnload(editor)) {
        msg = editor.translate('You have unsaved changes are you sure you want to navigate away?');
      }
    });
    return msg;
  };
  var setup = function (editor) {
    window.onbeforeunload = global$3._beforeUnloadHandler;
  };
  var $_6um2lv9fjkmcwo5i = { setup: setup };
  var postRender = function (editor, started) {
    return function (e) {
      var ctrl = e.control;
      ctrl.disabled(!$_4kalmm98jkmcwo4w.hasDraft(editor));
      editor.on('StoreDraft RestoreDraft RemoveDraft', function () {
        ctrl.disabled(!$_4kalmm98jkmcwo4w.hasDraft(editor));
      });
      $_4kalmm98jkmcwo4w.startStoreDraft(editor, started);
    };
  };
  var register = function (editor, started) {
    editor.addButton('restoredraft', {
      title: 'Restore last draft',
      onclick: function () {
        $_4kalmm98jkmcwo4w.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started)
    });
    editor.addMenuItem('restoredraft', {
      text: 'Restore last draft',
      onclick: function () {
        $_4kalmm98jkmcwo4w.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started),
      context: 'file'
    });
  };
  var $_bbusws9hjkmcwo5l = { register: register };
  global.add('autosave', function (editor) {
    var started = Cell(false);
    $_6um2lv9fjkmcwo5i.setup(editor);
    $_bbusws9hjkmcwo5l.register(editor, started);
    return $_epu93997jkmcwo4v.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var charmap = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var fireInsertCustomChar = function (editor, chr) {
    return editor.fire('insertCustomChar', { chr: chr });
  };
  var $_cg0riu9qjkmcwo79 = { fireInsertCustomChar: fireInsertCustomChar };
  var insertChar = function (editor, chr) {
    var evtChr = $_cg0riu9qjkmcwo79.fireInsertCustomChar(editor, chr).chr;
    editor.execCommand('mceInsertContent', false, evtChr);
  };
  var $_e3yubu9pjkmcwo78 = { insertChar: insertChar };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getCharMap = function (editor) {
    return editor.settings.charmap;
  };
  var getCharMapAppend = function (editor) {
    return editor.settings.charmap_append;
  };
  var $_2fxxqm9tjkmcwo7g = {
    getCharMap: getCharMap,
    getCharMapAppend: getCharMapAppend
  };
  var isArray = global$1.isArray;
  var getDefaultCharMap = function () {
    return [
      [
        '160',
        'no-break space'
      ],
      [
        '173',
        'soft hyphen'
      ],
      [
        '34',
        'quotation mark'
      ],
      [
        '162',
        'cent sign'
      ],
      [
        '8364',
        'euro sign'
      ],
      [
        '163',
        'pound sign'
      ],
      [
        '165',
        'yen sign'
      ],
      [
        '169',
        'copyright sign'
      ],
      [
        '174',
        'registered sign'
      ],
      [
        '8482',
        'trade mark sign'
      ],
      [
        '8240',
        'per mille sign'
      ],
      [
        '181',
        'micro sign'
      ],
      [
        '183',
        'middle dot'
      ],
      [
        '8226',
        'bullet'
      ],
      [
        '8230',
        'three dot leader'
      ],
      [
        '8242',
        'minutes / feet'
      ],
      [
        '8243',
        'seconds / inches'
      ],
      [
        '167',
        'section sign'
      ],
      [
        '182',
        'paragraph sign'
      ],
      [
        '223',
        'sharp s / ess-zed'
      ],
      [
        '8249',
        'single left-pointing angle quotation mark'
      ],
      [
        '8250',
        'single right-pointing angle quotation mark'
      ],
      [
        '171',
        'left pointing guillemet'
      ],
      [
        '187',
        'right pointing guillemet'
      ],
      [
        '8216',
        'left single quotation mark'
      ],
      [
        '8217',
        'right single quotation mark'
      ],
      [
        '8220',
        'left double quotation mark'
      ],
      [
        '8221',
        'right double quotation mark'
      ],
      [
        '8218',
        'single low-9 quotation mark'
      ],
      [
        '8222',
        'double low-9 quotation mark'
      ],
      [
        '60',
        'less-than sign'
      ],
      [
        '62',
        'greater-than sign'
      ],
      [
        '8804',
        'less-than or equal to'
      ],
      [
        '8805',
        'greater-than or equal to'
      ],
      [
        '8211',
        'en dash'
      ],
      [
        '8212',
        'em dash'
      ],
      [
        '175',
        'macron'
      ],
      [
        '8254',
        'overline'
      ],
      [
        '164',
        'currency sign'
      ],
      [
        '166',
        'broken bar'
      ],
      [
        '168',
        'diaeresis'
      ],
      [
        '161',
        'inverted exclamation mark'
      ],
      [
        '191',
        'turned question mark'
      ],
      [
        '710',
        'circumflex accent'
      ],
      [
        '732',
        'small tilde'
      ],
      [
        '176',
        'degree sign'
      ],
      [
        '8722',
        'minus sign'
      ],
      [
        '177',
        'plus-minus sign'
      ],
      [
        '247',
        'division sign'
      ],
      [
        '8260',
        'fraction slash'
      ],
      [
        '215',
        'multiplication sign'
      ],
      [
        '185',
        'superscript one'
      ],
      [
        '178',
        'superscript two'
      ],
      [
        '179',
        'superscript three'
      ],
      [
        '188',
        'fraction one quarter'
      ],
      [
        '189',
        'fraction one half'
      ],
      [
        '190',
        'fraction three quarters'
      ],
      [
        '402',
        'function / florin'
      ],
      [
        '8747',
        'integral'
      ],
      [
        '8721',
        'n-ary sumation'
      ],
      [
        '8734',
        'infinity'
      ],
      [
        '8730',
        'square root'
      ],
      [
        '8764',
        'similar to'
      ],
      [
        '8773',
        'approximately equal to'
      ],
      [
        '8776',
        'almost equal to'
      ],
      [
        '8800',
        'not equal to'
      ],
      [
        '8801',
        'identical to'
      ],
      [
        '8712',
        'element of'
      ],
      [
        '8713',
        'not an element of'
      ],
      [
        '8715',
        'contains as member'
      ],
      [
        '8719',
        'n-ary product'
      ],
      [
        '8743',
        'logical and'
      ],
      [
        '8744',
        'logical or'
      ],
      [
        '172',
        'not sign'
      ],
      [
        '8745',
        'intersection'
      ],
      [
        '8746',
        'union'
      ],
      [
        '8706',
        'partial differential'
      ],
      [
        '8704',
        'for all'
      ],
      [
        '8707',
        'there exists'
      ],
      [
        '8709',
        'diameter'
      ],
      [
        '8711',
        'backward difference'
      ],
      [
        '8727',
        'asterisk operator'
      ],
      [
        '8733',
        'proportional to'
      ],
      [
        '8736',
        'angle'
      ],
      [
        '180',
        'acute accent'
      ],
      [
        '184',
        'cedilla'
      ],
      [
        '170',
        'feminine ordinal indicator'
      ],
      [
        '186',
        'masculine ordinal indicator'
      ],
      [
        '8224',
        'dagger'
      ],
      [
        '8225',
        'double dagger'
      ],
      [
        '192',
        'A - grave'
      ],
      [
        '193',
        'A - acute'
      ],
      [
        '194',
        'A - circumflex'
      ],
      [
        '195',
        'A - tilde'
      ],
      [
        '196',
        'A - diaeresis'
      ],
      [
        '197',
        'A - ring above'
      ],
      [
        '256',
        'A - macron'
      ],
      [
        '198',
        'ligature AE'
      ],
      [
        '199',
        'C - cedilla'
      ],
      [
        '200',
        'E - grave'
      ],
      [
        '201',
        'E - acute'
      ],
      [
        '202',
        'E - circumflex'
      ],
      [
        '203',
        'E - diaeresis'
      ],
      [
        '274',
        'E - macron'
      ],
      [
        '204',
        'I - grave'
      ],
      [
        '205',
        'I - acute'
      ],
      [
        '206',
        'I - circumflex'
      ],
      [
        '207',
        'I - diaeresis'
      ],
      [
        '298',
        'I - macron'
      ],
      [
        '208',
        'ETH'
      ],
      [
        '209',
        'N - tilde'
      ],
      [
        '210',
        'O - grave'
      ],
      [
        '211',
        'O - acute'
      ],
      [
        '212',
        'O - circumflex'
      ],
      [
        '213',
        'O - tilde'
      ],
      [
        '214',
        'O - diaeresis'
      ],
      [
        '216',
        'O - slash'
      ],
      [
        '332',
        'O - macron'
      ],
      [
        '338',
        'ligature OE'
      ],
      [
        '352',
        'S - caron'
      ],
      [
        '217',
        'U - grave'
      ],
      [
        '218',
        'U - acute'
      ],
      [
        '219',
        'U - circumflex'
      ],
      [
        '220',
        'U - diaeresis'
      ],
      [
        '362',
        'U - macron'
      ],
      [
        '221',
        'Y - acute'
      ],
      [
        '376',
        'Y - diaeresis'
      ],
      [
        '562',
        'Y - macron'
      ],
      [
        '222',
        'THORN'
      ],
      [
        '224',
        'a - grave'
      ],
      [
        '225',
        'a - acute'
      ],
      [
        '226',
        'a - circumflex'
      ],
      [
        '227',
        'a - tilde'
      ],
      [
        '228',
        'a - diaeresis'
      ],
      [
        '229',
        'a - ring above'
      ],
      [
        '257',
        'a - macron'
      ],
      [
        '230',
        'ligature ae'
      ],
      [
        '231',
        'c - cedilla'
      ],
      [
        '232',
        'e - grave'
      ],
      [
        '233',
        'e - acute'
      ],
      [
        '234',
        'e - circumflex'
      ],
      [
        '235',
        'e - diaeresis'
      ],
      [
        '275',
        'e - macron'
      ],
      [
        '236',
        'i - grave'
      ],
      [
        '237',
        'i - acute'
      ],
      [
        '238',
        'i - circumflex'
      ],
      [
        '239',
        'i - diaeresis'
      ],
      [
        '299',
        'i - macron'
      ],
      [
        '240',
        'eth'
      ],
      [
        '241',
        'n - tilde'
      ],
      [
        '242',
        'o - grave'
      ],
      [
        '243',
        'o - acute'
      ],
      [
        '244',
        'o - circumflex'
      ],
      [
        '245',
        'o - tilde'
      ],
      [
        '246',
        'o - diaeresis'
      ],
      [
        '248',
        'o slash'
      ],
      [
        '333',
        'o macron'
      ],
      [
        '339',
        'ligature oe'
      ],
      [
        '353',
        's - caron'
      ],
      [
        '249',
        'u - grave'
      ],
      [
        '250',
        'u - acute'
      ],
      [
        '251',
        'u - circumflex'
      ],
      [
        '252',
        'u - diaeresis'
      ],
      [
        '363',
        'u - macron'
      ],
      [
        '253',
        'y - acute'
      ],
      [
        '254',
        'thorn'
      ],
      [
        '255',
        'y - diaeresis'
      ],
      [
        '563',
        'y - macron'
      ],
      [
        '913',
        'Alpha'
      ],
      [
        '914',
        'Beta'
      ],
      [
        '915',
        'Gamma'
      ],
      [
        '916',
        'Delta'
      ],
      [
        '917',
        'Epsilon'
      ],
      [
        '918',
        'Zeta'
      ],
      [
        '919',
        'Eta'
      ],
      [
        '920',
        'Theta'
      ],
      [
        '921',
        'Iota'
      ],
      [
        '922',
        'Kappa'
      ],
      [
        '923',
        'Lambda'
      ],
      [
        '924',
        'Mu'
      ],
      [
        '925',
        'Nu'
      ],
      [
        '926',
        'Xi'
      ],
      [
        '927',
        'Omicron'
      ],
      [
        '928',
        'Pi'
      ],
      [
        '929',
        'Rho'
      ],
      [
        '931',
        'Sigma'
      ],
      [
        '932',
        'Tau'
      ],
      [
        '933',
        'Upsilon'
      ],
      [
        '934',
        'Phi'
      ],
      [
        '935',
        'Chi'
      ],
      [
        '936',
        'Psi'
      ],
      [
        '937',
        'Omega'
      ],
      [
        '945',
        'alpha'
      ],
      [
        '946',
        'beta'
      ],
      [
        '947',
        'gamma'
      ],
      [
        '948',
        'delta'
      ],
      [
        '949',
        'epsilon'
      ],
      [
        '950',
        'zeta'
      ],
      [
        '951',
        'eta'
      ],
      [
        '952',
        'theta'
      ],
      [
        '953',
        'iota'
      ],
      [
        '954',
        'kappa'
      ],
      [
        '955',
        'lambda'
      ],
      [
        '956',
        'mu'
      ],
      [
        '957',
        'nu'
      ],
      [
        '958',
        'xi'
      ],
      [
        '959',
        'omicron'
      ],
      [
        '960',
        'pi'
      ],
      [
        '961',
        'rho'
      ],
      [
        '962',
        'final sigma'
      ],
      [
        '963',
        'sigma'
      ],
      [
        '964',
        'tau'
      ],
      [
        '965',
        'upsilon'
      ],
      [
        '966',
        'phi'
      ],
      [
        '967',
        'chi'
      ],
      [
        '968',
        'psi'
      ],
      [
        '969',
        'omega'
      ],
      [
        '8501',
        'alef symbol'
      ],
      [
        '982',
        'pi symbol'
      ],
      [
        '8476',
        'real part symbol'
      ],
      [
        '978',
        'upsilon - hook symbol'
      ],
      [
        '8472',
        'Weierstrass p'
      ],
      [
        '8465',
        'imaginary part'
      ],
      [
        '8592',
        'leftwards arrow'
      ],
      [
        '8593',
        'upwards arrow'
      ],
      [
        '8594',
        'rightwards arrow'
      ],
      [
        '8595',
        'downwards arrow'
      ],
      [
        '8596',
        'left right arrow'
      ],
      [
        '8629',
        'carriage return'
      ],
      [
        '8656',
        'leftwards double arrow'
      ],
      [
        '8657',
        'upwards double arrow'
      ],
      [
        '8658',
        'rightwards double arrow'
      ],
      [
        '8659',
        'downwards double arrow'
      ],
      [
        '8660',
        'left right double arrow'
      ],
      [
        '8756',
        'therefore'
      ],
      [
        '8834',
        'subset of'
      ],
      [
        '8835',
        'superset of'
      ],
      [
        '8836',
        'not a subset of'
      ],
      [
        '8838',
        'subset of or equal to'
      ],
      [
        '8839',
        'superset of or equal to'
      ],
      [
        '8853',
        'circled plus'
      ],
      [
        '8855',
        'circled times'
      ],
      [
        '8869',
        'perpendicular'
      ],
      [
        '8901',
        'dot operator'
      ],
      [
        '8968',
        'left ceiling'
      ],
      [
        '8969',
        'right ceiling'
      ],
      [
        '8970',
        'left floor'
      ],
      [
        '8971',
        'right floor'
      ],
      [
        '9001',
        'left-pointing angle bracket'
      ],
      [
        '9002',
        'right-pointing angle bracket'
      ],
      [
        '9674',
        'lozenge'
      ],
      [
        '9824',
        'black spade suit'
      ],
      [
        '9827',
        'black club suit'
      ],
      [
        '9829',
        'black heart suit'
      ],
      [
        '9830',
        'black diamond suit'
      ],
      [
        '8194',
        'en space'
      ],
      [
        '8195',
        'em space'
      ],
      [
        '8201',
        'thin space'
      ],
      [
        '8204',
        'zero width non-joiner'
      ],
      [
        '8205',
        'zero width joiner'
      ],
      [
        '8206',
        'left-to-right mark'
      ],
      [
        '8207',
        'right-to-left mark'
      ]
    ];
  };
  var charmapFilter = function (charmap) {
    return global$1.grep(charmap, function (item) {
      return isArray(item) && item.length === 2;
    });
  };
  var getCharsFromSetting = function (settingValue) {
    if (isArray(settingValue)) {
      return [].concat(charmapFilter(settingValue));
    }
    if (typeof settingValue === 'function') {
      return settingValue();
    }
    return [];
  };
  var extendCharMap = function (editor, charmap) {
    var userCharMap = $_2fxxqm9tjkmcwo7g.getCharMap(editor);
    if (userCharMap) {
      charmap = getCharsFromSetting(userCharMap);
    }
    var userCharMapAppend = $_2fxxqm9tjkmcwo7g.getCharMapAppend(editor);
    if (userCharMapAppend) {
      return [].concat(charmap).concat(getCharsFromSetting(userCharMapAppend));
    }
    return charmap;
  };
  var getCharMap$1 = function (editor) {
    return extendCharMap(editor, getDefaultCharMap());
  };
  var $_frviyp9rjkmcwo7a = { getCharMap: getCharMap$1 };
  var get = function (editor) {
    var getCharMap = function () {
      return $_frviyp9rjkmcwo7a.getCharMap(editor);
    };
    var insertChar = function (chr) {
      $_e3yubu9pjkmcwo78.insertChar(editor, chr);
    };
    return {
      getCharMap: getCharMap,
      insertChar: insertChar
    };
  };
  var $_ft8o3e9ojkmcwo77 = { get: get };
  var getHtml = function (charmap) {
    var gridHtml, x, y;
    var width = Math.min(charmap.length, 25);
    var height = Math.ceil(charmap.length / width);
    gridHtml = '<table role="presentation" cellspacing="0" class="mce-charmap"><tbody>';
    for (y = 0; y < height; y++) {
      gridHtml += '<tr>';
      for (x = 0; x < width; x++) {
        var index = y * width + x;
        if (index < charmap.length) {
          var chr = charmap[index];
          var charCode = parseInt(chr[0], 10);
          var chrText = chr ? String.fromCharCode(charCode) : '&nbsp;';
          gridHtml += '<td title="' + chr[1] + '">' + '<div tabindex="-1" title="' + chr[1] + '" role="button" data-chr="' + charCode + '">' + chrText + '</div>' + '</td>';
        } else {
          gridHtml += '<td />';
        }
      }
      gridHtml += '</tr>';
    }
    gridHtml += '</tbody></table>';
    return gridHtml;
  };
  var $_f3h71t9wjkmcwo7r = { getHtml: getHtml };
  var getParentTd = function (elm) {
    while (elm) {
      if (elm.nodeName === 'TD') {
        return elm;
      }
      elm = elm.parentNode;
    }
  };
  var open = function (editor) {
    var win;
    var charMapPanel = {
      type: 'container',
      html: $_f3h71t9wjkmcwo7r.getHtml($_frviyp9rjkmcwo7a.getCharMap(editor)),
      onclick: function (e) {
        var target = e.target;
        if (/^(TD|DIV)$/.test(target.nodeName)) {
          var charDiv = getParentTd(target).firstChild;
          if (charDiv && charDiv.hasAttribute('data-chr')) {
            var charCodeString = charDiv.getAttribute('data-chr');
            var charCode = parseInt(charCodeString, 10);
            if (!isNaN(charCode)) {
              $_e3yubu9pjkmcwo78.insertChar(editor, String.fromCharCode(charCode));
            }
            if (!e.ctrlKey) {
              win.close();
            }
          }
        }
      },
      onmouseover: function (e) {
        var td = getParentTd(e.target);
        if (td && td.firstChild) {
          win.find('#preview').text(td.firstChild.firstChild.data);
          win.find('#previewTitle').text(td.title);
        } else {
          win.find('#preview').text(' ');
          win.find('#previewTitle').text(' ');
        }
      }
    };
    win = editor.windowManager.open({
      title: 'Special character',
      spacing: 10,
      padding: 10,
      items: [
        charMapPanel,
        {
          type: 'container',
          layout: 'flex',
          direction: 'column',
          align: 'center',
          spacing: 5,
          minWidth: 160,
          minHeight: 160,
          items: [
            {
              type: 'label',
              name: 'preview',
              text: ' ',
              style: 'font-size: 40px; text-align: center',
              border: 1,
              minWidth: 140,
              minHeight: 80
            },
            {
              type: 'spacer',
              minHeight: 20
            },
            {
              type: 'label',
              name: 'previewTitle',
              text: ' ',
              style: 'white-space: pre-wrap;',
              border: 1,
              minWidth: 140
            }
          ]
        }
      ],
      buttons: [{
          text: 'Close',
          onclick: function () {
            win.close();
          }
        }]
    });
  };
  var $_71lq0n9vjkmcwo7i = { open: open };
  var register = function (editor) {
    editor.addCommand('mceShowCharmap', function () {
      $_71lq0n9vjkmcwo7i.open(editor);
    });
  };
  var $_6efs0b9ujkmcwo7h = { register: register };
  var register$1 = function (editor) {
    editor.addButton('charmap', {
      icon: 'charmap',
      tooltip: 'Special character',
      cmd: 'mceShowCharmap'
    });
    editor.addMenuItem('charmap', {
      icon: 'charmap',
      text: 'Special character',
      cmd: 'mceShowCharmap',
      context: 'insert'
    });
  };
  var $_e9v9r59xjkmcwo7s = { register: register$1 };
  global.add('charmap', function (editor) {
    $_6efs0b9ujkmcwo7h.register(editor);
    $_e9v9r59xjkmcwo7s.register(editor);
    return $_ft8o3e9ojkmcwo77.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var codesample = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var getContentCss = function (editor) {
    return editor.settings.codesample_content_css;
  };
  var getLanguages = function (editor) {
    return editor.settings.codesample_languages;
  };
  var getDialogMinWidth = function (editor) {
    return Math.min(global$1.DOM.getViewPort().w, editor.getParam('codesample_dialog_width', 800));
  };
  var getDialogMinHeight = function (editor) {
    return Math.min(global$1.DOM.getViewPort().w, editor.getParam('codesample_dialog_height', 650));
  };
  var $_fwpmvkabjkmcwo95 = {
    getContentCss: getContentCss,
    getLanguages: getLanguages,
    getDialogMinWidth: getDialogMinWidth,
    getDialogMinHeight: getDialogMinHeight
  };
  var window$$1 = {};
  var global$2 = window$$1;
  var _self = typeof window$$1 !== 'undefined' ? window$$1 : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {};
  var Prism = function () {
    var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
    var _ = _self.Prism = {
      util: {
        encode: function (tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
          } else if (_.util.type(tokens) === 'Array') {
            return tokens.map(_.util.encode);
          } else {
            return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
          }
        },
        type: function (o) {
          return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
        },
        clone: function (o) {
          var type = _.util.type(o);
          switch (type) {
          case 'Object':
            var clone = {};
            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key]);
              }
            }
            return clone;
          case 'Array':
            return o.map && o.map(function (v) {
              return _.util.clone(v);
            });
          }
          return o;
        }
      },
      languages: {
        extend: function (id, redef) {
          var lang = _.util.clone(_.languages[id]);
          for (var key in redef) {
            lang[key] = redef[key];
          }
          return lang;
        },
        insertBefore: function (inside, before, insert, root) {
          root = root || _.languages;
          var grammar = root[inside];
          if (arguments.length === 2) {
            insert = arguments[1];
            for (var newToken in insert) {
              if (insert.hasOwnProperty(newToken)) {
                grammar[newToken] = insert[newToken];
              }
            }
            return grammar;
          }
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token === before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }
              ret[token] = grammar[token];
            }
          }
          _.languages.DFS(_.languages, function (key, value) {
            if (value === root[inside] && key !== inside) {
              this[key] = ret;
            }
          });
          return root[inside] = ret;
        },
        DFS: function (o, callback, type) {
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);
              if (_.util.type(o[i]) === 'Object') {
                _.languages.DFS(o[i], callback);
              } else if (_.util.type(o[i]) === 'Array') {
                _.languages.DFS(o[i], callback, i);
              }
            }
          }
        }
      },
      plugins: {},
      highlightAll: function (async, callback) {
        var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
        for (var i = 0, element = void 0; element = elements[i++];) {
          _.highlightElement(element, async === true, callback);
        }
      },
      highlightElement: function (element, async, callback) {
        var language, grammar, parent$$1 = element;
        while (parent$$1 && !lang.test(parent$$1.className)) {
          parent$$1 = parent$$1.parentNode;
        }
        if (parent$$1) {
          language = (parent$$1.className.match(lang) || [
            ,
            ''
          ])[1];
          grammar = _.languages[language];
        }
        element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
        parent$$1 = element.parentNode;
        if (/pre/i.test(parent$$1.nodeName)) {
          parent$$1.className = parent$$1.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
        }
        var code = element.textContent;
        var env = {
          element: element,
          language: language,
          grammar: grammar,
          code: code
        };
        if (!code || !grammar) {
          _.hooks.run('complete', env);
          return;
        }
        _.hooks.run('before-highlight', env);
        if (async && _self.Worker) {
          var worker = new Worker(_.filename);
          worker.onmessage = function (evt) {
            env.highlightedCode = evt.data;
            _.hooks.run('before-insert', env);
            env.element.innerHTML = env.highlightedCode;
            if (callback) {
              callback.call(env.element);
            }
            _.hooks.run('after-highlight', env);
            _.hooks.run('complete', env);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          env.highlightedCode = _.highlight(env.code, env.grammar, env.language);
          _.hooks.run('before-insert', env);
          env.element.innerHTML = env.highlightedCode;
          if (callback) {
            callback.call(element);
          }
          _.hooks.run('after-highlight', env);
          _.hooks.run('complete', env);
        }
      },
      highlight: function (text, grammar, language) {
        var tokens = _.tokenize(text, grammar);
        return Token.stringify(_.util.encode(tokens), language);
      },
      tokenize: function (text, grammar, language) {
        var Token = _.Token;
        var strarr = [text];
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        tokenloop:
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = _.util.type(patterns) === 'Array' ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              var pattern = patterns[j];
              var inside = pattern.inside;
              var lookbehind = !!pattern.lookbehind;
              var lookbehindLength = 0;
              var alias = pattern.alias;
              pattern = pattern.pattern || pattern;
              for (var i = 0; i < strarr.length; i++) {
                var str = strarr[i];
                if (strarr.length > text.length) {
                  break tokenloop;
                }
                if (str instanceof Token) {
                  continue;
                }
                pattern.lastIndex = 0;
                var match = pattern.exec(str);
                if (match) {
                  if (lookbehind) {
                    lookbehindLength = match[1].length;
                  }
                  var from = match.index - 1 + lookbehindLength;
                  match = match[0].slice(lookbehindLength);
                  var len = match.length, to = from + len, before = str.slice(0, from + 1), after = str.slice(to + 1);
                  var args = [
                    i,
                    1
                  ];
                  if (before) {
                    args.push(before);
                  }
                  var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias);
                  args.push(wrapped);
                  if (after) {
                    args.push(after);
                  }
                  Array.prototype.splice.apply(strarr, args);
                }
              }
            }
          }
        return strarr;
      },
      hooks: {
        all: {},
        add: function (name$$1, callback) {
          var hooks = _.hooks.all;
          hooks[name$$1] = hooks[name$$1] || [];
          hooks[name$$1].push(callback);
        },
        run: function (name$$1, env) {
          var callbacks = _.hooks.all[name$$1];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i = 0, callback = void 0; callback = callbacks[i++];) {
            callback(env);
          }
        }
      }
    };
    var Token = _.Token = function (type, content, alias) {
      this.type = type;
      this.content = content;
      this.alias = alias;
    };
    Token.stringify = function (o, language, parent$$1) {
      if (typeof o === 'string') {
        return o;
      }
      if (_.util.type(o) === 'Array') {
        return o.map(function (element) {
          return Token.stringify(element, language, o);
        }).join('');
      }
      var env = {
        type: o.type,
        content: Token.stringify(o.content, language, parent$$1),
        tag: 'span',
        classes: [
          'token',
          o.type
        ],
        attributes: {},
        language: language,
        parent: parent$$1
      };
      if (env.type === 'comment') {
        env.attributes.spellcheck = 'true';
      }
      if (o.alias) {
        var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
        Array.prototype.push.apply(env.classes, aliases);
      }
      _.hooks.run('wrap', env);
      var attributes = '';
      for (var name$$1 in env.attributes) {
        attributes += (attributes ? ' ' : '') + name$$1 + '="' + (env.attributes[name$$1] || '') + '"';
      }
      return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
    };
    if (!_self.document) {
      if (!_self.addEventListener) {
        return _self.Prism;
      }
      _self.addEventListener('message', function (evt) {
        var message = JSON.parse(evt.data), lang = message.language, code = message.code, immediateClose = message.immediateClose;
        _self.postMessage(_.highlight(code, _.languages[lang], lang));
        if (immediateClose) {
          _self.close();
        }
      }, false);
      return _self.Prism;
    }
  }();
  if (typeof global$2 !== 'undefined') {
    global$2.Prism = Prism;
  }
  Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
      pattern: /<\/?[^\s>\/=.]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      inside: {
        'tag': {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        'attr-value': {
          pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
          inside: { punctuation: /[=>"']/ }
        },
        'punctuation': /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  };
  Prism.hooks.add('wrap', function (env) {
    if (env.type === 'entity') {
      env.attributes.title = env.content.replace(/&amp;/, '&');
    }
  });
  Prism.languages.xml = Prism.languages.markup;
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;
  Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
      inside: { rule: /@[\w-]+/ }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
  };
  Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css);
  if (Prism.languages.markup) {
    Prism.languages.insertBefore('markup', 'tag', {
      style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
        inside: {
          tag: {
            pattern: /<style[\w\W]*?>|<\/style>/i,
            inside: Prism.languages.markup.tag.inside
          },
          rest: Prism.languages.css
        },
        alias: 'language-css'
      }
    });
    Prism.languages.insertBefore('inside', 'attr-value', {
      'style-attr': {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
          'attr-name': {
            pattern: /^\s*style/i,
            inside: Prism.languages.markup.tag.inside
          },
          'punctuation': /^\s*=\s*['"]|['"]\s*$/,
          'attr-value': {
            pattern: /.+/i,
            inside: Prism.languages.css
          }
        },
        alias: 'language-css'
      }
    }, Prism.languages.markup.tag);
  }
  Prism.languages.clike = {
    'comment': [
      {
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true
      }
    ],
    'string': /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    'class-name': {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
      lookbehind: true,
      inside: { punctuation: /(\.|\\)/ }
    },
    'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    'boolean': /\b(true|false)\b/,
    'function': /[a-z0-9_]+(?=\()/i,
    'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    'punctuation': /[{}[\];(),.:]/
  };
  Prism.languages.javascript = Prism.languages.extend('clike', {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
  });
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('javascript', 'class-name', {
    'template-string': {
      pattern: /`(?:\\`|\\?[^`])*`/,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation'
            },
            'rest': Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  });
  if (Prism.languages.markup) {
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
        inside: {
          tag: {
            pattern: /<script[\w\W]*?>|<\/script>/i,
            inside: Prism.languages.markup.tag.inside
          },
          rest: Prism.languages.javascript
        },
        alias: 'language-javascript'
      }
    });
  }
  Prism.languages.js = Prism.languages.javascript;
  Prism.languages.c = Prism.languages.extend('clike', {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
  });
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
      lookbehind: true,
      alias: 'property',
      inside: {
        string: {
          pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
          lookbehind: true
        }
      }
    }
  });
  delete Prism.languages.c['class-name'];
  delete Prism.languages.c.boolean;
  Prism.languages.csharp = Prism.languages.extend('clike', {
    keyword: /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
    string: [
      /@("|')(\1\1|\\\1|\\?(?!\1)[\s\S])*\1/,
      /("|')(\\?.)*?\1/
    ],
    number: /\b-?(0x[\da-f]+|\d*\.?\d+)\b/i
  });
  Prism.languages.insertBefore('csharp', 'keyword', {
    preprocessor: {
      pattern: /(^\s*)#.*/m,
      lookbehind: true
    }
  });
  Prism.languages.cpp = Prism.languages.extend('c', {
    keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    boolean: /\b(true|false)\b/,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
  });
  Prism.languages.insertBefore('cpp', 'keyword', {
    'class-name': {
      pattern: /(class\s+)[a-z0-9_]+/i,
      lookbehind: true
    }
  });
  Prism.languages.java = Prism.languages.extend('clike', {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
    operator: {
      pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
      lookbehind: true
    }
  });
  Prism.languages.php = Prism.languages.extend('clike', {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
    constant: /\b[A-Z0-9_]{2,}\b/,
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('php', 'class-name', {
    'shell-comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
      alias: 'comment'
    }
  });
  Prism.languages.insertBefore('php', 'keyword', {
    delimiter: /\?>|<\?(?:php)?/i,
    variable: /\$\w+\b/i,
    package: {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: true,
      inside: { punctuation: /\\/ }
    }
  });
  Prism.languages.insertBefore('php', 'operator', {
    property: {
      pattern: /(->)[\w]+/,
      lookbehind: true
    }
  });
  if (Prism.languages.markup) {
    Prism.hooks.add('before-highlight', function (env) {
      if (env.language !== 'php') {
        return;
      }
      env.tokenStack = [];
      env.backupCode = env.code;
      env.code = env.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/ig, function (match) {
        env.tokenStack.push(match);
        return '{{{PHP' + env.tokenStack.length + '}}}';
      });
    });
    Prism.hooks.add('before-insert', function (env) {
      if (env.language === 'php') {
        env.code = env.backupCode;
        delete env.backupCode;
      }
    });
    Prism.hooks.add('after-highlight', function (env) {
      if (env.language !== 'php') {
        return;
      }
      for (var i = 0, t = void 0; t = env.tokenStack[i]; i++) {
        env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$'));
      }
      env.element.innerHTML = env.highlightedCode;
    });
    Prism.hooks.add('wrap', function (env) {
      if (env.language === 'php' && env.type === 'markup') {
        env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>');
      }
    });
    Prism.languages.insertBefore('php', 'comment', {
      markup: {
        pattern: /<[^?]\/?(.*?)>/,
        inside: Prism.languages.markup
      },
      php: /\{\{\{PHP[0-9]+\}\}\}/
    });
  }
  Prism.languages.python = {
    'comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true
    },
    'string': /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(?:\\?.)*?\1/,
    'function': {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
      lookbehind: true
    },
    'class-name': {
      pattern: /(\bclass\s+)[a-z0-9_]+/i,
      lookbehind: true
    },
    'keyword': /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
    'boolean': /\b(?:True|False)\b/,
    'number': /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    'punctuation': /[{}[\];(),.:]/
  };
  (function (Prism) {
    Prism.languages.ruby = Prism.languages.extend('clike', {
      comment: /#(?!\{[^\r\n]*?\}).*/,
      keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
    });
    var interpolation = {
      pattern: /#\{[^}]+\}/,
      inside: {
        delimiter: {
          pattern: /^#\{|\}$/,
          alias: 'tag'
        },
        rest: Prism.util.clone(Prism.languages.ruby)
      }
    };
    Prism.languages.insertBefore('ruby', 'keyword', {
      regex: [
        {
          pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
          inside: { interpolation: interpolation }
        },
        {
          pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
          inside: { interpolation: interpolation }
        },
        {
          pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
          inside: { interpolation: interpolation }
        },
        {
          pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
          inside: { interpolation: interpolation }
        },
        {
          pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
          inside: { interpolation: interpolation }
        },
        {
          pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
          lookbehind: true
        }
      ],
      variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
      symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
    });
    Prism.languages.insertBefore('ruby', 'number', {
      builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
    });
    Prism.languages.ruby.string = [
      {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
        inside: { interpolation: interpolation }
      },
      {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        inside: { interpolation: interpolation }
      },
      {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        inside: { interpolation: interpolation }
      },
      {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        inside: { interpolation: interpolation }
      },
      {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        inside: { interpolation: interpolation }
      },
      {
        pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
        inside: { interpolation: interpolation }
      }
    ];
  }(Prism));
  function isCodeSample(elm) {
    return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1;
  }
  function trimArg(predicateFn) {
    return function (arg1, arg2) {
      return predicateFn(arg2);
    };
  }
  var $_45zyxsagjkmcwoas = {
    isCodeSample: isCodeSample,
    trimArg: trimArg
  };
  var getSelectedCodeSample = function (editor) {
    var node = editor.selection.getNode();
    if ($_45zyxsagjkmcwoas.isCodeSample(node)) {
      return node;
    }
    return null;
  };
  var insertCodeSample = function (editor, language, code) {
    editor.undoManager.transact(function () {
      var node = getSelectedCodeSample(editor);
      code = global$1.DOM.encode(code);
      if (node) {
        editor.dom.setAttrib(node, 'class', 'language-' + language);
        node.innerHTML = code;
        Prism.highlightElement(node);
        editor.selection.select(node);
      } else {
        editor.insertContent('<pre id="__new" class="language-' + language + '">' + code + '</pre>');
        editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
      }
    });
  };
  var getCurrentCode = function (editor) {
    var node = getSelectedCodeSample(editor);
    if (node) {
      return node.textContent;
    }
    return '';
  };
  var $_7llv6ladjkmcwo9b = {
    getSelectedCodeSample: getSelectedCodeSample,
    insertCodeSample: insertCodeSample,
    getCurrentCode: getCurrentCode
  };
  var getLanguages$1 = function (editor) {
    var defaultLanguages = [
      {
        text: 'HTML/XML',
        value: 'markup'
      },
      {
        text: 'JavaScript',
        value: 'javascript'
      },
      {
        text: 'CSS',
        value: 'css'
      },
      {
        text: 'PHP',
        value: 'php'
      },
      {
        text: 'Ruby',
        value: 'ruby'
      },
      {
        text: 'Python',
        value: 'python'
      },
      {
        text: 'Java',
        value: 'java'
      },
      {
        text: 'C',
        value: 'c'
      },
      {
        text: 'C#',
        value: 'csharp'
      },
      {
        text: 'C++',
        value: 'cpp'
      }
    ];
    var customLanguages = $_fwpmvkabjkmcwo95.getLanguages(editor);
    return customLanguages ? customLanguages : defaultLanguages;
  };
  var getCurrentLanguage = function (editor) {
    var matches;
    var node = $_7llv6ladjkmcwo9b.getSelectedCodeSample(editor);
    if (node) {
      matches = node.className.match(/language-(\w+)/);
      return matches ? matches[1] : '';
    }
    return '';
  };
  var $_ehme9lahjkmcwoat = {
    getLanguages: getLanguages$1,
    getCurrentLanguage: getCurrentLanguage
  };
  var $_7apbbvaajkmcwo93 = {
    open: function (editor) {
      var minWidth = $_fwpmvkabjkmcwo95.getDialogMinWidth(editor);
      var minHeight = $_fwpmvkabjkmcwo95.getDialogMinHeight(editor);
      var currentLanguage = $_ehme9lahjkmcwoat.getCurrentLanguage(editor);
      var currentLanguages = $_ehme9lahjkmcwoat.getLanguages(editor);
      var currentCode = $_7llv6ladjkmcwo9b.getCurrentCode(editor);
      editor.windowManager.open({
        title: 'Insert/Edit code sample',
        minWidth: minWidth,
        minHeight: minHeight,
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        body: [
          {
            type: 'listbox',
            name: 'language',
            label: 'Language',
            maxWidth: 200,
            value: currentLanguage,
            values: currentLanguages
          },
          {
            type: 'textbox',
            name: 'code',
            multiline: true,
            spellcheck: false,
            ariaLabel: 'Code view',
            flex: 1,
            style: 'direction: ltr; text-align: left',
            classes: 'monospace',
            value: currentCode,
            autofocus: true
          }
        ],
        onSubmit: function (e) {
          $_7llv6ladjkmcwo9b.insertCodeSample(editor, e.data.language, e.data.code);
        }
      });
    }
  };
  var register = function (editor) {
    editor.addCommand('codesample', function () {
      var node = editor.selection.getNode();
      if (editor.selection.isCollapsed() || $_45zyxsagjkmcwoas.isCodeSample(node)) {
        $_7apbbvaajkmcwo93.open(editor);
      } else {
        editor.formatter.toggle('code');
      }
    });
  };
  var $_3nzffua9jkmcwo92 = { register: register };
  var setup = function (editor) {
    var $ = editor.$;
    editor.on('PreProcess', function (e) {
      $('pre[contenteditable=false]', e.node).filter($_45zyxsagjkmcwoas.trimArg($_45zyxsagjkmcwoas.isCodeSample)).each(function (idx, elm) {
        var $elm = $(elm), code = elm.textContent;
        $elm.attr('class', $.trim($elm.attr('class')));
        $elm.removeAttr('contentEditable');
        $elm.empty().append($('<code></code>').each(function () {
          this.textContent = code;
        }));
      });
    });
    editor.on('SetContent', function () {
      var unprocessedCodeSamples = $('pre').filter($_45zyxsagjkmcwoas.trimArg($_45zyxsagjkmcwoas.isCodeSample)).filter(function (idx, elm) {
        return elm.contentEditable !== 'false';
      });
      if (unprocessedCodeSamples.length) {
        editor.undoManager.transact(function () {
          unprocessedCodeSamples.each(function (idx, elm) {
            $(elm).find('br').each(function (idx, elm) {
              elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
            });
            elm.contentEditable = false;
            elm.innerHTML = editor.dom.encode(elm.textContent);
            Prism.highlightElement(elm);
            elm.className = $.trim(elm.className);
          });
        });
      }
    });
  };
  var $_cywqvhaijkmcwoav = { setup: setup };
  var loadCss = function (editor, pluginUrl, addedInlineCss, addedCss) {
    var linkElm;
    var contentCss = $_fwpmvkabjkmcwo95.getContentCss(editor);
    if (editor.inline && addedInlineCss.get()) {
      return;
    }
    if (!editor.inline && addedCss.get()) {
      return;
    }
    if (editor.inline) {
      addedInlineCss.set(true);
    } else {
      addedCss.set(true);
    }
    if (contentCss !== false) {
      linkElm = editor.dom.create('link', {
        rel: 'stylesheet',
        href: contentCss ? contentCss : pluginUrl + '/css/prism.css'
      });
      editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm);
    }
  };
  var $_8uv0xyajjkmcwoax = { loadCss: loadCss };
  var register$1 = function (editor) {
    editor.addButton('codesample', {
      cmd: 'codesample',
      title: 'Insert/Edit code sample'
    });
    editor.addMenuItem('codesample', {
      cmd: 'codesample',
      text: 'Code sample',
      icon: 'codesample'
    });
  };
  var $_91sx9bakjkmcwoaz = { register: register$1 };
  var addedInlineCss = Cell(false);
  global.add('codesample', function (editor, pluginUrl) {
    var addedCss = Cell(false);
    $_cywqvhaijkmcwoav.setup(editor);
    $_91sx9bakjkmcwoaz.register(editor);
    $_3nzffua9jkmcwo92.register(editor);
    editor.on('init', function () {
      $_8uv0xyajjkmcwoax.loadCss(editor, pluginUrl, addedInlineCss, addedCss);
    });
    editor.on('dblclick', function (ev) {
      if ($_45zyxsagjkmcwoas.isCodeSample(ev.target)) {
        $_7apbbvaajkmcwo93.open(editor);
      }
    });
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var contextmenu = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var get = function (visibleState) {
    var isContextMenuVisible = function () {
      return visibleState.get();
    };
    return { isContextMenuVisible: isContextMenuVisible };
  };
  var $_78h1xcasjkmcwod8 = { get: get };
  var shouldNeverUseNative = function (editor) {
    return editor.settings.contextmenu_never_use_native;
  };
  var getContextMenu = function (editor) {
    return editor.getParam('contextmenu', 'link openlink image inserttable | cell row column deletetable');
  };
  var $_58lvimaujkmcwoda = {
    shouldNeverUseNative: shouldNeverUseNative,
    getContextMenu: getContextMenu
  };
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var getUiContainer = function (editor) {
    return global$1.DOM.select(editor.settings.ui_container)[0];
  };
  var nu = function (x, y) {
    return {
      x: x,
      y: y
    };
  };
  var transpose = function (pos, dx, dy) {
    return nu(pos.x + dx, pos.y + dy);
  };
  var fromPageXY = function (e) {
    return nu(e.pageX, e.pageY);
  };
  var fromClientXY = function (e) {
    return nu(e.clientX, e.clientY);
  };
  var transposeUiContainer = function (element, pos) {
    if (element && global$1.DOM.getStyle(element, 'position', true) !== 'static') {
      var containerPos = global$1.DOM.getPos(element);
      var dx = containerPos.x - element.scrollLeft;
      var dy = containerPos.y - element.scrollTop;
      return transpose(pos, -dx, -dy);
    } else {
      return transpose(pos, 0, 0);
    }
  };
  var transposeContentAreaContainer = function (element, pos) {
    var containerPos = global$1.DOM.getPos(element);
    return transpose(pos, containerPos.x, containerPos.y);
  };
  var getPos = function (editor, e) {
    if (editor.inline) {
      return transposeUiContainer(getUiContainer(editor), fromPageXY(e));
    } else {
      var iframePos = transposeContentAreaContainer(editor.getContentAreaContainer(), fromClientXY(e));
      return transposeUiContainer(getUiContainer(editor), iframePos);
    }
  };
  var $_alg35gavjkmcwodb = { getPos: getPos };
  var global$2 = tinymce.util.Tools.resolve('tinymce.ui.Factory');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var renderMenu = function (editor, visibleState) {
    var menu, contextmenu;
    var items = [];
    contextmenu = $_58lvimaujkmcwoda.getContextMenu(editor);
    global$3.each(contextmenu.split(/[ ,]/), function (name) {
      var item = editor.menuItems[name];
      if (name === '|') {
        item = { text: name };
      }
      if (item) {
        item.shortcut = '';
        items.push(item);
      }
    });
    for (var i = 0; i < items.length; i++) {
      if (items[i].text === '|') {
        if (i === 0 || i === items.length - 1) {
          items.splice(i, 1);
        }
      }
    }
    menu = global$2.create('menu', {
      items: items,
      context: 'contextmenu',
      classes: 'contextmenu'
    });
    menu.uiContainer = getUiContainer(editor);
    menu.renderTo(getUiContainer(editor));
    menu.on('hide', function (e) {
      if (e.control === this) {
        visibleState.set(false);
      }
    });
    editor.on('remove', function () {
      menu.remove();
      menu = null;
    });
    return menu;
  };
  var show = function (editor, pos, visibleState, menu) {
    if (menu.get() === null) {
      menu.set(renderMenu(editor, visibleState));
    } else {
      menu.get().show();
    }
    menu.get().moveTo(pos.x, pos.y);
    visibleState.set(true);
  };
  var $_56xhlhayjkmcwodg = { show: show };
  var isNativeOverrideKeyEvent = function (editor, e) {
    return e.ctrlKey && !$_58lvimaujkmcwoda.shouldNeverUseNative(editor);
  };
  var setup = function (editor, visibleState, menu) {
    editor.on('contextmenu', function (e) {
      if (isNativeOverrideKeyEvent(editor, e)) {
        return;
      }
      e.preventDefault();
      $_56xhlhayjkmcwodg.show(editor, $_alg35gavjkmcwodb.getPos(editor, e), visibleState, menu);
    });
  };
  var $_13glcmatjkmcwod9 = { setup: setup };
  global.add('contextmenu', function (editor) {
    var menu = Cell(null), visibleState = Cell(false);
    $_13glcmatjkmcwod9.setup(editor, visibleState, menu);
    return $_78h1xcasjkmcwod8.get(visibleState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var emoticons = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var emoticons = [
    [
      'cool',
      'cry',
      'embarassed',
      'foot-in-mouth'
    ],
    [
      'frown',
      'innocent',
      'kiss',
      'laughing'
    ],
    [
      'money-mouth',
      'sealed',
      'smile',
      'surprised'
    ],
    [
      'tongue-out',
      'undecided',
      'wink',
      'yell'
    ]
  ];
  var getHtml = function (pluginUrl) {
    var emoticonsHtml;
    emoticonsHtml = '<table role="list" class="mce-grid">';
    global$1.each(emoticons, function (row) {
      emoticonsHtml += '<tr>';
      global$1.each(row, function (icon) {
        var emoticonUrl = pluginUrl + '/img/smiley-' + icon + '.gif';
        emoticonsHtml += '<td><a href="#" data-mce-url="' + emoticonUrl + '" data-mce-alt="' + icon + '" tabindex="-1" ' + 'role="option" aria-label="' + icon + '"><img src="' + emoticonUrl + '" style="width: 18px; height: 18px" role="presentation" /></a></td>';
      });
      emoticonsHtml += '</tr>';
    });
    emoticonsHtml += '</table>';
    return emoticonsHtml;
  };
  var $_8fagskbajkmcwoef = { getHtml: getHtml };
  var insertEmoticon = function (editor, src, alt) {
    editor.insertContent(editor.dom.createHTML('img', {
      src: src,
      alt: alt
    }));
  };
  var register = function (editor, pluginUrl) {
    var panelHtml = $_8fagskbajkmcwoef.getHtml(pluginUrl);
    editor.addButton('emoticons', {
      type: 'panelbutton',
      panel: {
        role: 'application',
        autohide: true,
        html: panelHtml,
        onclick: function (e) {
          var linkElm = editor.dom.getParent(e.target, 'a');
          if (linkElm) {
            insertEmoticon(editor, linkElm.getAttribute('data-mce-url'), linkElm.getAttribute('data-mce-alt'));
            this.hide();
          }
        }
      },
      tooltip: 'Emoticons'
    });
  };
  var $_4b0j7mb9jkmcwoed = { register: register };
  global.add('emoticons', function (editor, pluginUrl) {
    $_4b0j7mb9jkmcwoed.register(editor, pluginUrl);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var fullscreen = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var get = function (fullscreenState) {
    return {
      isFullscreen: function () {
        return fullscreenState.get() !== null;
      }
    };
  };
  var $_fvim5jcejkmcwoka = { get: get };
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var fireFullscreenStateChanged = function (editor, state) {
    editor.fire('FullscreenStateChanged', { state: state });
  };
  var $_7gnzj4cijkmcwokj = { fireFullscreenStateChanged: fireFullscreenStateChanged };
  var DOM = global$1.DOM;
  var getWindowSize = function () {
    var w;
    var h;
    var win = window;
    var doc = document;
    var body = doc.body;
    if (body.offsetWidth) {
      w = body.offsetWidth;
      h = body.offsetHeight;
    }
    if (win.innerWidth && win.innerHeight) {
      w = win.innerWidth;
      h = win.innerHeight;
    }
    return {
      w: w,
      h: h
    };
  };
  var getScrollPos = function () {
    var vp = DOM.getViewPort();
    return {
      x: vp.x,
      y: vp.y
    };
  };
  var setScrollPos = function (pos) {
    window.scrollTo(pos.x, pos.y);
  };
  var toggleFullscreen = function (editor, fullscreenState) {
    var body = document.body;
    var documentElement = document.documentElement;
    var editorContainerStyle;
    var editorContainer, iframe, iframeStyle;
    var fullscreenInfo = fullscreenState.get();
    var resize = function () {
      DOM.setStyle(iframe, 'height', getWindowSize().h - (editorContainer.clientHeight - iframe.clientHeight));
    };
    var removeResize = function () {
      DOM.unbind(window, 'resize', resize);
    };
    editorContainer = editor.getContainer();
    editorContainerStyle = editorContainer.style;
    iframe = editor.getContentAreaContainer().firstChild;
    iframeStyle = iframe.style;
    if (!fullscreenInfo) {
      var newFullScreenInfo = {
        scrollPos: getScrollPos(),
        containerWidth: editorContainerStyle.width,
        containerHeight: editorContainerStyle.height,
        iframeWidth: iframeStyle.width,
        iframeHeight: iframeStyle.height,
        resizeHandler: resize,
        removeHandler: removeResize
      };
      iframeStyle.width = iframeStyle.height = '100%';
      editorContainerStyle.width = editorContainerStyle.height = '';
      DOM.addClass(body, 'mce-fullscreen');
      DOM.addClass(documentElement, 'mce-fullscreen');
      DOM.addClass(editorContainer, 'mce-fullscreen');
      DOM.bind(window, 'resize', resize);
      editor.on('remove', removeResize);
      resize();
      fullscreenState.set(newFullScreenInfo);
      $_7gnzj4cijkmcwokj.fireFullscreenStateChanged(editor, true);
    } else {
      iframeStyle.width = fullscreenInfo.iframeWidth;
      iframeStyle.height = fullscreenInfo.iframeHeight;
      if (fullscreenInfo.containerWidth) {
        editorContainerStyle.width = fullscreenInfo.containerWidth;
      }
      if (fullscreenInfo.containerHeight) {
        editorContainerStyle.height = fullscreenInfo.containerHeight;
      }
      DOM.removeClass(body, 'mce-fullscreen');
      DOM.removeClass(documentElement, 'mce-fullscreen');
      DOM.removeClass(editorContainer, 'mce-fullscreen');
      setScrollPos(fullscreenInfo.scrollPos);
      DOM.unbind(window, 'resize', fullscreenInfo.resizeHandler);
      editor.off('remove', fullscreenInfo.removeHandler);
      fullscreenState.set(null);
      $_7gnzj4cijkmcwokj.fireFullscreenStateChanged(editor, false);
    }
  };
  var $_3fnk4ycgjkmcwokc = { toggleFullscreen: toggleFullscreen };
  var register = function (editor, fullscreenState) {
    editor.addCommand('mceFullScreen', function () {
      $_3fnk4ycgjkmcwokc.toggleFullscreen(editor, fullscreenState);
    });
  };
  var $_4z3n6lcfjkmcwokb = { register: register };
  var postRender = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('FullscreenStateChanged', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor) {
    editor.addMenuItem('fullscreen', {
      text: 'Fullscreen',
      shortcut: 'Ctrl+Shift+F',
      selectable: true,
      cmd: 'mceFullScreen',
      onPostRender: postRender(editor),
      context: 'view'
    });
    editor.addButton('fullscreen', {
      active: false,
      tooltip: 'Fullscreen',
      cmd: 'mceFullScreen',
      onPostRender: postRender(editor)
    });
  };
  var $_6s5kpqckjkmcwol2 = { register: register$1 };
  global.add('fullscreen', function (editor) {
    var fullscreenState = Cell(null);
    if (editor.settings.inline) {
      return $_fvim5jcejkmcwoka.get(fullscreenState);
    }
    $_4z3n6lcfjkmcwokb.register(editor, fullscreenState);
    $_6s5kpqckjkmcwol2.register(editor);
    editor.addShortcut('Ctrl+Shift+F', '', 'mceFullScreen');
    return $_fvim5jcejkmcwoka.get(fullscreenState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var hr = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_6gbesvcnjkmcwoly = { register: register };
  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_cy4wl6cojkmcwolz = { register: register$1 };
  global.add('hr', function (editor) {
    $_6gbesvcnjkmcwoly.register(editor);
    $_cy4wl6cojkmcwolz.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var imagetools = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  function create(width, height) {
    return resize(document.createElement('canvas'), width, height);
  }
  function clone(canvas) {
    var tCanvas, ctx;
    tCanvas = create(canvas.width, canvas.height);
    ctx = get2dContext(tCanvas);
    ctx.drawImage(canvas, 0, 0);
    return tCanvas;
  }
  function get2dContext(canvas) {
    return canvas.getContext('2d');
  }
  function get3dContext(canvas) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
    }
    if (!gl) {
      gl = null;
    }
    return gl;
  }
  function resize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  var $_2bu9lddrjkmcwot1 = {
    create: create,
    clone: clone,
    resize: resize,
    get2dContext: get2dContext,
    get3dContext: get3dContext
  };
  function getWidth(image) {
    return image.naturalWidth || image.width;
  }
  function getHeight(image) {
    return image.naturalHeight || image.height;
  }
  var $_ff7zkmdsjkmcwot2 = {
    getWidth: getWidth,
    getHeight: getHeight
  };
  var promise = function () {
    var Promise = function (fn) {
      if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function')
        throw new TypeError('not a function');
      this._state = null;
      this._value = null;
      this._deferreds = [];
      doResolve(fn, bind(resolve, this), bind(reject, this));
    };
    var asap = Promise.immediateFn || typeof setImmediate === 'function' && setImmediate || function (fn) {
      setTimeout(fn, 1);
    };
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }
    var isArray = Array.isArray || function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
    function handle(deferred) {
      var me = this;
      if (this._state === null) {
        this._deferreds.push(deferred);
        return;
      }
      asap(function () {
        var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (me._state ? deferred.resolve : deferred.reject)(me._value);
          return;
        }
        var ret;
        try {
          ret = cb(me._value);
        } catch (e) {
          deferred.reject(e);
          return;
        }
        deferred.resolve(ret);
      });
    }
    function resolve(newValue) {
      try {
        if (newValue === this)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
            doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
            return;
          }
        }
        this._state = true;
        this._value = newValue;
        finale.call(this);
      } catch (e) {
        reject.call(this, e);
      }
    }
    function reject(newValue) {
      this._state = false;
      this._value = newValue;
      finale.call(this);
    }
    function finale() {
      for (var i = 0, len = this._deferreds.length; i < len; i++) {
        handle.call(this, this._deferreds[i]);
      }
      this._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function (value) {
          if (done)
            return;
          done = true;
          onFulfilled(value);
        }, function (reason) {
          if (done)
            return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        onRejected(ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      var me = this;
      return new Promise(function (resolve, reject) {
        handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };
    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
      return new Promise(function (resolve, reject) {
        if (args.length === 0)
          return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };
    return Promise;
  };
  var Promise = window.Promise ? window.Promise : promise();
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var never = constant(false);
  var always = constant(true);
  var never$1 = never;
  var always$1 = always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call$$1 = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop$$1 = function () {
    };
    var nul = function () {
      return null;
    };
    var undef = function () {
      return undefined;
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call$$1,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      getOrNull: nul,
      getOrUndefined: undef,
      or: id,
      orThunk: call$$1,
      map: none,
      ap: none,
      each: noop$$1,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };
  var Global = typeof window !== 'undefined' ? window : Function('return this;')();
  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : Global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var unsafe = function (name, scope) {
    return resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_901qfodxjkmcwotj = { getOrDie: getOrDie };
  function Blob (parts, properties) {
    var f = $_901qfodxjkmcwotj.getOrDie('Blob');
    return new f(parts, properties);
  }
  function FileReader () {
    var f = $_901qfodxjkmcwotj.getOrDie('FileReader');
    return new f();
  }
  function Uint8Array (arr) {
    var f = $_901qfodxjkmcwotj.getOrDie('Uint8Array');
    return new f(arr);
  }
  var requestAnimationFrame = function (callback) {
    var f = $_901qfodxjkmcwotj.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_901qfodxjkmcwotj.getOrDie('atob');
    return f(base64);
  };
  var $_cygb2he2jkmcwotp = {
    atob: atob,
    requestAnimationFrame: requestAnimationFrame
  };
  function imageToBlob(image) {
    var src = image.src;
    if (src.indexOf('data:') === 0) {
      return dataUriToBlob(src);
    }
    return anyUriToBlob(src);
  }
  function blobToImage(blob) {
    return new Promise(function (resolve, reject) {
      var blobUrl = URL.createObjectURL(blob);
      var image = new Image();
      var removeListeners = function () {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', error);
      };
      function loaded() {
        removeListeners();
        resolve(image);
      }
      function error() {
        removeListeners();
        reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
      }
      image.addEventListener('load', loaded);
      image.addEventListener('error', error);
      image.src = blobUrl;
      if (image.complete) {
        loaded();
      }
    });
  }
  function anyUriToBlob(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        }
      };
      xhr.onerror = function () {
        var _this = this;
        var corsError = function () {
          var obj = new Error('No access to download image');
          obj.code = 18;
          obj.name = 'SecurityError';
          return obj;
        };
        var genericError = function () {
          return new Error('Error ' + _this.status + ' downloading image');
        };
        reject(this.status === 0 ? corsError() : genericError());
      };
      xhr.send();
    });
  }
  function dataUriToBlobSync(uri) {
    var data = uri.split(',');
    var matches = /data:([^;]+)/.exec(data[0]);
    if (!matches)
      return Option.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_cygb2he2jkmcwotp.atob(base64);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);
      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = Uint8Array(bytes);
    }
    return Option.some(Blob(byteArrays, { type: mimetype }));
  }
  function dataUriToBlob(uri) {
    return new Promise(function (resolve, reject) {
      dataUriToBlobSync(uri).fold(function () {
        reject('uri is not base64: ' + uri);
      }, resolve);
    });
  }
  function uriToBlob(url) {
    if (url.indexOf('blob:') === 0) {
      return anyUriToBlob(url);
    }
    if (url.indexOf('data:') === 0) {
      return dataUriToBlob(url);
    }
    return null;
  }
  function canvasToBlob(canvas, type, quality) {
    type = type || 'image/png';
    if (HTMLCanvasElement.prototype.toBlob) {
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, type, quality);
      });
    } else {
      return dataUriToBlob(canvas.toDataURL(type, quality));
    }
  }
  function canvasToDataURL(getCanvas, type, quality) {
    type = type || 'image/png';
    return getCanvas.then(function (canvas) {
      return canvas.toDataURL(type, quality);
    });
  }
  function blobToCanvas(blob) {
    return blobToImage(blob).then(function (image) {
      revokeImageUrl(image);
      var context, canvas;
      canvas = $_2bu9lddrjkmcwot1.create($_ff7zkmdsjkmcwot2.getWidth(image), $_ff7zkmdsjkmcwot2.getHeight(image));
      context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
      context.drawImage(image, 0, 0);
      return canvas;
    });
  }
  function blobToDataUri(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
  function blobToArrayBuffer(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(blob);
    });
  }
  function blobToBase64(blob) {
    return blobToDataUri(blob).then(function (dataUri) {
      return dataUri.split(',')[1];
    });
  }
  function revokeImageUrl(image) {
    URL.revokeObjectURL(image.src);
  }
  var $_818cu1dqjkmcwosl = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToArrayBuffer: blobToArrayBuffer,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob
  };
  var blobToImage$1 = function (image) {
    return $_818cu1dqjkmcwosl.blobToImage(image);
  };
  var imageToBlob$1 = function (blob) {
    return $_818cu1dqjkmcwosl.imageToBlob(blob);
  };
  var blobToDataUri$1 = function (blob) {
    return $_818cu1dqjkmcwosl.blobToDataUri(blob);
  };
  var blobToBase64$1 = function (blob) {
    return $_818cu1dqjkmcwosl.blobToBase64(blob);
  };
  var dataUriToBlobSync$1 = function (uri) {
    return $_818cu1dqjkmcwosl.dataUriToBlobSync(uri);
  };
  var uriToBlob$1 = function (uri) {
    return Option.from($_818cu1dqjkmcwosl.uriToBlob(uri));
  };
  var $_l0c0gdpjkmcwosd = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    uriToBlob: uriToBlob$1
  };
  function create$1(getCanvas, blob, uri) {
    var initialType = blob.type;
    var getType = constant(initialType);
    function toBlob() {
      return Promise.resolve(blob);
    }
    function toDataURL() {
      return uri;
    }
    function toBase64() {
      return uri.split(',')[1];
    }
    function toAdjustedBlob(type, quality) {
      return getCanvas.then(function (canvas) {
        return $_818cu1dqjkmcwosl.canvasToBlob(canvas, type, quality);
      });
    }
    function toAdjustedDataURL(type, quality) {
      return getCanvas.then(function (canvas) {
        return $_818cu1dqjkmcwosl.canvasToDataURL(canvas, type, quality);
      });
    }
    function toAdjustedBase64(type, quality) {
      return toAdjustedDataURL(type, quality).then(function (dataurl) {
        return dataurl.split(',')[1];
      });
    }
    function toCanvas() {
      return getCanvas.then($_2bu9lddrjkmcwot1.clone);
    }
    return {
      getType: getType,
      toBlob: toBlob,
      toDataURL: toDataURL,
      toBase64: toBase64,
      toAdjustedBlob: toAdjustedBlob,
      toAdjustedDataURL: toAdjustedDataURL,
      toAdjustedBase64: toAdjustedBase64,
      toCanvas: toCanvas
    };
  }
  function fromBlob(blob) {
    return $_818cu1dqjkmcwosl.blobToDataUri(blob).then(function (uri) {
      return create$1($_818cu1dqjkmcwosl.blobToCanvas(blob), blob, uri);
    });
  }
  function fromCanvas(canvas, type) {
    return $_818cu1dqjkmcwosl.canvasToBlob(canvas, type).then(function (blob) {
      return create$1(Promise.resolve(canvas), blob, canvas.toDataURL());
    });
  }
  function fromImage(image) {
    return $_818cu1dqjkmcwosl.imageToBlob(image).then(function (blob) {
      return fromBlob(blob);
    });
  }
  var fromBlobAndUrlSync = function (blob, url) {
    return create$1($_818cu1dqjkmcwosl.blobToCanvas(blob), blob, url);
  };
  var $_1fnn2re5jkmcwou0 = {
    fromBlob: fromBlob,
    fromCanvas: fromCanvas,
    fromImage: fromImage,
    fromBlobAndUrlSync: fromBlobAndUrlSync
  };
  function clamp(value, min, max) {
    value = parseFloat(value);
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }
    return value;
  }
  function identity$1() {
    return [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ];
  }
  var DELTA_INDEX = [
    0,
    0.01,
    0.02,
    0.04,
    0.05,
    0.06,
    0.07,
    0.08,
    0.1,
    0.11,
    0.12,
    0.14,
    0.15,
    0.16,
    0.17,
    0.18,
    0.2,
    0.21,
    0.22,
    0.24,
    0.25,
    0.27,
    0.28,
    0.3,
    0.32,
    0.34,
    0.36,
    0.38,
    0.4,
    0.42,
    0.44,
    0.46,
    0.48,
    0.5,
    0.53,
    0.56,
    0.59,
    0.62,
    0.65,
    0.68,
    0.71,
    0.74,
    0.77,
    0.8,
    0.83,
    0.86,
    0.89,
    0.92,
    0.95,
    0.98,
    1,
    1.06,
    1.12,
    1.18,
    1.24,
    1.3,
    1.36,
    1.42,
    1.48,
    1.54,
    1.6,
    1.66,
    1.72,
    1.78,
    1.84,
    1.9,
    1.96,
    2,
    2.12,
    2.25,
    2.37,
    2.5,
    2.62,
    2.75,
    2.87,
    3,
    3.2,
    3.4,
    3.6,
    3.8,
    4,
    4.3,
    4.7,
    4.9,
    5,
    5.5,
    6,
    6.5,
    6.8,
    7,
    7.3,
    7.5,
    7.8,
    8,
    8.4,
    8.7,
    9,
    9.4,
    9.6,
    9.8,
    10
  ];
  function multiply(matrix1, matrix2) {
    var i, j, k, val, col = [], out = new Array(10);
    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        col[j] = matrix2[j + i * 5];
      }
      for (j = 0; j < 5; j++) {
        val = 0;
        for (k = 0; k < 5; k++) {
          val += matrix1[j + k * 5] * col[k];
        }
        out[j + i * 5] = val;
      }
    }
    return out;
  }
  function adjust(matrix, adjustValue) {
    adjustValue = clamp(adjustValue, 0, 1);
    return matrix.map(function (value, index) {
      if (index % 6 === 0) {
        value = 1 - (1 - value) * adjustValue;
      } else {
        value *= adjustValue;
      }
      return clamp(value, 0, 1);
    });
  }
  function adjustContrast(matrix, value) {
    var x;
    value = clamp(value, -1, 1);
    value *= 100;
    if (value < 0) {
      x = 127 + value / 100 * 127;
    } else {
      x = value % 1;
      if (x === 0) {
        x = DELTA_INDEX[value];
      } else {
        x = DELTA_INDEX[Math.floor(value)] * (1 - x) + DELTA_INDEX[Math.floor(value) + 1] * x;
      }
      x = x * 127 + 127;
    }
    return multiply(matrix, [
      x / 127,
      0,
      0,
      0,
      0.5 * (127 - x),
      0,
      x / 127,
      0,
      0,
      0.5 * (127 - x),
      0,
      0,
      x / 127,
      0,
      0.5 * (127 - x),
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  function adjustSaturation(matrix, value) {
    var x, lumR, lumG, lumB;
    value = clamp(value, -1, 1);
    x = 1 + (value > 0 ? 3 * value : value);
    lumR = 0.3086;
    lumG = 0.6094;
    lumB = 0.082;
    return multiply(matrix, [
      lumR * (1 - x) + x,
      lumG * (1 - x),
      lumB * (1 - x),
      0,
      0,
      lumR * (1 - x),
      lumG * (1 - x) + x,
      lumB * (1 - x),
      0,
      0,
      lumR * (1 - x),
      lumG * (1 - x),
      lumB * (1 - x) + x,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  function adjustHue(matrix, angle) {
    var cosVal, sinVal, lumR, lumG, lumB;
    angle = clamp(angle, -180, 180) / 180 * Math.PI;
    cosVal = Math.cos(angle);
    sinVal = Math.sin(angle);
    lumR = 0.213;
    lumG = 0.715;
    lumB = 0.072;
    return multiply(matrix, [
      lumR + cosVal * (1 - lumR) + sinVal * -lumR,
      lumG + cosVal * -lumG + sinVal * -lumG,
      lumB + cosVal * -lumB + sinVal * (1 - lumB),
      0,
      0,
      lumR + cosVal * -lumR + sinVal * 0.143,
      lumG + cosVal * (1 - lumG) + sinVal * 0.14,
      lumB + cosVal * -lumB + sinVal * -0.283,
      0,
      0,
      lumR + cosVal * -lumR + sinVal * -(1 - lumR),
      lumG + cosVal * -lumG + sinVal * lumG,
      lumB + cosVal * (1 - lumB) + sinVal * lumB,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  function adjustBrightness(matrix, value) {
    value = clamp(255 * value, -255, 255);
    return multiply(matrix, [
      1,
      0,
      0,
      0,
      value,
      0,
      1,
      0,
      0,
      value,
      0,
      0,
      1,
      0,
      value,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  function adjustColors(matrix, adjustR, adjustG, adjustB) {
    adjustR = clamp(adjustR, 0, 2);
    adjustG = clamp(adjustG, 0, 2);
    adjustB = clamp(adjustB, 0, 2);
    return multiply(matrix, [
      adjustR,
      0,
      0,
      0,
      0,
      0,
      adjustG,
      0,
      0,
      0,
      0,
      0,
      adjustB,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
  }
  function adjustSepia(matrix, value) {
    value = clamp(value, 0, 1);
    return multiply(matrix, adjust([
      0.393,
      0.769,
      0.189,
      0,
      0,
      0.349,
      0.686,
      0.168,
      0,
      0,
      0.272,
      0.534,
      0.131,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ], value));
  }
  function adjustGrayscale(matrix, value) {
    value = clamp(value, 0, 1);
    return multiply(matrix, adjust([
      0.33,
      0.34,
      0.33,
      0,
      0,
      0.33,
      0.34,
      0.33,
      0,
      0,
      0.33,
      0.34,
      0.33,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ], value));
  }
  var $_5zsstde6jkmcwou6 = {
    identity: identity$1,
    adjust: adjust,
    multiply: multiply,
    adjustContrast: adjustContrast,
    adjustBrightness: adjustBrightness,
    adjustSaturation: adjustSaturation,
    adjustHue: adjustHue,
    adjustColors: adjustColors,
    adjustSepia: adjustSepia,
    adjustGrayscale: adjustGrayscale
  };
  function colorFilter(ir, matrix) {
    return ir.toCanvas().then(function (canvas) {
      return applyColorFilter(canvas, ir.getType(), matrix);
    });
  }
  function applyColorFilter(canvas, type, matrix) {
    var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
    var pixels;
    function applyMatrix(pixels, m) {
      var d = pixels.data, r, g, b, a, i, m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7], m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11], m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15], m16 = m[16], m17 = m[17], m18 = m[18], m19 = m[19];
      for (i = 0; i < d.length; i += 4) {
        r = d[i];
        g = d[i + 1];
        b = d[i + 2];
        a = d[i + 3];
        d[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
        d[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
        d[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
        d[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19;
      }
      return pixels;
    }
    pixels = applyMatrix(context.getImageData(0, 0, canvas.width, canvas.height), matrix);
    context.putImageData(pixels, 0, 0);
    return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
  }
  function convoluteFilter(ir, matrix) {
    return ir.toCanvas().then(function (canvas) {
      return applyConvoluteFilter(canvas, ir.getType(), matrix);
    });
  }
  function applyConvoluteFilter(canvas, type, matrix) {
    var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
    var pixelsIn, pixelsOut;
    function applyMatrix(pixelsIn, pixelsOut, matrix) {
      var rgba, drgba, side, halfSide, x, y, r, g, b, cx, cy, scx, scy, offset, wt, w, h;
      function clamp(value, min, max) {
        if (value > max) {
          value = max;
        } else if (value < min) {
          value = min;
        }
        return value;
      }
      side = Math.round(Math.sqrt(matrix.length));
      halfSide = Math.floor(side / 2);
      rgba = pixelsIn.data;
      drgba = pixelsOut.data;
      w = pixelsIn.width;
      h = pixelsIn.height;
      for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
          r = g = b = 0;
          for (cy = 0; cy < side; cy++) {
            for (cx = 0; cx < side; cx++) {
              scx = clamp(x + cx - halfSide, 0, w - 1);
              scy = clamp(y + cy - halfSide, 0, h - 1);
              offset = (scy * w + scx) * 4;
              wt = matrix[cy * side + cx];
              r += rgba[offset] * wt;
              g += rgba[offset + 1] * wt;
              b += rgba[offset + 2] * wt;
            }
          }
          offset = (y * w + x) * 4;
          drgba[offset] = clamp(r, 0, 255);
          drgba[offset + 1] = clamp(g, 0, 255);
          drgba[offset + 2] = clamp(b, 0, 255);
        }
      }
      return pixelsOut;
    }
    pixelsIn = context.getImageData(0, 0, canvas.width, canvas.height);
    pixelsOut = context.getImageData(0, 0, canvas.width, canvas.height);
    pixelsOut = applyMatrix(pixelsIn, pixelsOut, matrix);
    context.putImageData(pixelsOut, 0, 0);
    return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
  }
  function functionColorFilter(colorFn) {
    var filterImpl = function (canvas, type, value) {
      var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
      var pixels, i, lookup = new Array(256);
      function applyLookup(pixels, lookup) {
        var d = pixels.data, i;
        for (i = 0; i < d.length; i += 4) {
          d[i] = lookup[d[i]];
          d[i + 1] = lookup[d[i + 1]];
          d[i + 2] = lookup[d[i + 2]];
        }
        return pixels;
      }
      for (i = 0; i < lookup.length; i++) {
        lookup[i] = colorFn(i, value);
      }
      pixels = applyLookup(context.getImageData(0, 0, canvas.width, canvas.height), lookup);
      context.putImageData(pixels, 0, 0);
      return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
    };
    return function (ir, value) {
      return ir.toCanvas().then(function (canvas) {
        return filterImpl(canvas, ir.getType(), value);
      });
    };
  }
  function complexAdjustableColorFilter(matrixAdjustFn) {
    return function (ir, adjust) {
      return colorFilter(ir, matrixAdjustFn($_5zsstde6jkmcwou6.identity(), adjust));
    };
  }
  function basicColorFilter(matrix) {
    return function (ir) {
      return colorFilter(ir, matrix);
    };
  }
  function basicConvolutionFilter(kernel) {
    return function (ir) {
      return convoluteFilter(ir, kernel);
    };
  }
  var $_3lo5mbe4jkmcwotv = {
    invert: basicColorFilter([
      -1,
      0,
      0,
      0,
      255,
      0,
      -1,
      0,
      0,
      255,
      0,
      0,
      -1,
      0,
      255,
      0,
      0,
      0,
      1,
      0
    ]),
    brightness: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustBrightness),
    hue: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustHue),
    saturate: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustSaturation),
    contrast: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustContrast),
    grayscale: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustGrayscale),
    sepia: complexAdjustableColorFilter($_5zsstde6jkmcwou6.adjustSepia),
    colorize: function (ir, adjustR, adjustG, adjustB) {
      return colorFilter(ir, $_5zsstde6jkmcwou6.adjustColors($_5zsstde6jkmcwou6.identity(), adjustR, adjustG, adjustB));
    },
    sharpen: basicConvolutionFilter([
      0,
      -1,
      0,
      -1,
      5,
      -1,
      0,
      -1,
      0
    ]),
    emboss: basicConvolutionFilter([
      -2,
      -1,
      0,
      -1,
      1,
      1,
      0,
      1,
      2
    ]),
    gamma: functionColorFilter(function (color, value) {
      return Math.pow(color / 255, 1 - value) * 255;
    }),
    exposure: functionColorFilter(function (color, value) {
      return 255 * (1 - Math.exp(-(color / 255) * value));
    }),
    colorFilter: colorFilter,
    convoluteFilter: convoluteFilter
  };
  function scale(image, dW, dH) {
    var sW = $_ff7zkmdsjkmcwot2.getWidth(image);
    var sH = $_ff7zkmdsjkmcwot2.getHeight(image);
    var wRatio = dW / sW;
    var hRatio = dH / sH;
    var scaleCapped = false;
    if (wRatio < 0.5 || wRatio > 2) {
      wRatio = wRatio < 0.5 ? 0.5 : 2;
      scaleCapped = true;
    }
    if (hRatio < 0.5 || hRatio > 2) {
      hRatio = hRatio < 0.5 ? 0.5 : 2;
      scaleCapped = true;
    }
    var scaled = _scale(image, wRatio, hRatio);
    return !scaleCapped ? scaled : scaled.then(function (tCanvas) {
      return scale(tCanvas, dW, dH);
    });
  }
  function _scale(image, wRatio, hRatio) {
    return new Promise(function (resolve) {
      var sW = $_ff7zkmdsjkmcwot2.getWidth(image);
      var sH = $_ff7zkmdsjkmcwot2.getHeight(image);
      var dW = Math.floor(sW * wRatio);
      var dH = Math.floor(sH * hRatio);
      var canvas = $_2bu9lddrjkmcwot1.create(dW, dH);
      var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
      context.drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);
      resolve(canvas);
    });
  }
  var $_4zfeepe8jkmcwoud = { scale: scale };
  function rotate(ir, angle) {
    return ir.toCanvas().then(function (canvas) {
      return applyRotate(canvas, ir.getType(), angle);
    });
  }
  function applyRotate(image, type, angle) {
    var canvas = $_2bu9lddrjkmcwot1.create(image.width, image.height);
    var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
    var translateX = 0, translateY = 0;
    angle = angle < 0 ? 360 + angle : angle;
    if (angle == 90 || angle == 270) {
      $_2bu9lddrjkmcwot1.resize(canvas, canvas.height, canvas.width);
    }
    if (angle == 90 || angle == 180) {
      translateX = canvas.width;
    }
    if (angle == 270 || angle == 180) {
      translateY = canvas.height;
    }
    context.translate(translateX, translateY);
    context.rotate(angle * Math.PI / 180);
    context.drawImage(image, 0, 0);
    return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
  }
  function flip(ir, axis) {
    return ir.toCanvas().then(function (canvas) {
      return applyFlip(canvas, ir.getType(), axis);
    });
  }
  function applyFlip(image, type, axis) {
    var canvas = $_2bu9lddrjkmcwot1.create(image.width, image.height);
    var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
    if (axis == 'v') {
      context.scale(1, -1);
      context.drawImage(image, 0, -canvas.height);
    } else {
      context.scale(-1, 1);
      context.drawImage(image, -canvas.width, 0);
    }
    return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
  }
  function crop(ir, x, y, w, h) {
    return ir.toCanvas().then(function (canvas) {
      return applyCrop(canvas, ir.getType(), x, y, w, h);
    });
  }
  function applyCrop(image, type, x, y, w, h) {
    var canvas = $_2bu9lddrjkmcwot1.create(w, h);
    var context = $_2bu9lddrjkmcwot1.get2dContext(canvas);
    context.drawImage(image, -x, -y);
    return $_1fnn2re5jkmcwou0.fromCanvas(canvas, type);
  }
  function resize$1(ir, w, h) {
    return ir.toCanvas().then(function (canvas) {
      return $_4zfeepe8jkmcwoud.scale(canvas, w, h).then(function (newCanvas) {
        return $_1fnn2re5jkmcwou0.fromCanvas(newCanvas, ir.getType());
      });
    });
  }
  var $_dd55mbe7jkmcwoub = {
    rotate: rotate,
    flip: flip,
    crop: crop,
    resize: resize$1
  };
  var BinaryReader = function () {
    function BinaryReader(ar) {
      this.littleEndian = false;
      this._dv = new DataView(ar);
    }
    BinaryReader.prototype.readByteAt = function (idx) {
      return this._dv.getUint8(idx);
    };
    BinaryReader.prototype.read = function (idx, size) {
      if (idx + size > this.length()) {
        return null;
      }
      var mv = this.littleEndian ? 0 : -8 * (size - 1);
      for (var i = 0, sum = 0; i < size; i++) {
        sum |= this.readByteAt(idx + i) << Math.abs(mv + i * 8);
      }
      return sum;
    };
    BinaryReader.prototype.BYTE = function (idx) {
      return this.read(idx, 1);
    };
    BinaryReader.prototype.SHORT = function (idx) {
      return this.read(idx, 2);
    };
    BinaryReader.prototype.LONG = function (idx) {
      return this.read(idx, 4);
    };
    BinaryReader.prototype.SLONG = function (idx) {
      var num = this.read(idx, 4);
      return num > 2147483647 ? num - 4294967296 : num;
    };
    BinaryReader.prototype.CHAR = function (idx) {
      return String.fromCharCode(this.read(idx, 1));
    };
    BinaryReader.prototype.STRING = function (idx, count) {
      return this.asArray('CHAR', idx, count).join('');
    };
    BinaryReader.prototype.SEGMENT = function (idx, size) {
      var ar = this._dv.buffer;
      switch (arguments.length) {
      case 2:
        return ar.slice(idx, idx + size);
      case 1:
        return ar.slice(idx);
      default:
        return ar;
      }
    };
    BinaryReader.prototype.asArray = function (type, idx, count) {
      var values = [];
      for (var i = 0; i < count; i++) {
        values[i] = this[type](idx + i);
      }
      return values;
    };
    BinaryReader.prototype.length = function () {
      return this._dv ? this._dv.byteLength : 0;
    };
    return BinaryReader;
  }();
  var tags = {
    tiff: {
      274: 'Orientation',
      270: 'ImageDescription',
      271: 'Make',
      272: 'Model',
      305: 'Software',
      34665: 'ExifIFDPointer',
      34853: 'GPSInfoIFDPointer'
    },
    exif: {
      36864: 'ExifVersion',
      40961: 'ColorSpace',
      40962: 'PixelXDimension',
      40963: 'PixelYDimension',
      36867: 'DateTimeOriginal',
      33434: 'ExposureTime',
      33437: 'FNumber',
      34855: 'ISOSpeedRatings',
      37377: 'ShutterSpeedValue',
      37378: 'ApertureValue',
      37383: 'MeteringMode',
      37384: 'LightSource',
      37385: 'Flash',
      37386: 'FocalLength',
      41986: 'ExposureMode',
      41987: 'WhiteBalance',
      41990: 'SceneCaptureType',
      41988: 'DigitalZoomRatio',
      41992: 'Contrast',
      41993: 'Saturation',
      41994: 'Sharpness'
    },
    gps: {
      0: 'GPSVersionID',
      1: 'GPSLatitudeRef',
      2: 'GPSLatitude',
      3: 'GPSLongitudeRef',
      4: 'GPSLongitude'
    },
    thumb: {
      513: 'JPEGInterchangeFormat',
      514: 'JPEGInterchangeFormatLength'
    }
  };
  var tagDescs = {
    'ColorSpace': {
      1: 'sRGB',
      0: 'Uncalibrated'
    },
    'MeteringMode': {
      0: 'Unknown',
      1: 'Average',
      2: 'CenterWeightedAverage',
      3: 'Spot',
      4: 'MultiSpot',
      5: 'Pattern',
      6: 'Partial',
      255: 'Other'
    },
    'LightSource': {
      1: 'Daylight',
      2: 'Fliorescent',
      3: 'Tungsten',
      4: 'Flash',
      9: 'Fine weather',
      10: 'Cloudy weather',
      11: 'Shade',
      12: 'Daylight fluorescent (D 5700 - 7100K)',
      13: 'Day white fluorescent (N 4600 -5400K)',
      14: 'Cool white fluorescent (W 3900 - 4500K)',
      15: 'White fluorescent (WW 3200 - 3700K)',
      17: 'Standard light A',
      18: 'Standard light B',
      19: 'Standard light C',
      20: 'D55',
      21: 'D65',
      22: 'D75',
      23: 'D50',
      24: 'ISO studio tungsten',
      255: 'Other'
    },
    'Flash': {
      0: 'Flash did not fire',
      1: 'Flash fired',
      5: 'Strobe return light not detected',
      7: 'Strobe return light detected',
      9: 'Flash fired, compulsory flash mode',
      13: 'Flash fired, compulsory flash mode, return light not detected',
      15: 'Flash fired, compulsory flash mode, return light detected',
      16: 'Flash did not fire, compulsory flash mode',
      24: 'Flash did not fire, auto mode',
      25: 'Flash fired, auto mode',
      29: 'Flash fired, auto mode, return light not detected',
      31: 'Flash fired, auto mode, return light detected',
      32: 'No flash function',
      65: 'Flash fired, red-eye reduction mode',
      69: 'Flash fired, red-eye reduction mode, return light not detected',
      71: 'Flash fired, red-eye reduction mode, return light detected',
      73: 'Flash fired, compulsory flash mode, red-eye reduction mode',
      77: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
      79: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
      89: 'Flash fired, auto mode, red-eye reduction mode',
      93: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
      95: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
    },
    'ExposureMode': {
      0: 'Auto exposure',
      1: 'Manual exposure',
      2: 'Auto bracket'
    },
    'WhiteBalance': {
      0: 'Auto white balance',
      1: 'Manual white balance'
    },
    'SceneCaptureType': {
      0: 'Standard',
      1: 'Landscape',
      2: 'Portrait',
      3: 'Night scene'
    },
    'Contrast': {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    'Saturation': {
      0: 'Normal',
      1: 'Low saturation',
      2: 'High saturation'
    },
    'Sharpness': {
      0: 'Normal',
      1: 'Soft',
      2: 'Hard'
    },
    'GPSLatitudeRef': {
      N: 'North latitude',
      S: 'South latitude'
    },
    'GPSLongitudeRef': {
      E: 'East longitude',
      W: 'West longitude'
    }
  };
  var ExifReader = function () {
    function ExifReader(ar) {
      this._offsets = {
        tiffHeader: 10,
        IFD0: null,
        IFD1: null,
        exifIFD: null,
        gpsIFD: null
      };
      this._tiffTags = {};
      var self = this;
      self._reader = new BinaryReader(ar);
      self._idx = self._offsets.tiffHeader;
      if (self.SHORT(0) !== 65505 || self.STRING(4, 5).toUpperCase() !== 'EXIF\0') {
        throw new Error('Exif data cannot be read or not available.');
      }
      self._reader.littleEndian = self.SHORT(self._idx) == 18761;
      if (self.SHORT(self._idx += 2) !== 42) {
        throw new Error('Invalid Exif data.');
      }
      self._offsets.IFD0 = self._offsets.tiffHeader + self.LONG(self._idx += 2);
      self._tiffTags = self.extractTags(self._offsets.IFD0, tags.tiff);
      if ('ExifIFDPointer' in self._tiffTags) {
        self._offsets.exifIFD = self._offsets.tiffHeader + self._tiffTags.ExifIFDPointer;
        delete self._tiffTags.ExifIFDPointer;
      }
      if ('GPSInfoIFDPointer' in self._tiffTags) {
        self._offsets.gpsIFD = self._offsets.tiffHeader + self._tiffTags.GPSInfoIFDPointer;
        delete self._tiffTags.GPSInfoIFDPointer;
      }
      var IFD1Offset = self.LONG(self._offsets.IFD0 + self.SHORT(self._offsets.IFD0) * 12 + 2);
      if (IFD1Offset) {
        self._offsets.IFD1 = self._offsets.tiffHeader + IFD1Offset;
      }
    }
    ExifReader.prototype.BYTE = function (idx) {
      return this._reader.BYTE(idx);
    };
    ExifReader.prototype.SHORT = function (idx) {
      return this._reader.SHORT(idx);
    };
    ExifReader.prototype.LONG = function (idx) {
      return this._reader.LONG(idx);
    };
    ExifReader.prototype.SLONG = function (idx) {
      return this._reader.SLONG(idx);
    };
    ExifReader.prototype.CHAR = function (idx) {
      return this._reader.CHAR(idx);
    };
    ExifReader.prototype.STRING = function (idx, count) {
      return this._reader.STRING(idx, count);
    };
    ExifReader.prototype.SEGMENT = function (idx, size) {
      return this._reader.SEGMENT(idx, size);
    };
    ExifReader.prototype.asArray = function (type, idx, count) {
      var values = [];
      for (var i = 0; i < count; i++) {
        values[i] = this[type](idx + i);
      }
      return values;
    };
    ExifReader.prototype.length = function () {
      return this._reader.length();
    };
    ExifReader.prototype.UNDEFINED = function () {
      return this.BYTE.apply(this, arguments);
    };
    ExifReader.prototype.RATIONAL = function (idx) {
      return this.LONG(idx) / this.LONG(idx + 4);
    };
    ExifReader.prototype.SRATIONAL = function (idx) {
      return this.SLONG(idx) / this.SLONG(idx + 4);
    };
    ExifReader.prototype.ASCII = function (idx) {
      return this.CHAR(idx);
    };
    ExifReader.prototype.TIFF = function () {
      return this._tiffTags;
    };
    ExifReader.prototype.EXIF = function () {
      var self = this;
      var Exif = null;
      if (self._offsets.exifIFD) {
        try {
          Exif = self.extractTags(self._offsets.exifIFD, tags.exif);
        } catch (ex) {
          return null;
        }
        if (Exif.ExifVersion && Array.isArray(Exif.ExifVersion)) {
          for (var i = 0, exifVersion = ''; i < Exif.ExifVersion.length; i++) {
            exifVersion += String.fromCharCode(Exif.ExifVersion[i]);
          }
          Exif.ExifVersion = exifVersion;
        }
      }
      return Exif;
    };
    ExifReader.prototype.GPS = function () {
      var self = this;
      var GPS = null;
      if (self._offsets.gpsIFD) {
        try {
          GPS = self.extractTags(self._offsets.gpsIFD, tags.gps);
        } catch (ex) {
          return null;
        }
        if (GPS.GPSVersionID && Array.isArray(GPS.GPSVersionID)) {
          GPS.GPSVersionID = GPS.GPSVersionID.join('.');
        }
      }
      return GPS;
    };
    ExifReader.prototype.thumb = function () {
      var self = this;
      if (self._offsets.IFD1) {
        try {
          var IFD1Tags = self.extractTags(self._offsets.IFD1, tags.thumb);
          if ('JPEGInterchangeFormat' in IFD1Tags) {
            return self.SEGMENT(self._offsets.tiffHeader + IFD1Tags.JPEGInterchangeFormat, IFD1Tags.JPEGInterchangeFormatLength);
          }
        } catch (ex) {
        }
      }
      return null;
    };
    ExifReader.prototype.extractTags = function (IFD_offset, tags2extract) {
      var self = this;
      var length, i, tag, type, count, size, offset, value, values = [], hash = {};
      var types = {
        1: 'BYTE',
        7: 'UNDEFINED',
        2: 'ASCII',
        3: 'SHORT',
        4: 'LONG',
        5: 'RATIONAL',
        9: 'SLONG',
        10: 'SRATIONAL'
      };
      var sizes = {
        'BYTE': 1,
        'UNDEFINED': 1,
        'ASCII': 1,
        'SHORT': 2,
        'LONG': 4,
        'RATIONAL': 8,
        'SLONG': 4,
        'SRATIONAL': 8
      };
      length = self.SHORT(IFD_offset);
      for (i = 0; i < length; i++) {
        values = [];
        offset = IFD_offset + 2 + i * 12;
        tag = tags2extract[self.SHORT(offset)];
        if (tag === undefined) {
          continue;
        }
        type = types[self.SHORT(offset += 2)];
        count = self.LONG(offset += 2);
        size = sizes[type];
        if (!size) {
          throw new Error('Invalid Exif data.');
        }
        offset += 4;
        if (size * count > 4) {
          offset = self.LONG(offset) + self._offsets.tiffHeader;
        }
        if (offset + size * count >= self.length()) {
          throw new Error('Invalid Exif data.');
        }
        if (type === 'ASCII') {
          hash[tag] = self.STRING(offset, count).replace(/\0$/, '').trim();
          continue;
        } else {
          values = self.asArray(type, offset, count);
          value = count == 1 ? values[0] : values;
          if (tagDescs.hasOwnProperty(tag) && typeof value != 'object') {
            hash[tag] = tagDescs[tag][value];
          } else {
            hash[tag] = value;
          }
        }
      }
      return hash;
    };
    return ExifReader;
  }();
  var extractFrom = function (blob) {
    return $_818cu1dqjkmcwosl.blobToArrayBuffer(blob).then(function (ar) {
      try {
        var br = new BinaryReader(ar);
        if (br.SHORT(0) === 65496) {
          var headers = extractHeaders(br);
          var app1 = headers.filter(function (header) {
            return header.name === 'APP1';
          });
          var meta = {};
          if (app1.length) {
            var exifReader = new ExifReader(app1[0].segment);
            meta = {
              tiff: exifReader.TIFF(),
              exif: exifReader.EXIF(),
              gps: exifReader.GPS(),
              thumb: exifReader.thumb()
            };
          } else {
            return Promise.reject('Headers did not include required information');
          }
          meta.rawHeaders = headers;
          return meta;
        }
        return Promise.reject('Image was not a jpeg');
      } catch (ex) {
        return Promise.reject('Unsupported format or not an image: ' + blob.type + ' (Exception: ' + ex.message + ')');
      }
    });
  };
  var extractHeaders = function (br) {
    var headers = [], idx, marker, length = 0;
    idx = 2;
    while (idx <= br.length()) {
      marker = br.SHORT(idx);
      if (marker >= 65488 && marker <= 65495) {
        idx += 2;
        continue;
      }
      if (marker === 65498 || marker === 65497) {
        break;
      }
      length = br.SHORT(idx + 2) + 2;
      if (marker >= 65505 && marker <= 65519) {
        headers.push({
          hex: marker,
          name: 'APP' + (marker & 15),
          start: idx,
          length: length,
          segment: br.SEGMENT(idx, length)
        });
      }
      idx += length;
    }
    return headers;
  };
  var $_61aovte9jkmcwoug = { extractFrom: extractFrom };
  var invert = function (ir) {
    return $_3lo5mbe4jkmcwotv.invert(ir);
  };
  var sharpen = function (ir) {
    return $_3lo5mbe4jkmcwotv.sharpen(ir);
  };
  var emboss = function (ir) {
    return $_3lo5mbe4jkmcwotv.emboss(ir);
  };
  var gamma = function (ir, value) {
    return $_3lo5mbe4jkmcwotv.gamma(ir, value);
  };
  var exposure = function (ir, value) {
    return $_3lo5mbe4jkmcwotv.exposure(ir, value);
  };
  var colorize = function (ir, adjustR, adjustG, adjustB) {
    return $_3lo5mbe4jkmcwotv.colorize(ir, adjustR, adjustG, adjustB);
  };
  var brightness = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.brightness(ir, adjust);
  };
  var hue = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.hue(ir, adjust);
  };
  var saturate = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.saturate(ir, adjust);
  };
  var contrast = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.contrast(ir, adjust);
  };
  var grayscale = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.grayscale(ir, adjust);
  };
  var sepia = function (ir, adjust) {
    return $_3lo5mbe4jkmcwotv.sepia(ir, adjust);
  };
  var flip$1 = function (ir, axis) {
    return $_dd55mbe7jkmcwoub.flip(ir, axis);
  };
  var crop$1 = function (ir, x, y, w, h) {
    return $_dd55mbe7jkmcwoub.crop(ir, x, y, w, h);
  };
  var resize$2 = function (ir, w, h) {
    return $_dd55mbe7jkmcwoub.resize(ir, w, h);
  };
  var rotate$1 = function (ir, angle) {
    return $_dd55mbe7jkmcwoub.rotate(ir, angle);
  };
  var exifRotate = function (ir) {
    var ROTATE_90 = 6;
    var ROTATE_180 = 3;
    var ROTATE_270 = 8;
    var checkRotation = function (data) {
      var orientation = data.tiff.Orientation;
      switch (orientation) {
      case ROTATE_90:
        return rotate$1(ir, 90);
      case ROTATE_180:
        return rotate$1(ir, 180);
      case ROTATE_270:
        return rotate$1(ir, 270);
      default:
        return ir;
      }
      
    };
    var notJpeg = function () {
      return ir;
    };
    return ir.toBlob().then($_61aovte9jkmcwoug.extractFrom).then(checkRotation, notJpeg);
  };
  var $_5tl1cxe3jkmcwotr = {
    invert: invert,
    sharpen: sharpen,
    emboss: emboss,
    brightness: brightness,
    hue: hue,
    saturate: saturate,
    contrast: contrast,
    grayscale: grayscale,
    sepia: sepia,
    colorize: colorize,
    gamma: gamma,
    exposure: exposure,
    flip: flip$1,
    crop: crop$1,
    resize: resize$2,
    rotate: rotate$1,
    exifRotate: exifRotate
  };
  var blobToImageResult = function (blob) {
    return $_1fnn2re5jkmcwou0.fromBlob(blob);
  };
  var fromBlobAndUrlSync$1 = function (blob, uri) {
    return $_1fnn2re5jkmcwou0.fromBlobAndUrlSync(blob, uri);
  };
  var imageToImageResult = function (image) {
    return $_1fnn2re5jkmcwou0.fromImage(image);
  };
  var imageResultToBlob = function (ir, type, quality) {
    if (type === undefined && quality === undefined) {
      return imageResultToOriginalBlob(ir);
    } else {
      return ir.toAdjustedBlob(type, quality);
    }
  };
  var imageResultToOriginalBlob = function (ir) {
    return ir.toBlob();
  };
  var imageResultToDataURL = function (ir) {
    return ir.toDataURL();
  };
  var $_5w2bq6ecjkmcwov0 = {
    blobToImageResult: blobToImageResult,
    fromBlobAndUrlSync: fromBlobAndUrlSync$1,
    imageToImageResult: imageToImageResult,
    imageResultToBlob: imageResultToBlob,
    imageResultToOriginalBlob: imageResultToOriginalBlob,
    imageResultToDataURL: imageResultToDataURL
  };
  var url = function () {
    return $_901qfodxjkmcwotj.getOrDie('URL');
  };
  var createObjectURL = function (blob) {
    return url().createObjectURL(blob);
  };
  var revokeObjectURL = function (u) {
    url().revokeObjectURL(u);
  };
  var $_51cs3oedjkmcwov1 = {
    createObjectURL: createObjectURL,
    revokeObjectURL: revokeObjectURL
  };
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.URI');
  var getToolbarItems = function (editor) {
    return editor.getParam('imagetools_toolbar', 'rotateleft rotateright | flipv fliph | crop editimage imageoptions');
  };
  var getProxyUrl = function (editor) {
    return editor.getParam('imagetools_proxy');
  };
  var getCorsHosts = function (editor) {
    return editor.getParam('imagetools_cors_hosts', [], 'string[]');
  };
  var getCredentialsHosts = function (editor) {
    return editor.getParam('imagetools_credentials_hosts', [], 'string[]');
  };
  var getApiKey = function (editor) {
    return editor.getParam('api_key', editor.getParam('imagetools_api_key', '', 'string'), 'string');
  };
  var getUploadTimeout = function (editor) {
    return editor.getParam('images_upload_timeout', 30000, 'number');
  };
  var shouldReuseFilename = function (editor) {
    return editor.getParam('images_reuse_filename', false, 'boolean');
  };
  var global$5 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$6 = tinymce.util.Tools.resolve('tinymce.ui.Factory');
  function UndoStack () {
    var data = [];
    var index = -1;
    function add(state) {
      var removed;
      removed = data.splice(++index);
      data.push(state);
      return {
        state: state,
        removed: removed
      };
    }
    function undo() {
      if (canUndo()) {
        return data[--index];
      }
    }
    function redo() {
      if (canRedo()) {
        return data[++index];
      }
    }
    function canUndo() {
      return index > 0;
    }
    function canRedo() {
      return index !== -1 && index < data.length - 1;
    }
    return {
      data: data,
      add: add,
      undo: undo,
      redo: redo,
      canUndo: canUndo,
      canRedo: canRedo
    };
  }
  var global$7 = tinymce.util.Tools.resolve('tinymce.geom.Rect');
  var loadImage$1 = function (image) {
    return new global$3(function (resolve) {
      var loaded = function () {
        image.removeEventListener('load', loaded);
        resolve(image);
      };
      if (image.complete) {
        resolve(image);
      } else {
        image.addEventListener('load', loaded);
      }
    });
  };
  var $_4u6vvleojkmcwow0 = { loadImage: loadImage$1 };
  var global$8 = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');
  var global$9 = tinymce.util.Tools.resolve('tinymce.util.Observable');
  var global$10 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var count = 0;
  function CropRect (currentRect, viewPortRect, clampRect, containerElm, action) {
    var instance;
    var handles;
    var dragHelpers;
    var blockers;
    var prefix = 'mce-';
    var id = prefix + 'crid-' + count++;
    handles = [
      {
        name: 'move',
        xMul: 0,
        yMul: 0,
        deltaX: 1,
        deltaY: 1,
        deltaW: 0,
        deltaH: 0,
        label: 'Crop Mask'
      },
      {
        name: 'nw',
        xMul: 0,
        yMul: 0,
        deltaX: 1,
        deltaY: 1,
        deltaW: -1,
        deltaH: -1,
        label: 'Top Left Crop Handle'
      },
      {
        name: 'ne',
        xMul: 1,
        yMul: 0,
        deltaX: 0,
        deltaY: 1,
        deltaW: 1,
        deltaH: -1,
        label: 'Top Right Crop Handle'
      },
      {
        name: 'sw',
        xMul: 0,
        yMul: 1,
        deltaX: 1,
        deltaY: 0,
        deltaW: -1,
        deltaH: 1,
        label: 'Bottom Left Crop Handle'
      },
      {
        name: 'se',
        xMul: 1,
        yMul: 1,
        deltaX: 0,
        deltaY: 0,
        deltaW: 1,
        deltaH: 1,
        label: 'Bottom Right Crop Handle'
      }
    ];
    blockers = [
      'top',
      'right',
      'bottom',
      'left'
    ];
    function getAbsoluteRect(outerRect, relativeRect) {
      return {
        x: relativeRect.x + outerRect.x,
        y: relativeRect.y + outerRect.y,
        w: relativeRect.w,
        h: relativeRect.h
      };
    }
    function getRelativeRect(outerRect, innerRect) {
      return {
        x: innerRect.x - outerRect.x,
        y: innerRect.y - outerRect.y,
        w: innerRect.w,
        h: innerRect.h
      };
    }
    function getInnerRect() {
      return getRelativeRect(clampRect, currentRect);
    }
    function moveRect(handle, startRect, deltaX, deltaY) {
      var x, y, w, h, rect;
      x = startRect.x;
      y = startRect.y;
      w = startRect.w;
      h = startRect.h;
      x += deltaX * handle.deltaX;
      y += deltaY * handle.deltaY;
      w += deltaX * handle.deltaW;
      h += deltaY * handle.deltaH;
      if (w < 20) {
        w = 20;
      }
      if (h < 20) {
        h = 20;
      }
      rect = currentRect = global$7.clamp({
        x: x,
        y: y,
        w: w,
        h: h
      }, clampRect, handle.name === 'move');
      rect = getRelativeRect(clampRect, rect);
      instance.fire('updateRect', { rect: rect });
      setInnerRect(rect);
    }
    function render() {
      function createDragHelper(handle) {
        var startRect;
        var DragHelper = global$6.get('DragHelper');
        return new DragHelper(id, {
          document: containerElm.ownerDocument,
          handle: id + '-' + handle.name,
          start: function () {
            startRect = currentRect;
          },
          drag: function (e) {
            moveRect(handle, startRect, e.deltaX, e.deltaY);
          }
        });
      }
      global$8('<div id="' + id + '" class="' + prefix + 'croprect-container"' + ' role="grid" aria-dropeffect="execute">').appendTo(containerElm);
      global$1.each(blockers, function (blocker) {
        global$8('#' + id, containerElm).append('<div id="' + id + '-' + blocker + '"class="' + prefix + 'croprect-block" style="display: none" data-mce-bogus="all">');
      });
      global$1.each(handles, function (handle) {
        global$8('#' + id, containerElm).append('<div id="' + id + '-' + handle.name + '" class="' + prefix + 'croprect-handle ' + prefix + 'croprect-handle-' + handle.name + '"' + 'style="display: none" data-mce-bogus="all" role="gridcell" tabindex="-1"' + ' aria-label="' + handle.label + '" aria-grabbed="false">');
      });
      dragHelpers = global$1.map(handles, createDragHelper);
      repaint(currentRect);
      global$8(containerElm).on('focusin focusout', function (e) {
        global$8(e.target).attr('aria-grabbed', e.type === 'focus');
      });
      global$8(containerElm).on('keydown', function (e) {
        var activeHandle;
        global$1.each(handles, function (handle) {
          if (e.target.id === id + '-' + handle.name) {
            activeHandle = handle;
            return false;
          }
        });
        function moveAndBlock(evt, handle, startRect, deltaX, deltaY) {
          evt.stopPropagation();
          evt.preventDefault();
          moveRect(activeHandle, startRect, deltaX, deltaY);
        }
        switch (e.keyCode) {
        case global$10.LEFT:
          moveAndBlock(e, activeHandle, currentRect, -10, 0);
          break;
        case global$10.RIGHT:
          moveAndBlock(e, activeHandle, currentRect, 10, 0);
          break;
        case global$10.UP:
          moveAndBlock(e, activeHandle, currentRect, 0, -10);
          break;
        case global$10.DOWN:
          moveAndBlock(e, activeHandle, currentRect, 0, 10);
          break;
        case global$10.ENTER:
        case global$10.SPACEBAR:
          e.preventDefault();
          action();
          break;
        }
      });
    }
    function toggleVisibility(state) {
      var selectors;
      selectors = global$1.map(handles, function (handle) {
        return '#' + id + '-' + handle.name;
      }).concat(global$1.map(blockers, function (blocker) {
        return '#' + id + '-' + blocker;
      })).join(',');
      if (state) {
        global$8(selectors, containerElm).show();
      } else {
        global$8(selectors, containerElm).hide();
      }
    }
    function repaint(rect) {
      function updateElementRect(name, rect) {
        if (rect.h < 0) {
          rect.h = 0;
        }
        if (rect.w < 0) {
          rect.w = 0;
        }
        global$8('#' + id + '-' + name, containerElm).css({
          left: rect.x,
          top: rect.y,
          width: rect.w,
          height: rect.h
        });
      }
      global$1.each(handles, function (handle) {
        global$8('#' + id + '-' + handle.name, containerElm).css({
          left: rect.w * handle.xMul + rect.x,
          top: rect.h * handle.yMul + rect.y
        });
      });
      updateElementRect('top', {
        x: viewPortRect.x,
        y: viewPortRect.y,
        w: viewPortRect.w,
        h: rect.y - viewPortRect.y
      });
      updateElementRect('right', {
        x: rect.x + rect.w,
        y: rect.y,
        w: viewPortRect.w - rect.x - rect.w + viewPortRect.x,
        h: rect.h
      });
      updateElementRect('bottom', {
        x: viewPortRect.x,
        y: rect.y + rect.h,
        w: viewPortRect.w,
        h: viewPortRect.h - rect.y - rect.h + viewPortRect.y
      });
      updateElementRect('left', {
        x: viewPortRect.x,
        y: rect.y,
        w: rect.x - viewPortRect.x,
        h: rect.h
      });
      updateElementRect('move', rect);
    }
    function setRect(rect) {
      currentRect = rect;
      repaint(currentRect);
    }
    function setViewPortRect(rect) {
      viewPortRect = rect;
      repaint(currentRect);
    }
    function setInnerRect(rect) {
      setRect(getAbsoluteRect(clampRect, rect));
    }
    function setClampRect(rect) {
      clampRect = rect;
      repaint(currentRect);
    }
    function destroy() {
      global$1.each(dragHelpers, function (helper) {
        helper.destroy();
      });
      dragHelpers = [];
    }
    render();
    instance = global$1.extend({
      toggleVisibility: toggleVisibility,
      setClampRect: setClampRect,
      setRect: setRect,
      getInnerRect: getInnerRect,
      setInnerRect: setInnerRect,
      setViewPortRect: setViewPortRect,
      destroy: destroy
    }, global$9);
    return instance;
  }
  var create$2 = function (settings) {
    var Control = global$6.get('Control');
    var ImagePanel = Control.extend({
      Defaults: { classes: 'imagepanel' },
      selection: function (rect) {
        if (arguments.length) {
          this.state.set('rect', rect);
          return this;
        }
        return this.state.get('rect');
      },
      imageSize: function () {
        var viewRect = this.state.get('viewRect');
        return {
          w: viewRect.w,
          h: viewRect.h
        };
      },
      toggleCropRect: function (state) {
        this.state.set('cropEnabled', state);
      },
      imageSrc: function (url) {
        var self$$1 = this, img = new Image();
        img.src = url;
        $_4u6vvleojkmcwow0.loadImage(img).then(function () {
          var rect, $img;
          var lastRect = self$$1.state.get('viewRect');
          $img = self$$1.$el.find('img');
          if ($img[0]) {
            $img.replaceWith(img);
          } else {
            var bg = document.createElement('div');
            bg.className = 'mce-imagepanel-bg';
            self$$1.getEl().appendChild(bg);
            self$$1.getEl().appendChild(img);
          }
          rect = {
            x: 0,
            y: 0,
            w: img.naturalWidth,
            h: img.naturalHeight
          };
          self$$1.state.set('viewRect', rect);
          self$$1.state.set('rect', global$7.inflate(rect, -20, -20));
          if (!lastRect || lastRect.w !== rect.w || lastRect.h !== rect.h) {
            self$$1.zoomFit();
          }
          self$$1.repaintImage();
          self$$1.fire('load');
        });
      },
      zoom: function (value) {
        if (arguments.length) {
          this.state.set('zoom', value);
          return this;
        }
        return this.state.get('zoom');
      },
      postRender: function () {
        this.imageSrc(this.settings.imageSrc);
        return this._super();
      },
      zoomFit: function () {
        var self$$1 = this;
        var $img, pw, ph, w, h, zoom, padding;
        padding = 10;
        $img = self$$1.$el.find('img');
        pw = self$$1.getEl().clientWidth;
        ph = self$$1.getEl().clientHeight;
        w = $img[0].naturalWidth;
        h = $img[0].naturalHeight;
        zoom = Math.min((pw - padding) / w, (ph - padding) / h);
        if (zoom >= 1) {
          zoom = 1;
        }
        self$$1.zoom(zoom);
      },
      repaintImage: function () {
        var x, y, w, h, pw, ph, $img, $bg, zoom, rect, elm;
        elm = this.getEl();
        zoom = this.zoom();
        rect = this.state.get('rect');
        $img = this.$el.find('img');
        $bg = this.$el.find('.mce-imagepanel-bg');
        pw = elm.offsetWidth;
        ph = elm.offsetHeight;
        w = $img[0].naturalWidth * zoom;
        h = $img[0].naturalHeight * zoom;
        x = Math.max(0, pw / 2 - w / 2);
        y = Math.max(0, ph / 2 - h / 2);
        $img.css({
          left: x,
          top: y,
          width: w,
          height: h
        });
        $bg.css({
          left: x,
          top: y,
          width: w,
          height: h
        });
        if (this.cropRect) {
          this.cropRect.setRect({
            x: rect.x * zoom + x,
            y: rect.y * zoom + y,
            w: rect.w * zoom,
            h: rect.h * zoom
          });
          this.cropRect.setClampRect({
            x: x,
            y: y,
            w: w,
            h: h
          });
          this.cropRect.setViewPortRect({
            x: 0,
            y: 0,
            w: pw,
            h: ph
          });
        }
      },
      bindStates: function () {
        var self$$1 = this;
        function setupCropRect(rect) {
          self$$1.cropRect = CropRect(rect, self$$1.state.get('viewRect'), self$$1.state.get('viewRect'), self$$1.getEl(), function () {
            self$$1.fire('crop');
          });
          self$$1.cropRect.on('updateRect', function (e) {
            var rect = e.rect;
            var zoom = self$$1.zoom();
            rect = {
              x: Math.round(rect.x / zoom),
              y: Math.round(rect.y / zoom),
              w: Math.round(rect.w / zoom),
              h: Math.round(rect.h / zoom)
            };
            self$$1.state.set('rect', rect);
          });
          self$$1.on('remove', self$$1.cropRect.destroy);
        }
        self$$1.state.on('change:cropEnabled', function (e) {
          self$$1.cropRect.toggleVisibility(e.value);
          self$$1.repaintImage();
        });
        self$$1.state.on('change:zoom', function () {
          self$$1.repaintImage();
        });
        self$$1.state.on('change:rect', function (e) {
          var rect = e.value;
          if (!self$$1.cropRect) {
            setupCropRect(rect);
          }
          self$$1.cropRect.setRect(rect);
        });
      }
    });
    return new ImagePanel(settings);
  };
  var $_ddvcp3emjkmcwovv = { create: create$2 };
  function createState(blob) {
    return {
      blob: blob,
      url: $_51cs3oedjkmcwov1.createObjectURL(blob)
    };
  }
  function destroyState(state) {
    if (state) {
      $_51cs3oedjkmcwov1.revokeObjectURL(state.url);
    }
  }
  function destroyStates(states) {
    global$1.each(states, destroyState);
  }
  function open(editor, currentState, resolve, reject) {
    var win, undoStack = UndoStack(), mainPanel, filtersPanel, tempState, cropPanel, resizePanel, flipRotatePanel, imagePanel, sidePanel, mainViewContainer, invertPanel, brightnessPanel, huePanel, saturatePanel, contrastPanel, grayscalePanel, sepiaPanel, colorizePanel, sharpenPanel, embossPanel, gammaPanel, exposurePanel, panels, width, height, ratioW, ratioH;
    var reverseIfRtl = function (items) {
      return editor.rtl ? items.reverse() : items;
    };
    function recalcSize(e) {
      var widthCtrl, heightCtrl, newWidth, newHeight;
      widthCtrl = win.find('#w')[0];
      heightCtrl = win.find('#h')[0];
      newWidth = parseInt(widthCtrl.value(), 10);
      newHeight = parseInt(heightCtrl.value(), 10);
      if (win.find('#constrain')[0].checked() && width && height && newWidth && newHeight) {
        if (e.control.settings.name === 'w') {
          newHeight = Math.round(newWidth * ratioW);
          heightCtrl.value(newHeight);
        } else {
          newWidth = Math.round(newHeight * ratioH);
          widthCtrl.value(newWidth);
        }
      }
      width = newWidth;
      height = newHeight;
    }
    function floatToPercent(value) {
      return Math.round(value * 100) + '%';
    }
    function updateButtonUndoStates() {
      win.find('#undo').disabled(!undoStack.canUndo());
      win.find('#redo').disabled(!undoStack.canRedo());
      win.statusbar.find('#save').disabled(!undoStack.canUndo());
    }
    function disableUndoRedo() {
      win.find('#undo').disabled(true);
      win.find('#redo').disabled(true);
    }
    function displayState(state) {
      if (state) {
        imagePanel.imageSrc(state.url);
      }
    }
    function switchPanel(targetPanel) {
      return function () {
        var hidePanels = global$1.grep(panels, function (panel) {
          return panel.settings.name !== targetPanel;
        });
        global$1.each(hidePanels, function (panel) {
          panel.hide();
        });
        targetPanel.show();
        targetPanel.focus();
      };
    }
    function addTempState(blob) {
      tempState = createState(blob);
      displayState(tempState);
    }
    function addBlobState(blob) {
      currentState = createState(blob);
      displayState(currentState);
      destroyStates(undoStack.add(currentState).removed);
      updateButtonUndoStates();
    }
    function crop() {
      var rect = imagePanel.selection();
      $_5w2bq6ecjkmcwov0.blobToImageResult(currentState.blob).then(function (ir) {
        $_5tl1cxe3jkmcwotr.crop(ir, rect.x, rect.y, rect.w, rect.h).then(imageResultToBlob).then(function (blob) {
          addBlobState(blob);
          cancel();
        });
      });
    }
    var tempAction = function (fn) {
      var args = [].slice.call(arguments, 1);
      return function () {
        var state = tempState || currentState;
        $_5w2bq6ecjkmcwov0.blobToImageResult(state.blob).then(function (ir) {
          fn.apply(this, [ir].concat(args)).then(imageResultToBlob).then(addTempState);
        });
      };
    };
    function action(fn) {
      var arg = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
      }
      var args = [].slice.call(arguments, 1);
      return function () {
        $_5w2bq6ecjkmcwov0.blobToImageResult(currentState.blob).then(function (ir) {
          fn.apply(this, [ir].concat(args)).then(imageResultToBlob).then(addBlobState);
        });
      };
    }
    function cancel() {
      displayState(currentState);
      destroyState(tempState);
      switchPanel(mainPanel)();
      updateButtonUndoStates();
    }
    function waitForTempState(times, applyCall) {
      if (tempState) {
        applyCall();
      } else {
        setTimeout(function () {
          if (times-- > 0) {
            waitForTempState(times, applyCall);
          } else {
            editor.windowManager.alert('Error: failed to apply image operation.');
          }
        }, 10);
      }
    }
    function applyTempState() {
      if (tempState) {
        addBlobState(tempState.blob);
        cancel();
      } else {
        waitForTempState(100, applyTempState);
      }
    }
    function zoomIn() {
      var zoom = imagePanel.zoom();
      if (zoom < 2) {
        zoom += 0.1;
      }
      imagePanel.zoom(zoom);
    }
    function zoomOut() {
      var zoom = imagePanel.zoom();
      if (zoom > 0.1) {
        zoom -= 0.1;
      }
      imagePanel.zoom(zoom);
    }
    function undo() {
      currentState = undoStack.undo();
      displayState(currentState);
      updateButtonUndoStates();
    }
    function redo() {
      currentState = undoStack.redo();
      displayState(currentState);
      updateButtonUndoStates();
    }
    function save() {
      resolve(currentState.blob);
      win.close();
    }
    function createPanel(items) {
      return global$6.create('Form', {
        layout: 'flex',
        direction: 'row',
        labelGap: 5,
        border: '0 0 1 0',
        align: 'center',
        pack: 'center',
        padding: '0 10 0 10',
        spacing: 5,
        flex: 0,
        minHeight: 60,
        defaults: {
          classes: 'imagetool',
          type: 'button'
        },
        items: items
      });
    }
    var imageResultToBlob = function (ir) {
      return ir.toBlob();
    };
    function createFilterPanel(title, filter) {
      return createPanel(reverseIfRtl([
        {
          text: 'Back',
          onclick: cancel
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          text: 'Apply',
          subtype: 'primary',
          onclick: applyTempState
        }
      ])).hide().on('show', function () {
        disableUndoRedo();
        $_5w2bq6ecjkmcwov0.blobToImageResult(currentState.blob).then(function (ir) {
          return filter(ir);
        }).then(imageResultToBlob).then(function (blob) {
          var newTempState = createState(blob);
          displayState(newTempState);
          destroyState(tempState);
          tempState = newTempState;
        });
      });
    }
    function createVariableFilterPanel(title, filter, value, min, max) {
      function update(value) {
        $_5w2bq6ecjkmcwov0.blobToImageResult(currentState.blob).then(function (ir) {
          return filter(ir, value);
        }).then(imageResultToBlob).then(function (blob) {
          var newTempState = createState(blob);
          displayState(newTempState);
          destroyState(tempState);
          tempState = newTempState;
        });
      }
      return createPanel(reverseIfRtl([
        {
          text: 'Back',
          onclick: cancel
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          type: 'slider',
          flex: 1,
          ondragend: function (e) {
            update(e.value);
          },
          minValue: editor.rtl ? max : min,
          maxValue: editor.rtl ? min : max,
          value: value,
          previewFilter: floatToPercent
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          text: 'Apply',
          subtype: 'primary',
          onclick: applyTempState
        }
      ])).hide().on('show', function () {
        this.find('slider').value(value);
        disableUndoRedo();
      });
    }
    function createRgbFilterPanel(title, filter) {
      function update() {
        var r, g, b;
        r = win.find('#r')[0].value();
        g = win.find('#g')[0].value();
        b = win.find('#b')[0].value();
        $_5w2bq6ecjkmcwov0.blobToImageResult(currentState.blob).then(function (ir) {
          return filter(ir, r, g, b);
        }).then(imageResultToBlob).then(function (blob) {
          var newTempState = createState(blob);
          displayState(newTempState);
          destroyState(tempState);
          tempState = newTempState;
        });
      }
      var min = editor.rtl ? 2 : 0;
      var max = editor.rtl ? 0 : 2;
      return createPanel(reverseIfRtl([
        {
          text: 'Back',
          onclick: cancel
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          type: 'slider',
          label: 'R',
          name: 'r',
          minValue: min,
          value: 1,
          maxValue: max,
          ondragend: update,
          previewFilter: floatToPercent
        },
        {
          type: 'slider',
          label: 'G',
          name: 'g',
          minValue: min,
          value: 1,
          maxValue: max,
          ondragend: update,
          previewFilter: floatToPercent
        },
        {
          type: 'slider',
          label: 'B',
          name: 'b',
          minValue: min,
          value: 1,
          maxValue: max,
          ondragend: update,
          previewFilter: floatToPercent
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          text: 'Apply',
          subtype: 'primary',
          onclick: applyTempState
        }
      ])).hide().on('show', function () {
        win.find('#r,#g,#b').value(1);
        disableUndoRedo();
      });
    }
    cropPanel = createPanel(reverseIfRtl([
      {
        text: 'Back',
        onclick: cancel
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'Apply',
        subtype: 'primary',
        onclick: crop
      }
    ])).hide().on('show hide', function (e) {
      imagePanel.toggleCropRect(e.type === 'show');
    }).on('show', disableUndoRedo);
    function toggleConstrain(e) {
      if (e.control.value() === true) {
        ratioW = height / width;
        ratioH = width / height;
      }
    }
    resizePanel = createPanel(reverseIfRtl([
      {
        text: 'Back',
        onclick: cancel
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        type: 'textbox',
        name: 'w',
        label: 'Width',
        size: 4,
        onkeyup: recalcSize
      },
      {
        type: 'textbox',
        name: 'h',
        label: 'Height',
        size: 4,
        onkeyup: recalcSize
      },
      {
        type: 'checkbox',
        name: 'constrain',
        text: 'Constrain proportions',
        checked: true,
        onchange: toggleConstrain
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'Apply',
        subtype: 'primary',
        onclick: 'submit'
      }
    ])).hide().on('submit', function (e) {
      var width = parseInt(win.find('#w').value(), 10), height = parseInt(win.find('#h').value(), 10);
      e.preventDefault();
      action($_5tl1cxe3jkmcwotr.resize, width, height)();
      cancel();
    }).on('show', disableUndoRedo);
    flipRotatePanel = createPanel(reverseIfRtl([
      {
        text: 'Back',
        onclick: cancel
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        icon: 'fliph',
        tooltip: 'Flip horizontally',
        onclick: tempAction($_5tl1cxe3jkmcwotr.flip, 'h')
      },
      {
        icon: 'flipv',
        tooltip: 'Flip vertically',
        onclick: tempAction($_5tl1cxe3jkmcwotr.flip, 'v')
      },
      {
        icon: 'rotateleft',
        tooltip: 'Rotate counterclockwise',
        onclick: tempAction($_5tl1cxe3jkmcwotr.rotate, -90)
      },
      {
        icon: 'rotateright',
        tooltip: 'Rotate clockwise',
        onclick: tempAction($_5tl1cxe3jkmcwotr.rotate, 90)
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'Apply',
        subtype: 'primary',
        onclick: applyTempState
      }
    ])).hide().on('show', disableUndoRedo);
    invertPanel = createFilterPanel('Invert', $_5tl1cxe3jkmcwotr.invert);
    sharpenPanel = createFilterPanel('Sharpen', $_5tl1cxe3jkmcwotr.sharpen);
    embossPanel = createFilterPanel('Emboss', $_5tl1cxe3jkmcwotr.emboss);
    brightnessPanel = createVariableFilterPanel('Brightness', $_5tl1cxe3jkmcwotr.brightness, 0, -1, 1);
    huePanel = createVariableFilterPanel('Hue', $_5tl1cxe3jkmcwotr.hue, 180, 0, 360);
    saturatePanel = createVariableFilterPanel('Saturate', $_5tl1cxe3jkmcwotr.saturate, 0, -1, 1);
    contrastPanel = createVariableFilterPanel('Contrast', $_5tl1cxe3jkmcwotr.contrast, 0, -1, 1);
    grayscalePanel = createVariableFilterPanel('Grayscale', $_5tl1cxe3jkmcwotr.grayscale, 0, 0, 1);
    sepiaPanel = createVariableFilterPanel('Sepia', $_5tl1cxe3jkmcwotr.sepia, 0, 0, 1);
    colorizePanel = createRgbFilterPanel('Colorize', $_5tl1cxe3jkmcwotr.colorize);
    gammaPanel = createVariableFilterPanel('Gamma', $_5tl1cxe3jkmcwotr.gamma, 0, -1, 1);
    exposurePanel = createVariableFilterPanel('Exposure', $_5tl1cxe3jkmcwotr.exposure, 1, 0, 2);
    filtersPanel = createPanel(reverseIfRtl([
      {
        text: 'Back',
        onclick: cancel
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'hue',
        icon: 'hue',
        onclick: switchPanel(huePanel)
      },
      {
        text: 'saturate',
        icon: 'saturate',
        onclick: switchPanel(saturatePanel)
      },
      {
        text: 'sepia',
        icon: 'sepia',
        onclick: switchPanel(sepiaPanel)
      },
      {
        text: 'emboss',
        icon: 'emboss',
        onclick: switchPanel(embossPanel)
      },
      {
        text: 'exposure',
        icon: 'exposure',
        onclick: switchPanel(exposurePanel)
      },
      {
        type: 'spacer',
        flex: 1
      }
    ])).hide();
    mainPanel = createPanel(reverseIfRtl([
      {
        tooltip: 'Crop',
        icon: 'crop',
        onclick: switchPanel(cropPanel)
      },
      {
        tooltip: 'Resize',
        icon: 'resize2',
        onclick: switchPanel(resizePanel)
      },
      {
        tooltip: 'Orientation',
        icon: 'orientation',
        onclick: switchPanel(flipRotatePanel)
      },
      {
        tooltip: 'Brightness',
        icon: 'sun',
        onclick: switchPanel(brightnessPanel)
      },
      {
        tooltip: 'Sharpen',
        icon: 'sharpen',
        onclick: switchPanel(sharpenPanel)
      },
      {
        tooltip: 'Contrast',
        icon: 'contrast',
        onclick: switchPanel(contrastPanel)
      },
      {
        tooltip: 'Color levels',
        icon: 'drop',
        onclick: switchPanel(colorizePanel)
      },
      {
        tooltip: 'Gamma',
        icon: 'gamma',
        onclick: switchPanel(gammaPanel)
      },
      {
        tooltip: 'Invert',
        icon: 'invert',
        onclick: switchPanel(invertPanel)
      }
    ]));
    imagePanel = $_ddvcp3emjkmcwovv.create({
      flex: 1,
      imageSrc: currentState.url
    });
    sidePanel = global$6.create('Container', {
      layout: 'flex',
      direction: 'column',
      pack: 'start',
      border: '0 1 0 0',
      padding: 5,
      spacing: 5,
      items: [
        {
          type: 'button',
          icon: 'undo',
          tooltip: 'Undo',
          name: 'undo',
          onclick: undo
        },
        {
          type: 'button',
          icon: 'redo',
          tooltip: 'Redo',
          name: 'redo',
          onclick: redo
        },
        {
          type: 'button',
          icon: 'zoomin',
          tooltip: 'Zoom in',
          onclick: zoomIn
        },
        {
          type: 'button',
          icon: 'zoomout',
          tooltip: 'Zoom out',
          onclick: zoomOut
        }
      ]
    });
    mainViewContainer = global$6.create('Container', {
      type: 'container',
      layout: 'flex',
      direction: 'row',
      align: 'stretch',
      flex: 1,
      items: reverseIfRtl([
        sidePanel,
        imagePanel
      ])
    });
    panels = [
      mainPanel,
      cropPanel,
      resizePanel,
      flipRotatePanel,
      filtersPanel,
      invertPanel,
      brightnessPanel,
      huePanel,
      saturatePanel,
      contrastPanel,
      grayscalePanel,
      sepiaPanel,
      colorizePanel,
      sharpenPanel,
      embossPanel,
      gammaPanel,
      exposurePanel
    ];
    win = editor.windowManager.open({
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      minWidth: Math.min(global$5.DOM.getViewPort().w, 800),
      minHeight: Math.min(global$5.DOM.getViewPort().h, 650),
      title: 'Edit image',
      items: panels.concat([mainViewContainer]),
      buttons: reverseIfRtl([
        {
          text: 'Save',
          name: 'save',
          subtype: 'primary',
          onclick: save
        },
        {
          text: 'Cancel',
          onclick: 'close'
        }
      ])
    });
    win.on('close', function () {
      reject();
      destroyStates(undoStack.data);
      undoStack = null;
      tempState = null;
    });
    undoStack.add(currentState);
    updateButtonUndoStates();
    imagePanel.on('load', function () {
      width = imagePanel.imageSize().w;
      height = imagePanel.imageSize().h;
      ratioW = height / width;
      ratioH = width / height;
      win.find('#w').value(width);
      win.find('#h').value(height);
    });
    imagePanel.on('crop', crop);
  }
  function edit(editor, imageResult) {
    return new global$3(function (resolve, reject) {
      return imageResult.toBlob().then(function (blob) {
        open(editor, createState(blob), resolve, reject);
      });
    });
  }
  var $_9hzraheijkmcwovc = { edit: edit };
  function getImageSize(img) {
    var width, height;
    function isPxValue(value) {
      return /^[0-9\.]+px$/.test(value);
    }
    width = img.style.width;
    height = img.style.height;
    if (width || height) {
      if (isPxValue(width) && isPxValue(height)) {
        return {
          w: parseInt(width, 10),
          h: parseInt(height, 10)
        };
      }
      return null;
    }
    width = img.width;
    height = img.height;
    if (width && height) {
      return {
        w: parseInt(width, 10),
        h: parseInt(height, 10)
      };
    }
    return null;
  }
  function setImageSize(img, size) {
    var width, height;
    if (size) {
      width = img.style.width;
      height = img.style.height;
      if (width || height) {
        img.style.width = size.w + 'px';
        img.style.height = size.h + 'px';
        img.removeAttribute('data-mce-style');
      }
      width = img.width;
      height = img.height;
      if (width || height) {
        img.setAttribute('width', size.w);
        img.setAttribute('height', size.h);
      }
    }
  }
  function getNaturalImageSize(img) {
    return {
      w: img.naturalWidth,
      h: img.naturalHeight
    };
  }
  var $_9virabeujkmcwowu = {
    getImageSize: getImageSize,
    setImageSize: setImageSize,
    getNaturalImageSize: getNaturalImageSize
  };
  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var isFunction = isType('function');
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var slice = Array.prototype.slice;
  var from$1 = isFunction(Array.from) ? Array.from : function (x) {
    return slice.call(x);
  };
  function XMLHttpRequest$1 () {
    var f = $_901qfodxjkmcwotj.getOrDie('XMLHttpRequest');
    return new f();
  }
  var isValue = function (obj) {
    return obj !== null && obj !== undefined;
  };
  var traverse = function (json, path) {
    var value;
    value = path.reduce(function (result, key) {
      return isValue(result) ? result[key] : undefined;
    }, json);
    return isValue(value) ? value : null;
  };
  var requestUrlAsBlob = function (url, headers, withCredentials) {
    return new global$3(function (resolve) {
      var xhr;
      xhr = new XMLHttpRequest$1();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          resolve({
            status: xhr.status,
            blob: this.response
          });
        }
      };
      xhr.open('GET', url, true);
      xhr.withCredentials = withCredentials;
      global$1.each(headers, function (value, key) {
        xhr.setRequestHeader(key, value);
      });
      xhr.responseType = 'blob';
      xhr.send();
    });
  };
  var readBlob = function (blob) {
    return new global$3(function (resolve) {
      var fr = new FileReader();
      fr.onload = function (e) {
        var data = e.target;
        resolve(data.result);
      };
      fr.readAsText(blob);
    });
  };
  var parseJson = function (text) {
    var json;
    try {
      json = JSON.parse(text);
    } catch (ex) {
    }
    return json;
  };
  var $_5nd4noezjkmcwoxi = {
    traverse: traverse,
    readBlob: readBlob,
    requestUrlAsBlob: requestUrlAsBlob,
    parseJson: parseJson
  };
  var friendlyHttpErrors = [
    {
      code: 404,
      message: 'Could not find Image Proxy'
    },
    {
      code: 403,
      message: 'Rejected request'
    },
    {
      code: 0,
      message: 'Incorrect Image Proxy URL'
    }
  ];
  var friendlyServiceErrors = [
    {
      type: 'key_missing',
      message: 'The request did not include an api key.'
    },
    {
      type: 'key_not_found',
      message: 'The provided api key could not be found.'
    },
    {
      type: 'domain_not_trusted',
      message: 'The api key is not valid for the request origins.'
    }
  ];
  var isServiceErrorCode = function (code) {
    return code === 400 || code === 403 || code === 500;
  };
  var getHttpErrorMsg = function (status) {
    var message = find(friendlyHttpErrors, function (error) {
      return status === error.code;
    }).fold(constant('Unknown ImageProxy error'), function (error) {
      return error.message;
    });
    return 'ImageProxy HTTP error: ' + message;
  };
  var handleHttpError = function (status) {
    var message = getHttpErrorMsg(status);
    return global$3.reject(message);
  };
  var getServiceErrorMsg = function (type) {
    return find(friendlyServiceErrors, function (error) {
      return error.type === type;
    }).fold(constant('Unknown service error'), function (error) {
      return error.message;
    });
  };
  var getServiceError = function (text) {
    var serviceError = $_5nd4noezjkmcwoxi.parseJson(text);
    var errorType = $_5nd4noezjkmcwoxi.traverse(serviceError, [
      'error',
      'type'
    ]);
    var errorMsg = errorType ? getServiceErrorMsg(errorType) : 'Invalid JSON in service error message';
    return 'ImageProxy Service error: ' + errorMsg;
  };
  var handleServiceError = function (status, blob) {
    return $_5nd4noezjkmcwoxi.readBlob(blob).then(function (text) {
      var serviceError = getServiceError(text);
      return global$3.reject(serviceError);
    });
  };
  var handleServiceErrorResponse = function (status, blob) {
    return isServiceErrorCode(status) ? handleServiceError(status, blob) : handleHttpError(status);
  };
  var $_5v7jv3ewjkmcwox0 = {
    handleServiceErrorResponse: handleServiceErrorResponse,
    handleHttpError: handleHttpError,
    getHttpErrorMsg: getHttpErrorMsg,
    getServiceErrorMsg: getServiceErrorMsg
  };
  var appendApiKey = function (url, apiKey) {
    var separator = url.indexOf('?') === -1 ? '?' : '&';
    if (/[?&]apiKey=/.test(url) || !apiKey) {
      return url;
    } else {
      return url + separator + 'apiKey=' + encodeURIComponent(apiKey);
    }
  };
  var requestServiceBlob = function (url, apiKey) {
    var headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'tiny-api-key': apiKey
    };
    return $_5nd4noezjkmcwoxi.requestUrlAsBlob(appendApiKey(url, apiKey), headers, false).then(function (result) {
      return result.status < 200 || result.status >= 300 ? $_5v7jv3ewjkmcwox0.handleServiceErrorResponse(result.status, result.blob) : global$3.resolve(result.blob);
    });
  };
  function requestBlob(url, withCredentials) {
    return $_5nd4noezjkmcwoxi.requestUrlAsBlob(url, {}, withCredentials).then(function (result) {
      return result.status < 200 || result.status >= 300 ? $_5v7jv3ewjkmcwox0.handleHttpError(result.status) : global$3.resolve(result.blob);
    });
  }
  var getUrl = function (url, apiKey, withCredentials) {
    return apiKey ? requestServiceBlob(url, apiKey) : requestBlob(url, withCredentials);
  };
  var $_5vq7sbevjkmcwowx = { getUrl: getUrl };
  var count$1 = 0;
  var isEditableImage = function (editor, img) {
    var selectorMatched = editor.dom.is(img, 'img:not([data-mce-object],[data-mce-placeholder])');
    return selectorMatched && (isLocalImage(editor, img) || isCorsImage(editor, img) || editor.settings.imagetools_proxy);
  };
  var displayError = function (editor, error) {
    editor.notificationManager.open({
      text: error,
      type: 'error'
    });
  };
  var getSelectedImage = function (editor) {
    return editor.selection.getNode();
  };
  var extractFilename = function (editor, url) {
    var m = url.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i);
    if (m) {
      return editor.dom.encode(m[1]);
    }
    return null;
  };
  var createId = function () {
    return 'imagetools' + count$1++;
  };
  var isLocalImage = function (editor, img) {
    var url = img.src;
    return url.indexOf('data:') === 0 || url.indexOf('blob:') === 0 || new global$4(url).host === editor.documentBaseURI.host;
  };
  var isCorsImage = function (editor, img) {
    return global$1.inArray(getCorsHosts(editor), new global$4(img.src).host) !== -1;
  };
  var isCorsWithCredentialsImage = function (editor, img) {
    return global$1.inArray(getCredentialsHosts(editor), new global$4(img.src).host) !== -1;
  };
  var imageToBlob$2 = function (editor, img) {
    var src = img.src, apiKey;
    if (isCorsImage(editor, img)) {
      return $_5vq7sbevjkmcwowx.getUrl(img.src, null, isCorsWithCredentialsImage(editor, img));
    }
    if (!isLocalImage(editor, img)) {
      src = getProxyUrl(editor);
      src += (src.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(img.src);
      apiKey = getApiKey(editor);
      return $_5vq7sbevjkmcwowx.getUrl(src, apiKey, false);
    }
    return $_l0c0gdpjkmcwosd.imageToBlob(img);
  };
  var findSelectedBlob = function (editor) {
    var blobInfo;
    blobInfo = editor.editorUpload.blobCache.getByUri(getSelectedImage(editor).src);
    if (blobInfo) {
      return global$3.resolve(blobInfo.blob());
    }
    return imageToBlob$2(editor, getSelectedImage(editor));
  };
  var startTimedUpload = function (editor, imageUploadTimerState) {
    var imageUploadTimer = global$2.setEditorTimeout(editor, function () {
      editor.editorUpload.uploadImagesAuto();
    }, getUploadTimeout(editor));
    imageUploadTimerState.set(imageUploadTimer);
  };
  var cancelTimedUpload = function (imageUploadTimerState) {
    clearTimeout(imageUploadTimerState.get());
  };
  var updateSelectedImage = function (editor, ir, uploadImmediately, imageUploadTimerState, size) {
    return ir.toBlob().then(function (blob) {
      var uri, name, blobCache, blobInfo, selectedImage;
      blobCache = editor.editorUpload.blobCache;
      selectedImage = getSelectedImage(editor);
      uri = selectedImage.src;
      if (shouldReuseFilename(editor)) {
        blobInfo = blobCache.getByUri(uri);
        if (blobInfo) {
          uri = blobInfo.uri();
          name = blobInfo.name();
        } else {
          name = extractFilename(editor, uri);
        }
      }
      blobInfo = blobCache.create({
        id: createId(),
        blob: blob,
        base64: ir.toBase64(),
        uri: uri,
        name: name
      });
      blobCache.add(blobInfo);
      editor.undoManager.transact(function () {
        function imageLoadedHandler() {
          editor.$(selectedImage).off('load', imageLoadedHandler);
          editor.nodeChanged();
          if (uploadImmediately) {
            editor.editorUpload.uploadImagesAuto();
          } else {
            cancelTimedUpload(imageUploadTimerState);
            startTimedUpload(editor, imageUploadTimerState);
          }
        }
        editor.$(selectedImage).on('load', imageLoadedHandler);
        if (size) {
          editor.$(selectedImage).attr({
            width: size.w,
            height: size.h
          });
        }
        editor.$(selectedImage).attr({ src: blobInfo.blobUri() }).removeAttr('data-mce-src');
      });
      return blobInfo;
    });
  };
  var selectedImageOperation = function (editor, imageUploadTimerState, fn, size) {
    return function () {
      return editor._scanForImages().then(curry(findSelectedBlob, editor)).then($_5w2bq6ecjkmcwov0.blobToImageResult).then(fn).then(function (imageResult) {
        return updateSelectedImage(editor, imageResult, false, imageUploadTimerState, size);
      }, function (error) {
        displayError(editor, error);
      });
    };
  };
  var rotate$2 = function (editor, imageUploadTimerState, angle) {
    return function () {
      var size = $_9virabeujkmcwowu.getImageSize(getSelectedImage(editor));
      var flippedSize = size ? {
        w: size.h,
        h: size.w
      } : null;
      return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
        return $_5tl1cxe3jkmcwotr.rotate(imageResult, angle);
      }, flippedSize)();
    };
  };
  var flip$2 = function (editor, imageUploadTimerState, axis) {
    return function () {
      return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
        return $_5tl1cxe3jkmcwotr.flip(imageResult, axis);
      })();
    };
  };
  var editImageDialog = function (editor, imageUploadTimerState) {
    return function () {
      var img = getSelectedImage(editor), originalSize = $_9virabeujkmcwowu.getNaturalImageSize(img);
      var handleDialogBlob = function (blob) {
        return new global$3(function (resolve) {
          $_l0c0gdpjkmcwosd.blobToImage(blob).then(function (newImage) {
            var newSize = $_9virabeujkmcwowu.getNaturalImageSize(newImage);
            if (originalSize.w !== newSize.w || originalSize.h !== newSize.h) {
              if ($_9virabeujkmcwowu.getImageSize(img)) {
                $_9virabeujkmcwowu.setImageSize(img, newSize);
              }
            }
            $_51cs3oedjkmcwov1.revokeObjectURL(newImage.src);
            resolve(blob);
          });
        });
      };
      var openDialog = function (editor, imageResult) {
        return $_9hzraheijkmcwovc.edit(editor, imageResult).then(handleDialogBlob).then($_5w2bq6ecjkmcwov0.blobToImageResult).then(function (imageResult) {
          return updateSelectedImage(editor, imageResult, true, imageUploadTimerState);
        }, function () {
        });
      };
      findSelectedBlob(editor).then($_5w2bq6ecjkmcwov0.blobToImageResult).then(curry(openDialog, editor), function (error) {
        displayError(editor, error);
      });
    };
  };
  var $_adcl7edojkmcwory = {
    rotate: rotate$2,
    flip: flip$2,
    editImageDialog: editImageDialog,
    isEditableImage: isEditableImage,
    cancelTimedUpload: cancelTimedUpload
  };
  var register = function (editor, imageUploadTimerState) {
    global$1.each({
      mceImageRotateLeft: $_adcl7edojkmcwory.rotate(editor, imageUploadTimerState, -90),
      mceImageRotateRight: $_adcl7edojkmcwory.rotate(editor, imageUploadTimerState, 90),
      mceImageFlipVertical: $_adcl7edojkmcwory.flip(editor, imageUploadTimerState, 'v'),
      mceImageFlipHorizontal: $_adcl7edojkmcwory.flip(editor, imageUploadTimerState, 'h'),
      mceEditImage: $_adcl7edojkmcwory.editImageDialog(editor, imageUploadTimerState)
    }, function (fn, cmd) {
      editor.addCommand(cmd, fn);
    });
  };
  var $_7980p6dmjkmcworv = { register: register };
  var setup = function (editor, imageUploadTimerState, lastSelectedImageState) {
    editor.on('NodeChange', function (e) {
      var lastSelectedImage = lastSelectedImageState.get();
      if (lastSelectedImage && lastSelectedImage.src !== e.element.src) {
        $_adcl7edojkmcwory.cancelTimedUpload(imageUploadTimerState);
        editor.editorUpload.uploadImagesAuto();
        lastSelectedImageState.set(null);
      }
      if ($_adcl7edojkmcwory.isEditableImage(editor, e.element)) {
        lastSelectedImageState.set(e.element);
      }
    });
  };
  var $_8wbpbqf1jkmcwoxo = { setup: setup };
  var register$1 = function (editor) {
    editor.addButton('rotateleft', {
      title: 'Rotate counterclockwise',
      cmd: 'mceImageRotateLeft'
    });
    editor.addButton('rotateright', {
      title: 'Rotate clockwise',
      cmd: 'mceImageRotateRight'
    });
    editor.addButton('flipv', {
      title: 'Flip vertically',
      cmd: 'mceImageFlipVertical'
    });
    editor.addButton('fliph', {
      title: 'Flip horizontally',
      cmd: 'mceImageFlipHorizontal'
    });
    editor.addButton('editimage', {
      title: 'Edit image',
      cmd: 'mceEditImage'
    });
    editor.addButton('imageoptions', {
      title: 'Image options',
      icon: 'options',
      cmd: 'mceImage'
    });
  };
  var $_4fpq1yf2jkmcwoxp = { register: register$1 };
  var register$2 = function (editor) {
    editor.addContextToolbar(curry($_adcl7edojkmcwory.isEditableImage, editor), getToolbarItems(editor));
  };
  var $_fw0hg1f3jkmcwoxq = { register: register$2 };
  global.add('imagetools', function (editor) {
    var imageUploadTimerState = Cell(0);
    var lastSelectedImageState = Cell(null);
    $_7980p6dmjkmcworv.register(editor, imageUploadTimerState);
    $_4fpq1yf2jkmcwoxp.register(editor);
    $_fw0hg1f3jkmcwoxq.register(editor);
    $_8wbpbqf1jkmcwoxo.setup(editor, imageUploadTimerState, lastSelectedImageState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var insertdatetime = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var getDateFormat = function (editor) {
    return editor.getParam('insertdatetime_dateformat', editor.translate('%Y-%m-%d'));
  };
  var getTimeFormat = function (editor) {
    return editor.getParam('insertdatetime_timeformat', editor.translate('%H:%M:%S'));
  };
  var getFormats = function (editor) {
    return editor.getParam('insertdatetime_formats', [
      '%H:%M:%S',
      '%Y-%m-%d',
      '%I:%M:%S %p',
      '%D'
    ]);
  };
  var getDefaultDateTime = function (editor) {
    var formats = getFormats(editor);
    return formats.length > 0 ? formats[0] : getTimeFormat(editor);
  };
  var shouldInsertTimeElement = function (editor) {
    return editor.getParam('insertdatetime_element', false);
  };
  var $_eftmuxfhjkmcwp76 = {
    getDateFormat: getDateFormat,
    getTimeFormat: getTimeFormat,
    getFormats: getFormats,
    getDefaultDateTime: getDefaultDateTime,
    shouldInsertTimeElement: shouldInsertTimeElement
  };
  var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
  var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
  var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  var monthsLong = 'January February March April May June July August September October November December'.split(' ');
  var addZeros = function (value, len) {
    value = '' + value;
    if (value.length < len) {
      for (var i = 0; i < len - value.length; i++) {
        value = '0' + value;
      }
    }
    return value;
  };
  var getDateTime = function (editor, fmt, date) {
    date = date || new Date();
    fmt = fmt.replace('%D', '%m/%d/%Y');
    fmt = fmt.replace('%r', '%I:%M:%S %p');
    fmt = fmt.replace('%Y', '' + date.getFullYear());
    fmt = fmt.replace('%y', '' + date.getYear());
    fmt = fmt.replace('%m', addZeros(date.getMonth() + 1, 2));
    fmt = fmt.replace('%d', addZeros(date.getDate(), 2));
    fmt = fmt.replace('%H', '' + addZeros(date.getHours(), 2));
    fmt = fmt.replace('%M', '' + addZeros(date.getMinutes(), 2));
    fmt = fmt.replace('%S', '' + addZeros(date.getSeconds(), 2));
    fmt = fmt.replace('%I', '' + ((date.getHours() + 11) % 12 + 1));
    fmt = fmt.replace('%p', '' + (date.getHours() < 12 ? 'AM' : 'PM'));
    fmt = fmt.replace('%B', '' + editor.translate(monthsLong[date.getMonth()]));
    fmt = fmt.replace('%b', '' + editor.translate(monthsShort[date.getMonth()]));
    fmt = fmt.replace('%A', '' + editor.translate(daysLong[date.getDay()]));
    fmt = fmt.replace('%a', '' + editor.translate(daysShort[date.getDay()]));
    fmt = fmt.replace('%%', '%');
    return fmt;
  };
  var updateElement = function (editor, timeElm, computerTime, userTime) {
    var newTimeElm = editor.dom.create('time', { datetime: computerTime }, userTime);
    timeElm.parentNode.insertBefore(newTimeElm, timeElm);
    editor.dom.remove(timeElm);
    editor.selection.select(newTimeElm, true);
    editor.selection.collapse(false);
  };
  var insertDateTime = function (editor, format) {
    if ($_eftmuxfhjkmcwp76.shouldInsertTimeElement(editor)) {
      var userTime = getDateTime(editor, format);
      var computerTime = void 0;
      if (/%[HMSIp]/.test(format)) {
        computerTime = getDateTime(editor, '%Y-%m-%dT%H:%M');
      } else {
        computerTime = getDateTime(editor, '%Y-%m-%d');
      }
      var timeElm = editor.dom.getParent(editor.selection.getStart(), 'time');
      if (timeElm) {
        updateElement(editor, timeElm, computerTime, userTime);
      } else {
        editor.insertContent('<time datetime="' + computerTime + '">' + userTime + '</time>');
      }
    } else {
      editor.insertContent(getDateTime(editor, format));
    }
  };
  var $_ct6nm0fijkmcwp78 = {
    insertDateTime: insertDateTime,
    getDateTime: getDateTime
  };
  var register = function (editor) {
    editor.addCommand('mceInsertDate', function () {
      $_ct6nm0fijkmcwp78.insertDateTime(editor, $_eftmuxfhjkmcwp76.getDateFormat(editor));
    });
    editor.addCommand('mceInsertTime', function () {
      $_ct6nm0fijkmcwp78.insertDateTime(editor, $_eftmuxfhjkmcwp76.getTimeFormat(editor));
    });
  };
  var $_12dg01fgjkmcwp75 = { register: register };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var createMenuItems = function (editor, lastFormatState) {
    var formats = $_eftmuxfhjkmcwp76.getFormats(editor);
    return global$1.map(formats, function (fmt) {
      return {
        text: $_ct6nm0fijkmcwp78.getDateTime(editor, fmt),
        onclick: function () {
          lastFormatState.set(fmt);
          $_ct6nm0fijkmcwp78.insertDateTime(editor, fmt);
        }
      };
    });
  };
  var register$1 = function (editor, lastFormatState) {
    var menuItems = createMenuItems(editor, lastFormatState);
    editor.addButton('insertdatetime', {
      type: 'splitbutton',
      title: 'Insert date/time',
      menu: menuItems,
      onclick: function () {
        var lastFormat = lastFormatState.get();
        $_ct6nm0fijkmcwp78.insertDateTime(editor, lastFormat ? lastFormat : $_eftmuxfhjkmcwp76.getDefaultDateTime(editor));
      }
    });
    editor.addMenuItem('insertdatetime', {
      icon: 'date',
      text: 'Date/time',
      menu: menuItems,
      context: 'insert'
    });
  };
  var $_do8jpwfjjkmcwp7b = { register: register$1 };
  global.add('insertdatetime', function (editor) {
    var lastFormatState = Cell(null);
    $_12dg01fgjkmcwp75.register(editor);
    $_do8jpwfjjkmcwp7b.register(editor, lastFormatState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var link = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var assumeExternalTargets = function (editorSettings) {
    return typeof editorSettings.link_assume_external_targets === 'boolean' ? editorSettings.link_assume_external_targets : false;
  };
  var hasContextToolbar = function (editorSettings) {
    return typeof editorSettings.link_context_toolbar === 'boolean' ? editorSettings.link_context_toolbar : false;
  };
  var getLinkList = function (editorSettings) {
    return editorSettings.link_list;
  };
  var hasDefaultLinkTarget = function (editorSettings) {
    return typeof editorSettings.default_link_target === 'string';
  };
  var getDefaultLinkTarget = function (editorSettings) {
    return editorSettings.default_link_target;
  };
  var getTargetList = function (editorSettings) {
    return editorSettings.target_list;
  };
  var setTargetList = function (editor, list) {
    editor.settings.target_list = list;
  };
  var shouldShowTargetList = function (editorSettings) {
    return getTargetList(editorSettings) !== false;
  };
  var getRelList = function (editorSettings) {
    return editorSettings.rel_list;
  };
  var hasRelList = function (editorSettings) {
    return getRelList(editorSettings) !== undefined;
  };
  var getLinkClassList = function (editorSettings) {
    return editorSettings.link_class_list;
  };
  var hasLinkClassList = function (editorSettings) {
    return getLinkClassList(editorSettings) !== undefined;
  };
  var shouldShowLinkTitle = function (editorSettings) {
    return editorSettings.link_title !== false;
  };
  var allowUnsafeLinkTarget = function (editorSettings) {
    return typeof editorSettings.allow_unsafe_link_target === 'boolean' ? editorSettings.allow_unsafe_link_target : false;
  };
  var $_7h5h1kfvjkmcwp8j = {
    assumeExternalTargets: assumeExternalTargets,
    hasContextToolbar: hasContextToolbar,
    getLinkList: getLinkList,
    hasDefaultLinkTarget: hasDefaultLinkTarget,
    getDefaultLinkTarget: getDefaultLinkTarget,
    getTargetList: getTargetList,
    setTargetList: setTargetList,
    shouldShowTargetList: shouldShowTargetList,
    getRelList: getRelList,
    hasRelList: hasRelList,
    getLinkClassList: getLinkClassList,
    hasLinkClassList: hasLinkClassList,
    shouldShowLinkTitle: shouldShowLinkTitle,
    allowUnsafeLinkTarget: allowUnsafeLinkTarget
  };
  var global$2 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$3 = tinymce.util.Tools.resolve('tinymce.Env');
  var appendClickRemove = function (link, evt) {
    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
  };
  var open$$1 = function (url) {
    if (!global$3.ie || global$3.ie > 10) {
      var link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.rel = 'noreferrer noopener';
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      appendClickRemove(link, evt);
    } else {
      var win = window.open('', '_blank');
      if (win) {
        win.opener = null;
        var doc = win.document;
        doc.open();
        doc.write('<meta http-equiv="refresh" content="0; url=' + global$2.DOM.encode(url) + '">');
        doc.close();
      }
    }
  };
  var $_50rjczfwjkmcwp8l = { open: open$$1 };
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var toggleTargetRules = function (rel, isUnsafe) {
    var rules = ['noopener'];
    var newRel = rel ? rel.split(/\s+/) : [];
    var toString = function (rel) {
      return global$4.trim(rel.sort().join(' '));
    };
    var addTargetRules = function (rel) {
      rel = removeTargetRules(rel);
      return rel.length ? rel.concat(rules) : rules;
    };
    var removeTargetRules = function (rel) {
      return rel.filter(function (val) {
        return global$4.inArray(rules, val) === -1;
      });
    };
    newRel = isUnsafe ? addTargetRules(newRel) : removeTargetRules(newRel);
    return newRel.length ? toString(newRel) : null;
  };
  var trimCaretContainers = function (text) {
    return text.replace(/\uFEFF/g, '');
  };
  var getAnchorElement = function (editor, selectedElm) {
    selectedElm = selectedElm || editor.selection.getNode();
    if (isImageFigure(selectedElm)) {
      return editor.dom.select('a[href]', selectedElm)[0];
    } else {
      return editor.dom.getParent(selectedElm, 'a[href]');
    }
  };
  var getAnchorText = function (selection, anchorElm) {
    var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
    return trimCaretContainers(text);
  };
  var isLink = function (elm) {
    return elm && elm.nodeName === 'A' && elm.href;
  };
  var hasLinks = function (elements) {
    return global$4.grep(elements, isLink).length > 0;
  };
  var isOnlyTextSelected = function (html) {
    if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
      return false;
    }
    return true;
  };
  var isImageFigure = function (node) {
    return node && node.nodeName === 'FIGURE' && /\bimage\b/i.test(node.className);
  };
  var link = function (editor, attachState) {
    return function (data) {
      editor.undoManager.transact(function () {
        var selectedElm = editor.selection.getNode();
        var anchorElm = getAnchorElement(editor, selectedElm);
        var linkAttrs = {
          href: data.href,
          target: data.target ? data.target : null,
          rel: data.rel ? data.rel : null,
          class: data.class ? data.class : null,
          title: data.title ? data.title : null
        };
        if (!$_7h5h1kfvjkmcwp8j.hasRelList(editor.settings) && $_7h5h1kfvjkmcwp8j.allowUnsafeLinkTarget(editor.settings) === false) {
          linkAttrs.rel = toggleTargetRules(linkAttrs.rel, linkAttrs.target === '_blank');
        }
        if (data.href === attachState.href) {
          attachState.attach();
          attachState = {};
        }
        if (anchorElm) {
          editor.focus();
          if (data.hasOwnProperty('text')) {
            if ('innerText' in anchorElm) {
              anchorElm.innerText = data.text;
            } else {
              anchorElm.textContent = data.text;
            }
          }
          editor.dom.setAttribs(anchorElm, linkAttrs);
          editor.selection.select(anchorElm);
          editor.undoManager.add();
        } else {
          if (isImageFigure(selectedElm)) {
            linkImageFigure(editor, selectedElm, linkAttrs);
          } else if (data.hasOwnProperty('text')) {
            editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(data.text)));
          } else {
            editor.execCommand('mceInsertLink', false, linkAttrs);
          }
        }
      });
    };
  };
  var unlink = function (editor) {
    return function () {
      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        if (isImageFigure(node)) {
          unlinkImageFigure(editor, node);
        } else {
          editor.execCommand('unlink');
        }
      });
    };
  };
  var unlinkImageFigure = function (editor, fig) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.getParents(img, 'a[href]', fig)[0];
      if (a) {
        a.parentNode.insertBefore(img, a);
        editor.dom.remove(a);
      }
    }
  };
  var linkImageFigure = function (editor, fig, attrs) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.create('a', attrs);
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    }
  };
  var $_f96xu2g0jkmcwp91 = {
    link: link,
    unlink: unlink,
    isLink: isLink,
    hasLinks: hasLinks,
    isOnlyTextSelected: isOnlyTextSelected,
    getAnchorElement: getAnchorElement,
    getAnchorText: getAnchorText,
    toggleTargetRules: toggleTargetRules
  };
  var global$5 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$6 = tinymce.util.Tools.resolve('tinymce.util.XHR');
  var attachState = {};
  var createLinkList = function (editor, callback) {
    var linkList = $_7h5h1kfvjkmcwp8j.getLinkList(editor.settings);
    if (typeof linkList === 'string') {
      global$6.send({
        url: linkList,
        success: function (text) {
          callback(editor, JSON.parse(text));
        }
      });
    } else if (typeof linkList === 'function') {
      linkList(function (list) {
        callback(editor, list);
      });
    } else {
      callback(editor, linkList);
    }
  };
  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      global$4.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var delayedConfirm = function (editor, message, callback) {
    var rng = editor.selection.getRng();
    global$5.setEditorTimeout(editor, function () {
      editor.windowManager.confirm(message, function (state) {
        editor.selection.setRng(rng);
        callback(state);
      });
    });
  };
  var showDialog = function (editor, linkList) {
    var data = {};
    var selection = editor.selection;
    var dom = editor.dom;
    var anchorElm, initialText;
    var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;
    var linkListChangeHandler = function (e) {
      var textCtrl = win.find('#text');
      if (!textCtrl.value() || e.lastControl && textCtrl.value() === e.lastControl.text()) {
        textCtrl.value(e.control.text());
      }
      win.find('#href').value(e.control.value());
    };
    var buildAnchorListControl = function (url) {
      var anchorList = [];
      global$4.each(editor.dom.select('a:not([href])'), function (anchor) {
        var id = anchor.name || anchor.id;
        if (id) {
          anchorList.push({
            text: id,
            value: '#' + id,
            selected: url.indexOf('#' + id) !== -1
          });
        }
      });
      if (anchorList.length) {
        anchorList.unshift({
          text: 'None',
          value: ''
        });
        return {
          name: 'anchor',
          type: 'listbox',
          label: 'Anchors',
          values: anchorList,
          onselect: linkListChangeHandler
        };
      }
    };
    var updateText = function () {
      if (!initialText && onlyText && !data.text) {
        this.parent().parent().find('#text')[0].value(this.value());
      }
    };
    var urlChange = function (e) {
      var meta = e.meta || {};
      if (linkListCtrl) {
        linkListCtrl.value(editor.convertURL(this.value(), 'href'));
      }
      global$4.each(e.meta, function (value, key) {
        var inp = win.find('#' + key);
        if (key === 'text') {
          if (initialText.length === 0) {
            inp.value(value);
            data.text = value;
          }
        } else {
          inp.value(value);
        }
      });
      if (meta.attach) {
        attachState = {
          href: this.value(),
          attach: meta.attach
        };
      }
      if (!meta.text) {
        updateText.call(this);
      }
    };
    var onBeforeCall = function (e) {
      e.meta = win.toJSON();
    };
    onlyText = $_f96xu2g0jkmcwp91.isOnlyTextSelected(selection.getContent());
    anchorElm = $_f96xu2g0jkmcwp91.getAnchorElement(editor);
    data.text = initialText = $_f96xu2g0jkmcwp91.getAnchorText(editor.selection, anchorElm);
    data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
    if (anchorElm) {
      data.target = dom.getAttrib(anchorElm, 'target');
    } else if ($_7h5h1kfvjkmcwp8j.hasDefaultLinkTarget(editor.settings)) {
      data.target = $_7h5h1kfvjkmcwp8j.getDefaultLinkTarget(editor.settings);
    }
    if (value = dom.getAttrib(anchorElm, 'rel')) {
      data.rel = value;
    }
    if (value = dom.getAttrib(anchorElm, 'class')) {
      data.class = value;
    }
    if (value = dom.getAttrib(anchorElm, 'title')) {
      data.title = value;
    }
    if (onlyText) {
      textListCtrl = {
        name: 'text',
        type: 'textbox',
        size: 40,
        label: 'Text to display',
        onchange: function () {
          data.text = this.value();
        }
      };
    }
    if (linkList) {
      linkListCtrl = {
        type: 'listbox',
        label: 'Link list',
        values: buildListItems(linkList, function (item) {
          item.value = editor.convertURL(item.value || item.url, 'href');
        }, [{
            text: 'None',
            value: ''
          }]),
        onselect: linkListChangeHandler,
        value: editor.convertURL(data.href, 'href'),
        onPostRender: function () {
          linkListCtrl = this;
        }
      };
    }
    if ($_7h5h1kfvjkmcwp8j.shouldShowTargetList(editor.settings)) {
      if ($_7h5h1kfvjkmcwp8j.getTargetList(editor.settings) === undefined) {
        $_7h5h1kfvjkmcwp8j.setTargetList(editor, [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'New window',
            value: '_blank'
          }
        ]);
      }
      targetListCtrl = {
        name: 'target',
        type: 'listbox',
        label: 'Target',
        values: buildListItems($_7h5h1kfvjkmcwp8j.getTargetList(editor.settings))
      };
    }
    if ($_7h5h1kfvjkmcwp8j.hasRelList(editor.settings)) {
      relListCtrl = {
        name: 'rel',
        type: 'listbox',
        label: 'Rel',
        values: buildListItems($_7h5h1kfvjkmcwp8j.getRelList(editor.settings), function (item) {
          if ($_7h5h1kfvjkmcwp8j.allowUnsafeLinkTarget(editor.settings) === false) {
            item.value = $_f96xu2g0jkmcwp91.toggleTargetRules(item.value, data.target === '_blank');
          }
        })
      };
    }
    if ($_7h5h1kfvjkmcwp8j.hasLinkClassList(editor.settings)) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: buildListItems($_7h5h1kfvjkmcwp8j.getLinkClassList(editor.settings), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                inline: 'a',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    if ($_7h5h1kfvjkmcwp8j.shouldShowLinkTitle(editor.settings)) {
      linkTitleCtrl = {
        name: 'title',
        type: 'textbox',
        label: 'Title',
        value: data.title
      };
    }
    win = editor.windowManager.open({
      title: 'Insert link',
      data: data,
      body: [
        {
          name: 'href',
          type: 'filepicker',
          filetype: 'file',
          size: 40,
          autofocus: true,
          label: 'Url',
          onchange: urlChange,
          onkeyup: updateText,
          onpaste: updateText,
          onbeforecall: onBeforeCall
        },
        textListCtrl,
        linkTitleCtrl,
        buildAnchorListControl(data.href),
        linkListCtrl,
        relListCtrl,
        targetListCtrl,
        classListCtrl
      ],
      onSubmit: function (e) {
        var assumeExternalTargets = $_7h5h1kfvjkmcwp8j.assumeExternalTargets(editor.settings);
        var insertLink = $_f96xu2g0jkmcwp91.link(editor, attachState);
        var removeLink = $_f96xu2g0jkmcwp91.unlink(editor);
        var resultData = global$4.extend({}, data, e.data);
        var href = resultData.href;
        if (!href) {
          removeLink();
          return;
        }
        if (!onlyText || resultData.text === initialText) {
          delete resultData.text;
        }
        if (href.indexOf('@') > 0 && href.indexOf('//') === -1 && href.indexOf('mailto:') === -1) {
          delayedConfirm(editor, 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?', function (state) {
            if (state) {
              resultData.href = 'mailto:' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        if (assumeExternalTargets === true && !/^\w+:/i.test(href) || assumeExternalTargets === false && /^\s*www[\.|\d\.]/i.test(href)) {
          delayedConfirm(editor, 'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?', function (state) {
            if (state) {
              resultData.href = 'http://' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        insertLink(resultData);
      }
    });
  };
  var open$1 = function (editor) {
    createLinkList(editor, showDialog);
  };
  var $_1hdbnpg2jkmcwp96 = { open: open$1 };
  var getLink = function (editor, elm) {
    return editor.dom.getParent(elm, 'a[href]');
  };
  var getSelectedLink = function (editor) {
    return getLink(editor, editor.selection.getStart());
  };
  var getHref = function (elm) {
    var href = elm.getAttribute('data-mce-href');
    return href ? href : elm.getAttribute('href');
  };
  var isContextMenuVisible = function (editor) {
    var contextmenu = editor.plugins.contextmenu;
    return contextmenu ? contextmenu.isContextMenuVisible() : false;
  };
  var hasOnlyAltModifier = function (e) {
    return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
  };
  var gotoLink = function (editor, a) {
    if (a) {
      var href = getHref(a);
      if (/^#/.test(href)) {
        var targetEl = editor.$(href);
        if (targetEl.length) {
          editor.selection.scrollIntoView(targetEl[0], true);
        }
      } else {
        $_50rjczfwjkmcwp8l.open(a.href);
      }
    }
  };
  var openDialog = function (editor) {
    return function () {
      $_1hdbnpg2jkmcwp96.open(editor);
    };
  };
  var gotoSelectedLink = function (editor) {
    return function () {
      gotoLink(editor, getSelectedLink(editor));
    };
  };
  var leftClickedOnAHref = function (editor) {
    return function (elm) {
      var sel, rng, node;
      if ($_7h5h1kfvjkmcwp8j.hasContextToolbar(editor.settings) && !isContextMenuVisible(editor) && $_f96xu2g0jkmcwp91.isLink(elm)) {
        sel = editor.selection;
        rng = sel.getRng();
        node = rng.startContainer;
        if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
          return true;
        }
      }
      return false;
    };
  };
  var setupGotoLinks = function (editor) {
    editor.on('click', function (e) {
      var link = getLink(editor, e.target);
      if (link && global$1.metaKeyPressed(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
    editor.on('keydown', function (e) {
      var link = getSelectedLink(editor);
      if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
  };
  var toggleActiveState = function (editor) {
    return function () {
      var self = this;
      editor.on('nodechange', function (e) {
        self.active(!editor.readonly && !!$_f96xu2g0jkmcwp91.getAnchorElement(editor, e.element));
      });
    };
  };
  var toggleViewLinkState = function (editor) {
    return function () {
      var self = this;
      var toggleVisibility = function (e) {
        if ($_f96xu2g0jkmcwp91.hasLinks(e.parents)) {
          self.show();
        } else {
          self.hide();
        }
      };
      if (!$_f96xu2g0jkmcwp91.hasLinks(editor.dom.getParents(editor.selection.getStart()))) {
        self.hide();
      }
      editor.on('nodechange', toggleVisibility);
      self.on('remove', function () {
        editor.off('nodechange', toggleVisibility);
      });
    };
  };
  var $_dlew49ftjkmcwp8f = {
    openDialog: openDialog,
    gotoSelectedLink: gotoSelectedLink,
    leftClickedOnAHref: leftClickedOnAHref,
    setupGotoLinks: setupGotoLinks,
    toggleActiveState: toggleActiveState,
    toggleViewLinkState: toggleViewLinkState
  };
  var register = function (editor) {
    editor.addCommand('mceLink', $_dlew49ftjkmcwp8f.openDialog(editor));
  };
  var $_3nvo42fsjkmcwp8b = { register: register };
  var setup = function (editor) {
    editor.addShortcut('Meta+K', '', $_dlew49ftjkmcwp8f.openDialog(editor));
  };
  var $_aoohpyg5jkmcwp9f = { setup: setup };
  var setupButtons = function (editor) {
    editor.addButton('link', {
      active: false,
      icon: 'link',
      tooltip: 'Insert/edit link',
      onclick: $_dlew49ftjkmcwp8f.openDialog(editor),
      onpostrender: $_dlew49ftjkmcwp8f.toggleActiveState(editor)
    });
    editor.addButton('unlink', {
      active: false,
      icon: 'unlink',
      tooltip: 'Remove link',
      onclick: $_f96xu2g0jkmcwp91.unlink(editor),
      onpostrender: $_dlew49ftjkmcwp8f.toggleActiveState(editor)
    });
    if (editor.addContextToolbar) {
      editor.addButton('openlink', {
        icon: 'newtab',
        tooltip: 'Open link',
        onclick: $_dlew49ftjkmcwp8f.gotoSelectedLink(editor)
      });
    }
  };
  var setupMenuItems = function (editor) {
    editor.addMenuItem('openlink', {
      text: 'Open link',
      icon: 'newtab',
      onclick: $_dlew49ftjkmcwp8f.gotoSelectedLink(editor),
      onPostRender: $_dlew49ftjkmcwp8f.toggleViewLinkState(editor),
      prependToContext: true
    });
    editor.addMenuItem('link', {
      icon: 'link',
      text: 'Link',
      shortcut: 'Meta+K',
      onclick: $_dlew49ftjkmcwp8f.openDialog(editor),
      stateSelector: 'a[href]',
      context: 'insert',
      prependToContext: true
    });
    editor.addMenuItem('unlink', {
      icon: 'unlink',
      text: 'Remove link',
      onclick: $_f96xu2g0jkmcwp91.unlink(editor),
      stateSelector: 'a[href]'
    });
  };
  var setupContextToolbars = function (editor) {
    if (editor.addContextToolbar) {
      editor.addContextToolbar($_dlew49ftjkmcwp8f.leftClickedOnAHref(editor), 'openlink | link unlink');
    }
  };
  var $_3wxsofg6jkmcwp9g = {
    setupButtons: setupButtons,
    setupMenuItems: setupMenuItems,
    setupContextToolbars: setupContextToolbars
  };
  global.add('link', function (editor) {
    $_3wxsofg6jkmcwp9g.setupButtons(editor);
    $_3wxsofg6jkmcwp9g.setupMenuItems(editor);
    $_3wxsofg6jkmcwp9g.setupContextToolbars(editor);
    $_dlew49ftjkmcwp8f.setupGotoLinks(editor);
    $_3nvo42fsjkmcwp8b.register(editor);
    $_aoohpyg5jkmcwp9f.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var media = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getScripts = function (editor) {
    return editor.getParam('media_scripts');
  };
  var getAudioTemplateCallback = function (editor) {
    return editor.getParam('audio_template_callback');
  };
  var getVideoTemplateCallback = function (editor) {
    return editor.getParam('video_template_callback');
  };
  var hasLiveEmbeds = function (editor) {
    return editor.getParam('media_live_embeds', true);
  };
  var shouldFilterHtml = function (editor) {
    return editor.getParam('media_filter_html', true);
  };
  var getUrlResolver = function (editor) {
    return editor.getParam('media_url_resolver');
  };
  var hasAltSource = function (editor) {
    return editor.getParam('media_alt_source', true);
  };
  var hasPoster = function (editor) {
    return editor.getParam('media_poster', true);
  };
  var hasDimensions = function (editor) {
    return editor.getParam('media_dimensions', true);
  };
  var $_6qt1nth3jkmcwpf2 = {
    getScripts: getScripts,
    getAudioTemplateCallback: getAudioTemplateCallback,
    getVideoTemplateCallback: getVideoTemplateCallback,
    hasLiveEmbeds: hasLiveEmbeds,
    shouldFilterHtml: shouldFilterHtml,
    getUrlResolver: getUrlResolver,
    hasAltSource: hasAltSource,
    hasPoster: hasPoster,
    hasDimensions: hasDimensions
  };
  var global$3 = tinymce.util.Tools.resolve('tinymce.html.SaxParser');
  var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var getVideoScriptMatch = function (prefixes, src) {
    if (prefixes) {
      for (var i = 0; i < prefixes.length; i++) {
        if (src.indexOf(prefixes[i].filter) !== -1) {
          return prefixes[i];
        }
      }
    }
  };
  var $_5qpz66h7jkmcwpf7 = { getVideoScriptMatch: getVideoScriptMatch };
  var trimPx = function (value) {
    return value.replace(/px$/, '');
  };
  var addPx = function (value) {
    return /^[0-9.]+$/.test(value) ? value + 'px' : value;
  };
  var getSize = function (name) {
    return function (elm) {
      return elm ? trimPx(elm.style[name]) : '';
    };
  };
  var setSize = function (name) {
    return function (elm, value) {
      if (elm) {
        elm.style[name] = addPx(value);
      }
    };
  };
  var $_1gasfuh8jkmcwpf8 = {
    getMaxWidth: getSize('maxWidth'),
    getMaxHeight: getSize('maxHeight'),
    setMaxWidth: setSize('maxWidth'),
    setMaxHeight: setSize('maxHeight')
  };
  var DOM = global$4.DOM;
  var getEphoxEmbedIri = function (elm) {
    return DOM.getAttrib(elm, 'data-ephox-embed-iri');
  };
  var isEphoxEmbed = function (html) {
    var fragment = DOM.createFragment(html);
    return getEphoxEmbedIri(fragment.firstChild) !== '';
  };
  var htmlToDataSax = function (prefixes, html) {
    var data = {};
    global$3({
      validate: false,
      allow_conditional_comments: true,
      special: 'script,noscript',
      start: function (name, attrs) {
        if (!data.source1 && name === 'param') {
          data.source1 = attrs.map.movie;
        }
        if (name === 'iframe' || name === 'object' || name === 'embed' || name === 'video' || name === 'audio') {
          if (!data.type) {
            data.type = name;
          }
          data = global$2.extend(attrs.map, data);
        }
        if (name === 'script') {
          var videoScript = $_5qpz66h7jkmcwpf7.getVideoScriptMatch(prefixes, attrs.map.src);
          if (!videoScript) {
            return;
          }
          data = {
            type: 'script',
            source1: attrs.map.src,
            width: videoScript.width,
            height: videoScript.height
          };
        }
        if (name === 'source') {
          if (!data.source1) {
            data.source1 = attrs.map.src;
          } else if (!data.source2) {
            data.source2 = attrs.map.src;
          }
        }
        if (name === 'img' && !data.poster) {
          data.poster = attrs.map.src;
        }
      }
    }).parse(html);
    data.source1 = data.source1 || data.src || data.data;
    data.source2 = data.source2 || '';
    data.poster = data.poster || '';
    return data;
  };
  var ephoxEmbedHtmlToData = function (html) {
    var fragment = DOM.createFragment(html);
    var div = fragment.firstChild;
    return {
      type: 'ephox-embed-iri',
      source1: getEphoxEmbedIri(div),
      source2: '',
      poster: '',
      width: $_1gasfuh8jkmcwpf8.getMaxWidth(div),
      height: $_1gasfuh8jkmcwpf8.getMaxHeight(div)
    };
  };
  var htmlToData = function (prefixes, html) {
    return isEphoxEmbed(html) ? ephoxEmbedHtmlToData(html) : htmlToDataSax(prefixes, html);
  };
  var $_1f89fyh4jkmcwpf3 = { htmlToData: htmlToData };
  var global$5 = tinymce.util.Tools.resolve('tinymce.util.Promise');
  var guess = function (url) {
    var mimes = {
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      mp4: 'video/mp4',
      webm: 'video/webm',
      ogg: 'video/ogg',
      swf: 'application/x-shockwave-flash'
    };
    var fileEnd = url.toLowerCase().split('.').pop();
    var mime = mimes[fileEnd];
    return mime ? mime : '';
  };
  var $_e86s3ihcjkmcwpfk = { guess: guess };
  var global$6 = tinymce.util.Tools.resolve('tinymce.html.Writer');
  var global$7 = tinymce.util.Tools.resolve('tinymce.html.Schema');
  var DOM$1 = global$4.DOM;
  var setAttributes = function (attrs, updatedAttrs) {
    var name;
    var i;
    var value;
    var attr;
    for (name in updatedAttrs) {
      value = '' + updatedAttrs[name];
      if (attrs.map[name]) {
        i = attrs.length;
        while (i--) {
          attr = attrs[i];
          if (attr.name === name) {
            if (value) {
              attrs.map[name] = value;
              attr.value = value;
            } else {
              delete attrs.map[name];
              attrs.splice(i, 1);
            }
          }
        }
      } else if (value) {
        attrs.push({
          name: name,
          value: value
        });
        attrs.map[name] = value;
      }
    }
  };
  var normalizeHtml = function (html) {
    var writer = global$6();
    var parser = global$3(writer);
    parser.parse(html);
    return writer.getContent();
  };
  var updateHtmlSax = function (html, data, updateAll) {
    var writer = global$6();
    var sourceCount = 0;
    var hasImage;
    global$3({
      validate: false,
      allow_conditional_comments: true,
      special: 'script,noscript',
      comment: function (text) {
        writer.comment(text);
      },
      cdata: function (text) {
        writer.cdata(text);
      },
      text: function (text, raw) {
        writer.text(text, raw);
      },
      start: function (name, attrs, empty) {
        switch (name) {
        case 'video':
        case 'object':
        case 'embed':
        case 'img':
        case 'iframe':
          if (data.height !== undefined && data.width !== undefined) {
            setAttributes(attrs, {
              width: data.width,
              height: data.height
            });
          }
          break;
        }
        if (updateAll) {
          switch (name) {
          case 'video':
            setAttributes(attrs, {
              poster: data.poster,
              src: ''
            });
            if (data.source2) {
              setAttributes(attrs, { src: '' });
            }
            break;
          case 'iframe':
            setAttributes(attrs, { src: data.source1 });
            break;
          case 'source':
            sourceCount++;
            if (sourceCount <= 2) {
              setAttributes(attrs, {
                src: data['source' + sourceCount],
                type: data['source' + sourceCount + 'mime']
              });
              if (!data['source' + sourceCount]) {
                return;
              }
            }
            break;
          case 'img':
            if (!data.poster) {
              return;
            }
            hasImage = true;
            break;
          }
        }
        writer.start(name, attrs, empty);
      },
      end: function (name) {
        if (name === 'video' && updateAll) {
          for (var index = 1; index <= 2; index++) {
            if (data['source' + index]) {
              var attrs = [];
              attrs.map = {};
              if (sourceCount < index) {
                setAttributes(attrs, {
                  src: data['source' + index],
                  type: data['source' + index + 'mime']
                });
                writer.start('source', attrs, true);
              }
            }
          }
        }
        if (data.poster && name === 'object' && updateAll && !hasImage) {
          var imgAttrs = [];
          imgAttrs.map = {};
          setAttributes(imgAttrs, {
            src: data.poster,
            width: data.width,
            height: data.height
          });
          writer.start('img', imgAttrs, true);
        }
        writer.end(name);
      }
    }, global$7({})).parse(html);
    return writer.getContent();
  };
  var isEphoxEmbed$1 = function (html) {
    var fragment = DOM$1.createFragment(html);
    return DOM$1.getAttrib(fragment.firstChild, 'data-ephox-embed-iri') !== '';
  };
  var updateEphoxEmbed = function (html, data) {
    var fragment = DOM$1.createFragment(html);
    var div = fragment.firstChild;
    $_1gasfuh8jkmcwpf8.setMaxWidth(div, data.width);
    $_1gasfuh8jkmcwpf8.setMaxHeight(div, data.height);
    return normalizeHtml(div.outerHTML);
  };
  var updateHtml = function (html, data, updateAll) {
    return isEphoxEmbed$1(html) ? updateEphoxEmbed(html, data) : updateHtmlSax(html, data, updateAll);
  };
  var $_6s992lhdjkmcwpfn = { updateHtml: updateHtml };
  var urlPatterns = [
    {
      regex: /youtu\.be\/([\w\-_\?&=.]+)/i,
      type: 'iframe',
      w: 560,
      h: 314,
      url: '//www.youtube.com/embed/$1',
      allowFullscreen: true
    },
    {
      regex: /youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,
      type: 'iframe',
      w: 560,
      h: 314,
      url: '//www.youtube.com/embed/$2?$4',
      allowFullscreen: true
    },
    {
      regex: /youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,
      type: 'iframe',
      w: 560,
      h: 314,
      url: '//www.youtube.com/embed/$1',
      allowFullscreen: true
    },
    {
      regex: /vimeo\.com\/([0-9]+)/,
      type: 'iframe',
      w: 425,
      h: 350,
      url: '//player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc',
      allowFullscreen: true
    },
    {
      regex: /vimeo\.com\/(.*)\/([0-9]+)/,
      type: 'iframe',
      w: 425,
      h: 350,
      url: '//player.vimeo.com/video/$2?title=0&amp;byline=0',
      allowFullscreen: true
    },
    {
      regex: /maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,
      type: 'iframe',
      w: 425,
      h: 350,
      url: '//maps.google.com/maps/ms?msid=$2&output=embed"',
      allowFullscreen: false
    },
    {
      regex: /dailymotion\.com\/video\/([^_]+)/,
      type: 'iframe',
      w: 480,
      h: 270,
      url: '//www.dailymotion.com/embed/video/$1',
      allowFullscreen: true
    },
    {
      regex: /dai\.ly\/([^_]+)/,
      type: 'iframe',
      w: 480,
      h: 270,
      url: '//www.dailymotion.com/embed/video/$1',
      allowFullscreen: true
    }
  ];
  var getUrl = function (pattern, url) {
    var match = pattern.regex.exec(url);
    var newUrl = pattern.url;
    var _loop_1 = function (i) {
      newUrl = newUrl.replace('$' + i, function () {
        return match[i] ? match[i] : '';
      });
    };
    for (var i = 0; i < match.length; i++) {
      _loop_1(i);
    }
    return newUrl.replace(/\?$/, '');
  };
  var matchPattern = function (url) {
    var pattern = urlPatterns.filter(function (pattern) {
      return pattern.regex.test(url);
    });
    if (pattern.length > 0) {
      return global$2.extend({}, pattern[0], { url: getUrl(pattern[0], url) });
    } else {
      return null;
    }
  };
  var getIframeHtml = function (data) {
    var allowFullscreen = data.allowFullscreen ? ' allowFullscreen="1"' : '';
    return '<iframe src="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '"' + allowFullscreen + '></iframe>';
  };
  var getFlashHtml = function (data) {
    var html = '<object data="' + data.source1 + '" width="' + data.width + '" height="' + data.height + '" type="application/x-shockwave-flash">';
    if (data.poster) {
      html += '<img src="' + data.poster + '" width="' + data.width + '" height="' + data.height + '" />';
    }
    html += '</object>';
    return html;
  };
  var getAudioHtml = function (data, audioTemplateCallback) {
    if (audioTemplateCallback) {
      return audioTemplateCallback(data);
    } else {
      return '<audio controls="controls" src="' + data.source1 + '">' + (data.source2 ? '\n<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</audio>';
    }
  };
  var getVideoHtml = function (data, videoTemplateCallback) {
    if (videoTemplateCallback) {
      return videoTemplateCallback(data);
    } else {
      return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>';
    }
  };
  var getScriptHtml = function (data) {
    return '<script src="' + data.source1 + '"></script>';
  };
  var dataToHtml = function (editor, dataIn) {
    var data = global$2.extend({}, dataIn);
    if (!data.source1) {
      global$2.extend(data, $_1f89fyh4jkmcwpf3.htmlToData($_6qt1nth3jkmcwpf2.getScripts(editor), data.embed));
      if (!data.source1) {
        return '';
      }
    }
    if (!data.source2) {
      data.source2 = '';
    }
    if (!data.poster) {
      data.poster = '';
    }
    data.source1 = editor.convertURL(data.source1, 'source');
    data.source2 = editor.convertURL(data.source2, 'source');
    data.source1mime = $_e86s3ihcjkmcwpfk.guess(data.source1);
    data.source2mime = $_e86s3ihcjkmcwpfk.guess(data.source2);
    data.poster = editor.convertURL(data.poster, 'poster');
    var pattern = matchPattern(data.source1);
    if (pattern) {
      data.source1 = pattern.url;
      data.type = pattern.type;
      data.allowFullscreen = pattern.allowFullscreen;
      data.width = data.width || pattern.w;
      data.height = data.height || pattern.h;
    }
    if (data.embed) {
      return $_6s992lhdjkmcwpfn.updateHtml(data.embed, data, true);
    } else {
      var videoScript = $_5qpz66h7jkmcwpf7.getVideoScriptMatch($_6qt1nth3jkmcwpf2.getScripts(editor), data.source1);
      if (videoScript) {
        data.type = 'script';
        data.width = videoScript.width;
        data.height = videoScript.height;
      }
      var audioTemplateCallback = $_6qt1nth3jkmcwpf2.getAudioTemplateCallback(editor);
      var videoTemplateCallback = $_6qt1nth3jkmcwpf2.getVideoTemplateCallback(editor);
      data.width = data.width || 300;
      data.height = data.height || 150;
      global$2.each(data, function (value, key) {
        data[key] = editor.dom.encode(value);
      });
      if (data.type === 'iframe') {
        return getIframeHtml(data);
      } else if (data.source1mime === 'application/x-shockwave-flash') {
        return getFlashHtml(data);
      } else if (data.source1mime.indexOf('audio') !== -1) {
        return getAudioHtml(data, audioTemplateCallback);
      } else if (data.type === 'script') {
        return getScriptHtml(data);
      } else {
        return getVideoHtml(data, videoTemplateCallback);
      }
    }
  };
  var $_65qpjdhbjkmcwpfc = { dataToHtml: dataToHtml };
  var cache = {};
  var embedPromise = function (data, dataToHtml, handler) {
    return new global$5(function (res, rej) {
      var wrappedResolve = function (response) {
        if (response.html) {
          cache[data.source1] = response;
        }
        return res({
          url: data.source1,
          html: response.html ? response.html : dataToHtml(data)
        });
      };
      if (cache[data.source1]) {
        wrappedResolve(cache[data.source1]);
      } else {
        handler({ url: data.source1 }, wrappedResolve, rej);
      }
    });
  };
  var defaultPromise = function (data, dataToHtml) {
    return new global$5(function (res) {
      res({
        html: dataToHtml(data),
        url: data.source1
      });
    });
  };
  var loadedData = function (editor) {
    return function (data) {
      return $_65qpjdhbjkmcwpfc.dataToHtml(editor, data);
    };
  };
  var getEmbedHtml = function (editor, data) {
    var embedHandler = $_6qt1nth3jkmcwpf2.getUrlResolver(editor);
    return embedHandler ? embedPromise(data, loadedData(editor), embedHandler) : defaultPromise(data, loadedData(editor));
  };
  var isCached = function (url) {
    return cache.hasOwnProperty(url);
  };
  var $_74pv8fh9jkmcwpf9 = {
    getEmbedHtml: getEmbedHtml,
    isCached: isCached
  };
  var doSyncSize = function (widthCtrl, heightCtrl) {
    widthCtrl.state.set('oldVal', widthCtrl.value());
    heightCtrl.state.set('oldVal', heightCtrl.value());
  };
  var doSizeControls = function (win, f) {
    var widthCtrl = win.find('#width')[0];
    var heightCtrl = win.find('#height')[0];
    var constrained = win.find('#constrain')[0];
    if (widthCtrl && heightCtrl && constrained) {
      f(widthCtrl, heightCtrl, constrained.checked());
    }
  };
  var doUpdateSize = function (widthCtrl, heightCtrl, isContrained) {
    var oldWidth = widthCtrl.state.get('oldVal');
    var oldHeight = heightCtrl.state.get('oldVal');
    var newWidth = widthCtrl.value();
    var newHeight = heightCtrl.value();
    if (isContrained && oldWidth && oldHeight && newWidth && newHeight) {
      if (newWidth !== oldWidth) {
        newHeight = Math.round(newWidth / oldWidth * newHeight);
        if (!isNaN(newHeight)) {
          heightCtrl.value(newHeight);
        }
      } else {
        newWidth = Math.round(newHeight / oldHeight * newWidth);
        if (!isNaN(newWidth)) {
          widthCtrl.value(newWidth);
        }
      }
    }
    doSyncSize(widthCtrl, heightCtrl);
  };
  var syncSize = function (win) {
    doSizeControls(win, doSyncSize);
  };
  var updateSize = function (win) {
    doSizeControls(win, doUpdateSize);
  };
  var createUi = function (onChange) {
    var recalcSize = function () {
      onChange(function (win) {
        updateSize(win);
      });
    };
    return {
      type: 'container',
      label: 'Dimensions',
      layout: 'flex',
      align: 'center',
      spacing: 5,
      items: [
        {
          name: 'width',
          type: 'textbox',
          maxLength: 5,
          size: 5,
          onchange: recalcSize,
          ariaLabel: 'Width'
        },
        {
          type: 'label',
          text: 'x'
        },
        {
          name: 'height',
          type: 'textbox',
          maxLength: 5,
          size: 5,
          onchange: recalcSize,
          ariaLabel: 'Height'
        },
        {
          name: 'constrain',
          type: 'checkbox',
          checked: true,
          text: 'Constrain proportions'
        }
      ]
    };
  };
  var $_gd8vqohhjkmcwpg2 = {
    createUi: createUi,
    syncSize: syncSize,
    updateSize: updateSize
  };
  var embedChange = global$1.ie && global$1.ie <= 8 ? 'onChange' : 'onInput';
  var handleError = function (editor) {
    return function (error) {
      var errorMessage = error && error.msg ? 'Media embed handler error: ' + error.msg : 'Media embed handler threw unknown error.';
      editor.notificationManager.open({
        type: 'error',
        text: errorMessage
      });
    };
  };
  var getData = function (editor) {
    var element = editor.selection.getNode();
    var dataEmbed = element.getAttribute('data-ephox-embed-iri');
    if (dataEmbed) {
      return {
        'source1': dataEmbed,
        'data-ephox-embed-iri': dataEmbed,
        'width': $_1gasfuh8jkmcwpf8.getMaxWidth(element),
        'height': $_1gasfuh8jkmcwpf8.getMaxHeight(element)
      };
    }
    return element.getAttribute('data-mce-object') ? $_1f89fyh4jkmcwpf3.htmlToData($_6qt1nth3jkmcwpf2.getScripts(editor), editor.serializer.serialize(element, { selection: true })) : {};
  };
  var getSource = function (editor) {
    var elm = editor.selection.getNode();
    if (elm.getAttribute('data-mce-object') || elm.getAttribute('data-ephox-embed-iri')) {
      return editor.selection.getContent();
    }
  };
  var addEmbedHtml = function (win, editor) {
    return function (response) {
      var html = response.html;
      var embed = win.find('#embed')[0];
      var data = global$2.extend($_1f89fyh4jkmcwpf3.htmlToData($_6qt1nth3jkmcwpf2.getScripts(editor), html), { source1: response.url });
      win.fromJSON(data);
      if (embed) {
        embed.value(html);
        $_gd8vqohhjkmcwpg2.updateSize(win);
      }
    };
  };
  var selectPlaceholder = function (editor, beforeObjects) {
    var i;
    var y;
    var afterObjects = editor.dom.select('img[data-mce-object]');
    for (i = 0; i < beforeObjects.length; i++) {
      for (y = afterObjects.length - 1; y >= 0; y--) {
        if (beforeObjects[i] === afterObjects[y]) {
          afterObjects.splice(y, 1);
        }
      }
    }
    editor.selection.select(afterObjects[0]);
  };
  var handleInsert = function (editor, html) {
    var beforeObjects = editor.dom.select('img[data-mce-object]');
    editor.insertContent(html);
    selectPlaceholder(editor, beforeObjects);
    editor.nodeChanged();
  };
  var submitForm = function (win, editor) {
    var data = win.toJSON();
    data.embed = $_6s992lhdjkmcwpfn.updateHtml(data.embed, data);
    if (data.embed && $_74pv8fh9jkmcwpf9.isCached(data.source1)) {
      handleInsert(editor, data.embed);
    } else {
      $_74pv8fh9jkmcwpf9.getEmbedHtml(editor, data).then(function (response) {
        handleInsert(editor, response.html);
      }).catch(handleError(editor));
    }
  };
  var populateMeta = function (win, meta) {
    global$2.each(meta, function (value, key) {
      win.find('#' + key).value(value);
    });
  };
  var showDialog = function (editor) {
    var win;
    var data;
    var generalFormItems = [{
        name: 'source1',
        type: 'filepicker',
        filetype: 'media',
        size: 40,
        autofocus: true,
        label: 'Source',
        onpaste: function () {
          setTimeout(function () {
            $_74pv8fh9jkmcwpf9.getEmbedHtml(editor, win.toJSON()).then(addEmbedHtml(win, editor)).catch(handleError(editor));
          }, 1);
        },
        onchange: function (e) {
          $_74pv8fh9jkmcwpf9.getEmbedHtml(editor, win.toJSON()).then(addEmbedHtml(win, editor)).catch(handleError(editor));
          populateMeta(win, e.meta);
        },
        onbeforecall: function (e) {
          e.meta = win.toJSON();
        }
      }];
    var advancedFormItems = [];
    var reserialise = function (update) {
      update(win);
      data = win.toJSON();
      win.find('#embed').value($_6s992lhdjkmcwpfn.updateHtml(data.embed, data));
    };
    if ($_6qt1nth3jkmcwpf2.hasAltSource(editor)) {
      advancedFormItems.push({
        name: 'source2',
        type: 'filepicker',
        filetype: 'media',
        size: 40,
        label: 'Alternative source'
      });
    }
    if ($_6qt1nth3jkmcwpf2.hasPoster(editor)) {
      advancedFormItems.push({
        name: 'poster',
        type: 'filepicker',
        filetype: 'image',
        size: 40,
        label: 'Poster'
      });
    }
    if ($_6qt1nth3jkmcwpf2.hasDimensions(editor)) {
      var control = $_gd8vqohhjkmcwpg2.createUi(reserialise);
      generalFormItems.push(control);
    }
    data = getData(editor);
    var embedTextBox = {
      id: 'mcemediasource',
      type: 'textbox',
      flex: 1,
      name: 'embed',
      value: getSource(editor),
      multiline: true,
      rows: 5,
      label: 'Source'
    };
    var updateValueOnChange = function () {
      data = global$2.extend({}, $_1f89fyh4jkmcwpf3.htmlToData($_6qt1nth3jkmcwpf2.getScripts(editor), this.value()));
      this.parent().parent().fromJSON(data);
    };
    embedTextBox[embedChange] = updateValueOnChange;
    var body = [
      {
        title: 'General',
        type: 'form',
        items: generalFormItems
      },
      {
        title: 'Embed',
        type: 'container',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        padding: 10,
        spacing: 10,
        items: [
          {
            type: 'label',
            text: 'Paste your embed code below:',
            forId: 'mcemediasource'
          },
          embedTextBox
        ]
      }
    ];
    if (advancedFormItems.length > 0) {
      body.push({
        title: 'Advanced',
        type: 'form',
        items: advancedFormItems
      });
    }
    win = editor.windowManager.open({
      title: 'Insert/edit media',
      data: data,
      bodyType: 'tabpanel',
      body: body,
      onSubmit: function () {
        $_gd8vqohhjkmcwpg2.updateSize(win);
        submitForm(win, editor);
      }
    });
    $_gd8vqohhjkmcwpg2.syncSize(win);
  };
  var $_3njyjoh0jkmcwpew = { showDialog: showDialog };
  var get = function (editor) {
    var showDialog = function () {
      $_3njyjoh0jkmcwpew.showDialog(editor);
    };
    return { showDialog: showDialog };
  };
  var $_eg0prjgzjkmcwpeu = { get: get };
  var register = function (editor) {
    var showDialog = function () {
      $_3njyjoh0jkmcwpew.showDialog(editor);
    };
    editor.addCommand('mceMedia', showDialog);
  };
  var $_8o48izhijkmcwpg5 = { register: register };
  var global$8 = tinymce.util.Tools.resolve('tinymce.html.Node');
  var sanitize = function (editor, html) {
    if ($_6qt1nth3jkmcwpf2.shouldFilterHtml(editor) === false) {
      return html;
    }
    var writer = global$6();
    var blocked;
    global$3({
      validate: false,
      allow_conditional_comments: false,
      special: 'script,noscript',
      comment: function (text) {
        writer.comment(text);
      },
      cdata: function (text) {
        writer.cdata(text);
      },
      text: function (text, raw) {
        writer.text(text, raw);
      },
      start: function (name, attrs, empty) {
        blocked = true;
        if (name === 'script' || name === 'noscript') {
          return;
        }
        for (var i = 0; i < attrs.length; i++) {
          if (attrs[i].name.indexOf('on') === 0) {
            return;
          }
          if (attrs[i].name === 'style') {
            attrs[i].value = editor.dom.serializeStyle(editor.dom.parseStyle(attrs[i].value), name);
          }
        }
        writer.start(name, attrs, empty);
        blocked = false;
      },
      end: function (name) {
        if (blocked) {
          return;
        }
        writer.end(name);
      }
    }, global$7({})).parse(html);
    return writer.getContent();
  };
  var $_f1oicehmjkmcwpge = { sanitize: sanitize };
  var createPlaceholderNode = function (editor, node) {
    var placeHolder;
    var name = node.name;
    placeHolder = new global$8('img', 1);
    placeHolder.shortEnded = true;
    retainAttributesAndInnerHtml(editor, node, placeHolder);
    placeHolder.attr({
      'width': node.attr('width') || '300',
      'height': node.attr('height') || (name === 'audio' ? '30' : '150'),
      'style': node.attr('style'),
      'src': global$1.transparentSrc,
      'data-mce-object': name,
      'class': 'mce-object mce-object-' + name
    });
    return placeHolder;
  };
  var createPreviewIframeNode = function (editor, node) {
    var previewWrapper;
    var previewNode;
    var shimNode;
    var name = node.name;
    previewWrapper = new global$8('span', 1);
    previewWrapper.attr({
      'contentEditable': 'false',
      'style': node.attr('style'),
      'data-mce-object': name,
      'class': 'mce-preview-object mce-object-' + name
    });
    retainAttributesAndInnerHtml(editor, node, previewWrapper);
    previewNode = new global$8(name, 1);
    previewNode.attr({
      src: node.attr('src'),
      allowfullscreen: node.attr('allowfullscreen'),
      style: node.attr('style'),
      class: node.attr('class'),
      width: node.attr('width'),
      height: node.attr('height'),
      frameborder: '0'
    });
    shimNode = new global$8('span', 1);
    shimNode.attr('class', 'mce-shim');
    previewWrapper.append(previewNode);
    previewWrapper.append(shimNode);
    return previewWrapper;
  };
  var retainAttributesAndInnerHtml = function (editor, sourceNode, targetNode) {
    var attrName;
    var attrValue;
    var attribs;
    var ai;
    var innerHtml;
    attribs = sourceNode.attributes;
    ai = attribs.length;
    while (ai--) {
      attrName = attribs[ai].name;
      attrValue = attribs[ai].value;
      if (attrName !== 'width' && attrName !== 'height' && attrName !== 'style') {
        if (attrName === 'data' || attrName === 'src') {
          attrValue = editor.convertURL(attrValue, attrName);
        }
        targetNode.attr('data-mce-p-' + attrName, attrValue);
      }
    }
    innerHtml = sourceNode.firstChild && sourceNode.firstChild.value;
    if (innerHtml) {
      targetNode.attr('data-mce-html', escape($_f1oicehmjkmcwpge.sanitize(editor, innerHtml)));
      targetNode.firstChild = null;
    }
  };
  var isWithinEphoxEmbed = function (node) {
    while (node = node.parent) {
      if (node.attr('data-ephox-embed-iri')) {
        return true;
      }
    }
    return false;
  };
  var placeHolderConverter = function (editor) {
    return function (nodes) {
      var i = nodes.length;
      var node;
      var videoScript;
      while (i--) {
        node = nodes[i];
        if (!node.parent) {
          continue;
        }
        if (node.parent.attr('data-mce-object')) {
          continue;
        }
        if (node.name === 'script') {
          videoScript = $_5qpz66h7jkmcwpf7.getVideoScriptMatch($_6qt1nth3jkmcwpf2.getScripts(editor), node.attr('src'));
          if (!videoScript) {
            continue;
          }
        }
        if (videoScript) {
          if (videoScript.width) {
            node.attr('width', videoScript.width.toString());
          }
          if (videoScript.height) {
            node.attr('height', videoScript.height.toString());
          }
        }
        if (node.name === 'iframe' && $_6qt1nth3jkmcwpf2.hasLiveEmbeds(editor) && global$1.ceFalse) {
          if (!isWithinEphoxEmbed(node)) {
            node.replace(createPreviewIframeNode(editor, node));
          }
        } else {
          if (!isWithinEphoxEmbed(node)) {
            node.replace(createPlaceholderNode(editor, node));
          }
        }
      }
    };
  };
  var $_f6hjinhljkmcwpga = {
    createPreviewIframeNode: createPreviewIframeNode,
    createPlaceholderNode: createPlaceholderNode,
    placeHolderConverter: placeHolderConverter
  };
  var setup = function (editor) {
    editor.on('preInit', function () {
      var specialElements = editor.schema.getSpecialElements();
      global$2.each('video audio iframe object'.split(' '), function (name) {
        specialElements[name] = new RegExp('</' + name + '[^>]*>', 'gi');
      });
      var boolAttrs = editor.schema.getBoolAttrs();
      global$2.each('webkitallowfullscreen mozallowfullscreen allowfullscreen'.split(' '), function (name) {
        boolAttrs[name] = {};
      });
      editor.parser.addNodeFilter('iframe,video,audio,object,embed,script', $_f6hjinhljkmcwpga.placeHolderConverter(editor));
      editor.serializer.addAttributeFilter('data-mce-object', function (nodes, name) {
        var i = nodes.length;
        var node;
        var realElm;
        var ai;
        var attribs;
        var innerHtml;
        var innerNode;
        var realElmName;
        var className;
        while (i--) {
          node = nodes[i];
          if (!node.parent) {
            continue;
          }
          realElmName = node.attr(name);
          realElm = new global$8(realElmName, 1);
          if (realElmName !== 'audio' && realElmName !== 'script') {
            className = node.attr('class');
            if (className && className.indexOf('mce-preview-object') !== -1) {
              realElm.attr({
                width: node.firstChild.attr('width'),
                height: node.firstChild.attr('height')
              });
            } else {
              realElm.attr({
                width: node.attr('width'),
                height: node.attr('height')
              });
            }
          }
          realElm.attr({ style: node.attr('style') });
          attribs = node.attributes;
          ai = attribs.length;
          while (ai--) {
            var attrName = attribs[ai].name;
            if (attrName.indexOf('data-mce-p-') === 0) {
              realElm.attr(attrName.substr(11), attribs[ai].value);
            }
          }
          if (realElmName === 'script') {
            realElm.attr('type', 'text/javascript');
          }
          innerHtml = node.attr('data-mce-html');
          if (innerHtml) {
            innerNode = new global$8('#text', 3);
            innerNode.raw = true;
            innerNode.value = $_f1oicehmjkmcwpge.sanitize(editor, unescape(innerHtml));
            realElm.append(innerNode);
          }
          node.replace(realElm);
        }
      });
    });
    editor.on('setContent', function () {
      editor.$('span.mce-preview-object').each(function (index, elm) {
        var $elm = editor.$(elm);
        if ($elm.find('span.mce-shim', elm).length === 0) {
          $elm.append('<span class="mce-shim"></span>');
        }
      });
    });
  };
  var $_b6ycdhhjjkmcwpg6 = { setup: setup };
  var setup$1 = function (editor) {
    editor.on('ResolveName', function (e) {
      var name;
      if (e.target.nodeType === 1 && (name = e.target.getAttribute('data-mce-object'))) {
        e.name = name;
      }
    });
  };
  var $_c1o1r8hnjkmcwpgg = { setup: setup$1 };
  var setup$2 = function (editor) {
    editor.on('click keyup', function () {
      var selectedNode = editor.selection.getNode();
      if (selectedNode && editor.dom.hasClass(selectedNode, 'mce-preview-object')) {
        if (editor.dom.getAttrib(selectedNode, 'data-mce-selected')) {
          selectedNode.setAttribute('data-mce-selected', '2');
        }
      }
    });
    editor.on('ObjectSelected', function (e) {
      var objectType = e.target.getAttribute('data-mce-object');
      if (objectType === 'audio' || objectType === 'script') {
        e.preventDefault();
      }
    });
    editor.on('objectResized', function (e) {
      var target = e.target;
      var html;
      if (target.getAttribute('data-mce-object')) {
        html = target.getAttribute('data-mce-html');
        if (html) {
          html = unescape(html);
          target.setAttribute('data-mce-html', escape($_6s992lhdjkmcwpfn.updateHtml(html, {
            width: e.width,
            height: e.height
          })));
        }
      }
    });
  };
  var $_8yods0hojkmcwpgh = { setup: setup$2 };
  var register$1 = function (editor) {
    editor.addButton('media', {
      tooltip: 'Insert/edit media',
      cmd: 'mceMedia',
      stateSelector: [
        'img[data-mce-object]',
        'span[data-mce-object]',
        'div[data-ephox-embed-iri]'
      ]
    });
    editor.addMenuItem('media', {
      icon: 'media',
      text: 'Media',
      cmd: 'mceMedia',
      context: 'insert',
      prependToContext: true
    });
  };
  var $_ew8gthhpjkmcwpgk = { register: register$1 };
  global.add('media', function (editor) {
    $_8o48izhijkmcwpg5.register(editor);
    $_ew8gthhpjkmcwpgk.register(editor);
    $_c1o1r8hnjkmcwpgg.setup(editor);
    $_b6ycdhhjjkmcwpg6.setup(editor);
    $_8yods0hojkmcwpgh.setup(editor);
    return $_eg0prjgzjkmcwpeu.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var noneditable = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getNonEditableClass = function (editor) {
    return editor.getParam('noneditable_noneditable_class', 'mceNonEditable');
  };
  var getEditableClass = function (editor) {
    return editor.getParam('noneditable_editable_class', 'mceEditable');
  };
  var getNonEditableRegExps = function (editor) {
    var nonEditableRegExps = editor.getParam('noneditable_regexp', []);
    if (nonEditableRegExps && nonEditableRegExps.constructor === RegExp) {
      return [nonEditableRegExps];
    } else {
      return nonEditableRegExps;
    }
  };
  var $_a4wz1bi2jkmcwpjc = {
    getNonEditableClass: getNonEditableClass,
    getEditableClass: getEditableClass,
    getNonEditableRegExps: getNonEditableRegExps
  };
  var hasClass = function (checkClassName) {
    return function (node) {
      return (' ' + node.attr('class') + ' ').indexOf(checkClassName) !== -1;
    };
  };
  var replaceMatchWithSpan = function (editor, content, cls) {
    return function (match) {
      var args = arguments, index = args[args.length - 2];
      var prevChar = index > 0 ? content.charAt(index - 1) : '';
      if (prevChar === '"') {
        return match;
      }
      if (prevChar === '>') {
        var findStartTagIndex = content.lastIndexOf('<', index);
        if (findStartTagIndex !== -1) {
          var tagHtml = content.substring(findStartTagIndex, index);
          if (tagHtml.indexOf('contenteditable="false"') !== -1) {
            return match;
          }
        }
      }
      return '<span class="' + cls + '" data-mce-content="' + editor.dom.encode(args[0]) + '">' + editor.dom.encode(typeof args[1] === 'string' ? args[1] : args[0]) + '</span>';
    };
  };
  var convertRegExpsToNonEditable = function (editor, nonEditableRegExps, e) {
    var i = nonEditableRegExps.length, content = e.content;
    if (e.format === 'raw') {
      return;
    }
    while (i--) {
      content = content.replace(nonEditableRegExps[i], replaceMatchWithSpan(editor, content, $_a4wz1bi2jkmcwpjc.getNonEditableClass(editor)));
    }
    e.content = content;
  };
  var setup = function (editor) {
    var editClass, nonEditClass;
    var contentEditableAttrName = 'contenteditable';
    editClass = ' ' + global$1.trim($_a4wz1bi2jkmcwpjc.getEditableClass(editor)) + ' ';
    nonEditClass = ' ' + global$1.trim($_a4wz1bi2jkmcwpjc.getNonEditableClass(editor)) + ' ';
    var hasEditClass = hasClass(editClass);
    var hasNonEditClass = hasClass(nonEditClass);
    var nonEditableRegExps = $_a4wz1bi2jkmcwpjc.getNonEditableRegExps(editor);
    editor.on('PreInit', function () {
      if (nonEditableRegExps.length > 0) {
        editor.on('BeforeSetContent', function (e) {
          convertRegExpsToNonEditable(editor, nonEditableRegExps, e);
        });
      }
      editor.parser.addAttributeFilter('class', function (nodes) {
        var i = nodes.length, node;
        while (i--) {
          node = nodes[i];
          if (hasEditClass(node)) {
            node.attr(contentEditableAttrName, 'true');
          } else if (hasNonEditClass(node)) {
            node.attr(contentEditableAttrName, 'false');
          }
        }
      });
      editor.serializer.addAttributeFilter(contentEditableAttrName, function (nodes) {
        var i = nodes.length, node;
        while (i--) {
          node = nodes[i];
          if (!hasEditClass(node) && !hasNonEditClass(node)) {
            continue;
          }
          if (nonEditableRegExps.length > 0 && node.attr('data-mce-content')) {
            node.name = '#text';
            node.type = 3;
            node.raw = true;
            node.value = node.attr('data-mce-content');
          } else {
            node.attr(contentEditableAttrName, null);
          }
        }
      });
    });
  };
  var $_4jcucsi0jkmcwpj9 = { setup: setup };
  global.add('noneditable', function (editor) {
    $_4jcucsi0jkmcwpj9.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var paste = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var hasProPlugin = function (editor) {
    if (/(^|[ ,])powerpaste([, ]|$)/.test(editor.settings.plugins) && global.get('powerpaste')) {
      if (typeof window.console !== 'undefined' && window.console.log) {
        window.console.log('PowerPaste is incompatible with Paste plugin! Remove \'paste\' from the \'plugins\' option.');
      }
      return true;
    } else {
      return false;
    }
  };
  var $_ee0gktiejkmcwpkb = { hasProPlugin: hasProPlugin };
  var get = function (clipboard, quirks) {
    return {
      clipboard: clipboard,
      quirks: quirks
    };
  };
  var $_6khw6eigjkmcwpkp = { get: get };
  var firePastePreProcess = function (editor, html, internal, isWordHtml) {
    return editor.fire('PastePreProcess', {
      content: html,
      internal: internal,
      wordContent: isWordHtml
    });
  };
  var firePastePostProcess = function (editor, node, internal, isWordHtml) {
    return editor.fire('PastePostProcess', {
      node: node,
      internal: internal,
      wordContent: isWordHtml
    });
  };
  var firePastePlainTextToggle = function (editor, state) {
    return editor.fire('PastePlainTextToggle', { state: state });
  };
  var firePaste = function (editor, ieFake) {
    return editor.fire('paste', { ieFake: ieFake });
  };
  var $_d8ovv8ijjkmcwpku = {
    firePastePreProcess: firePastePreProcess,
    firePastePostProcess: firePastePostProcess,
    firePastePlainTextToggle: firePastePlainTextToggle,
    firePaste: firePaste
  };
  var shouldPlainTextInform = function (editor) {
    return editor.getParam('paste_plaintext_inform', true);
  };
  var shouldBlockDrop = function (editor) {
    return editor.getParam('paste_block_drop', false);
  };
  var shouldPasteDataImages = function (editor) {
    return editor.getParam('paste_data_images', false);
  };
  var shouldFilterDrop = function (editor) {
    return editor.getParam('paste_filter_drop', true);
  };
  var getPreProcess = function (editor) {
    return editor.getParam('paste_preprocess');
  };
  var getPostProcess = function (editor) {
    return editor.getParam('paste_postprocess');
  };
  var getWebkitStyles = function (editor) {
    return editor.getParam('paste_webkit_styles');
  };
  var shouldRemoveWebKitStyles = function (editor) {
    return editor.getParam('paste_remove_styles_if_webkit', true);
  };
  var shouldMergeFormats = function (editor) {
    return editor.getParam('paste_merge_formats', true);
  };
  var isSmartPasteEnabled = function (editor) {
    return editor.getParam('smart_paste', true);
  };
  var isPasteAsTextEnabled = function (editor) {
    return editor.getParam('paste_as_text', false);
  };
  var getRetainStyleProps = function (editor) {
    return editor.getParam('paste_retain_style_properties');
  };
  var getWordValidElements = function (editor) {
    var defaultValidElements = '-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,' + '-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,' + 'td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody';
    return editor.getParam('paste_word_valid_elements', defaultValidElements);
  };
  var shouldConvertWordFakeLists = function (editor) {
    return editor.getParam('paste_convert_word_fake_lists', true);
  };
  var shouldUseDefaultFilters = function (editor) {
    return editor.getParam('paste_enable_default_filters', true);
  };
  var $_5peev0ikjkmcwpkv = {
    shouldPlainTextInform: shouldPlainTextInform,
    shouldBlockDrop: shouldBlockDrop,
    shouldPasteDataImages: shouldPasteDataImages,
    shouldFilterDrop: shouldFilterDrop,
    getPreProcess: getPreProcess,
    getPostProcess: getPostProcess,
    getWebkitStyles: getWebkitStyles,
    shouldRemoveWebKitStyles: shouldRemoveWebKitStyles,
    shouldMergeFormats: shouldMergeFormats,
    isSmartPasteEnabled: isSmartPasteEnabled,
    isPasteAsTextEnabled: isPasteAsTextEnabled,
    getRetainStyleProps: getRetainStyleProps,
    getWordValidElements: getWordValidElements,
    shouldConvertWordFakeLists: shouldConvertWordFakeLists,
    shouldUseDefaultFilters: shouldUseDefaultFilters
  };
  var shouldInformUserAboutPlainText = function (editor, userIsInformedState) {
    return userIsInformedState.get() === false && $_5peev0ikjkmcwpkv.shouldPlainTextInform(editor);
  };
  var displayNotification = function (editor, message) {
    editor.notificationManager.open({
      text: editor.translate(message),
      type: 'info'
    });
  };
  var togglePlainTextPaste = function (editor, clipboard, userIsInformedState) {
    if (clipboard.pasteFormat.get() === 'text') {
      clipboard.pasteFormat.set('html');
      $_d8ovv8ijjkmcwpku.firePastePlainTextToggle(editor, false);
    } else {
      clipboard.pasteFormat.set('text');
      $_d8ovv8ijjkmcwpku.firePastePlainTextToggle(editor, true);
      if (shouldInformUserAboutPlainText(editor, userIsInformedState)) {
        displayNotification(editor, 'Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.');
        userIsInformedState.set(true);
      }
    }
    editor.focus();
  };
  var $_7rw4pkiijkmcwpks = { togglePlainTextPaste: togglePlainTextPaste };
  var register = function (editor, clipboard, userIsInformedState) {
    editor.addCommand('mceTogglePlainTextPaste', function () {
      $_7rw4pkiijkmcwpks.togglePlainTextPaste(editor, clipboard, userIsInformedState);
    });
    editor.addCommand('mceInsertClipboardContent', function (ui, value) {
      if (value.content) {
        clipboard.pasteHtml(value.content, value.internal);
      }
      if (value.text) {
        clipboard.pasteText(value.text);
      }
    });
  };
  var $_gh26txihjkmcwpkr = { register: register };
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var internalMimeType = 'x-tinymce/html';
  var internalMark = '<!-- ' + internalMimeType + ' -->';
  var mark = function (html) {
    return internalMark + html;
  };
  var unmark = function (html) {
    return html.replace(internalMark, '');
  };
  var isMarked = function (html) {
    return html.indexOf(internalMark) !== -1;
  };
  var $_93gcj3irjkmcwpld = {
    mark: mark,
    unmark: unmark,
    isMarked: isMarked,
    internalHtmlMime: function () {
      return internalMimeType;
    }
  };
  var global$5 = tinymce.util.Tools.resolve('tinymce.html.Entities');
  var isPlainText = function (text) {
    return !/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(text);
  };
  var toBRs = function (text) {
    return text.replace(/\r?\n/g, '<br>');
  };
  var openContainer = function (rootTag, rootAttrs) {
    var key;
    var attrs = [];
    var tag = '<' + rootTag;
    if (typeof rootAttrs === 'object') {
      for (key in rootAttrs) {
        if (rootAttrs.hasOwnProperty(key)) {
          attrs.push(key + '="' + global$5.encodeAllRaw(rootAttrs[key]) + '"');
        }
      }
      if (attrs.length) {
        tag += ' ' + attrs.join(' ');
      }
    }
    return tag + '>';
  };
  var toBlockElements = function (text, rootTag, rootAttrs) {
    var blocks = text.split(/\n\n/);
    var tagOpen = openContainer(rootTag, rootAttrs);
    var tagClose = '</' + rootTag + '>';
    var paragraphs = global$3.map(blocks, function (p) {
      return p.split(/\n/).join('<br />');
    });
    var stitch = function (p) {
      return tagOpen + p + tagClose;
    };
    return paragraphs.length === 1 ? paragraphs[0] : global$3.map(paragraphs, stitch).join('');
  };
  var convert = function (text, rootTag, rootAttrs) {
    return rootTag ? toBlockElements(text, rootTag, rootAttrs) : toBRs(text);
  };
  var $_3nag2qisjkmcwple = {
    isPlainText: isPlainText,
    convert: convert,
    toBRs: toBRs,
    toBlockElements: toBlockElements
  };
  var global$6 = tinymce.util.Tools.resolve('tinymce.html.DomParser');
  var global$7 = tinymce.util.Tools.resolve('tinymce.html.Node');
  var global$8 = tinymce.util.Tools.resolve('tinymce.html.Schema');
  var global$9 = tinymce.util.Tools.resolve('tinymce.html.Serializer');
  function filter(content, items) {
    global$3.each(items, function (v) {
      if (v.constructor === RegExp) {
        content = content.replace(v, '');
      } else {
        content = content.replace(v[0], v[1]);
      }
    });
    return content;
  }
  function innerText(html) {
    var schema = global$8();
    var domParser = global$6({}, schema);
    var text = '';
    var shortEndedElements = schema.getShortEndedElements();
    var ignoreElements = global$3.makeMap('script noscript style textarea video audio iframe object', ' ');
    var blockElements = schema.getBlockElements();
    function walk(node) {
      var name$$1 = node.name, currentNode = node;
      if (name$$1 === 'br') {
        text += '\n';
        return;
      }
      if (shortEndedElements[name$$1]) {
        text += ' ';
      }
      if (ignoreElements[name$$1]) {
        text += ' ';
        return;
      }
      if (node.type === 3) {
        text += node.value;
      }
      if (!node.shortEnded) {
        if (node = node.firstChild) {
          do {
            walk(node);
          } while (node = node.next);
        }
      }
      if (blockElements[name$$1] && currentNode.next) {
        text += '\n';
        if (name$$1 === 'p') {
          text += '\n';
        }
      }
    }
    html = filter(html, [/<!\[[^\]]+\]>/g]);
    walk(domParser.parse(html));
    return text;
  }
  function trimHtml(html) {
    function trimSpaces(all, s1, s2) {
      if (!s1 && !s2) {
        return ' ';
      }
      return '\xA0';
    }
    html = filter(html, [
      /^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/ig,
      /<!--StartFragment-->|<!--EndFragment-->/g,
      [
        /( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,
        trimSpaces
      ],
      /<br class="Apple-interchange-newline">/g,
      /<br>$/i
    ]);
    return html;
  }
  function createIdGenerator(prefix) {
    var count = 0;
    return function () {
      return prefix + count++;
    };
  }
  var isMsEdge = function () {
    return navigator.userAgent.indexOf(' Edge/') !== -1;
  };
  var $_2u5gcyj0jkmcwplv = {
    filter: filter,
    innerText: innerText,
    trimHtml: trimHtml,
    createIdGenerator: createIdGenerator,
    isMsEdge: isMsEdge
  };
  function isWordContent(content) {
    return /<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(content) || /class="OutlineElement/.test(content) || /id="?docs\-internal\-guid\-/.test(content);
  }
  function isNumericList(text) {
    var found, patterns;
    patterns = [
      /^[IVXLMCD]{1,2}\.[ \u00a0]/,
      /^[ivxlmcd]{1,2}\.[ \u00a0]/,
      /^[a-z]{1,2}[\.\)][ \u00a0]/,
      /^[A-Z]{1,2}[\.\)][ \u00a0]/,
      /^[0-9]+\.[ \u00a0]/,
      /^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,
      /^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/
    ];
    text = text.replace(/^[\u00a0 ]+/, '');
    global$3.each(patterns, function (pattern) {
      if (pattern.test(text)) {
        found = true;
        return false;
      }
    });
    return found;
  }
  function isBulletList(text) {
    return /^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(text);
  }
  function convertFakeListsToProperLists(node) {
    var currentListNode, prevListNode, lastLevel = 1;
    function getText(node) {
      var txt = '';
      if (node.type === 3) {
        return node.value;
      }
      if (node = node.firstChild) {
        do {
          txt += getText(node);
        } while (node = node.next);
      }
      return txt;
    }
    function trimListStart(node, regExp) {
      if (node.type === 3) {
        if (regExp.test(node.value)) {
          node.value = node.value.replace(regExp, '');
          return false;
        }
      }
      if (node = node.firstChild) {
        do {
          if (!trimListStart(node, regExp)) {
            return false;
          }
        } while (node = node.next);
      }
      return true;
    }
    function removeIgnoredNodes(node) {
      if (node._listIgnore) {
        node.remove();
        return;
      }
      if (node = node.firstChild) {
        do {
          removeIgnoredNodes(node);
        } while (node = node.next);
      }
    }
    function convertParagraphToLi(paragraphNode, listName, start) {
      var level = paragraphNode._listLevel || lastLevel;
      if (level !== lastLevel) {
        if (level < lastLevel) {
          if (currentListNode) {
            currentListNode = currentListNode.parent.parent;
          }
        } else {
          prevListNode = currentListNode;
          currentListNode = null;
        }
      }
      if (!currentListNode || currentListNode.name !== listName) {
        prevListNode = prevListNode || currentListNode;
        currentListNode = new global$7(listName, 1);
        if (start > 1) {
          currentListNode.attr('start', '' + start);
        }
        paragraphNode.wrap(currentListNode);
      } else {
        currentListNode.append(paragraphNode);
      }
      paragraphNode.name = 'li';
      if (level > lastLevel && prevListNode) {
        prevListNode.lastChild.append(currentListNode);
      }
      lastLevel = level;
      removeIgnoredNodes(paragraphNode);
      trimListStart(paragraphNode, /^\u00a0+/);
      trimListStart(paragraphNode, /^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/);
      trimListStart(paragraphNode, /^\u00a0+/);
    }
    var elements = [];
    var child = node.firstChild;
    while (typeof child !== 'undefined' && child !== null) {
      elements.push(child);
      child = child.walk();
      if (child !== null) {
        while (typeof child !== 'undefined' && child.parent !== node) {
          child = child.walk();
        }
      }
    }
    for (var i = 0; i < elements.length; i++) {
      node = elements[i];
      if (node.name === 'p' && node.firstChild) {
        var nodeText = getText(node);
        if (isBulletList(nodeText)) {
          convertParagraphToLi(node, 'ul');
          continue;
        }
        if (isNumericList(nodeText)) {
          var matches = /([0-9]+)\./.exec(nodeText);
          var start = 1;
          if (matches) {
            start = parseInt(matches[1], 10);
          }
          convertParagraphToLi(node, 'ol', start);
          continue;
        }
        if (node._listLevel) {
          convertParagraphToLi(node, 'ul', 1);
          continue;
        }
        currentListNode = null;
      } else {
        prevListNode = currentListNode;
        currentListNode = null;
      }
    }
  }
  function filterStyles(editor, validStyles, node, styleValue) {
    var outputStyles = {}, matches;
    var styles = editor.dom.parseStyle(styleValue);
    global$3.each(styles, function (value, name) {
      switch (name) {
      case 'mso-list':
        matches = /\w+ \w+([0-9]+)/i.exec(styleValue);
        if (matches) {
          node._listLevel = parseInt(matches[1], 10);
        }
        if (/Ignore/i.test(value) && node.firstChild) {
          node._listIgnore = true;
          node.firstChild._listIgnore = true;
        }
        break;
      case 'horiz-align':
        name = 'text-align';
        break;
      case 'vert-align':
        name = 'vertical-align';
        break;
      case 'font-color':
      case 'mso-foreground':
        name = 'color';
        break;
      case 'mso-background':
      case 'mso-highlight':
        name = 'background';
        break;
      case 'font-weight':
      case 'font-style':
        if (value !== 'normal') {
          outputStyles[name] = value;
        }
        return;
      case 'mso-element':
        if (/^(comment|comment-list)$/i.test(value)) {
          node.remove();
          return;
        }
        break;
      }
      if (name.indexOf('mso-comment') === 0) {
        node.remove();
        return;
      }
      if (name.indexOf('mso-') === 0) {
        return;
      }
      if ($_5peev0ikjkmcwpkv.getRetainStyleProps(editor) === 'all' || validStyles && validStyles[name]) {
        outputStyles[name] = value;
      }
    });
    if (/(bold)/i.test(outputStyles['font-weight'])) {
      delete outputStyles['font-weight'];
      node.wrap(new global$7('b', 1));
    }
    if (/(italic)/i.test(outputStyles['font-style'])) {
      delete outputStyles['font-style'];
      node.wrap(new global$7('i', 1));
    }
    outputStyles = editor.dom.serializeStyle(outputStyles, node.name);
    if (outputStyles) {
      return outputStyles;
    }
    return null;
  }
  var filterWordContent = function (editor, content) {
    var retainStyleProperties, validStyles;
    retainStyleProperties = $_5peev0ikjkmcwpkv.getRetainStyleProps(editor);
    if (retainStyleProperties) {
      validStyles = global$3.makeMap(retainStyleProperties.split(/[, ]/));
    }
    content = $_2u5gcyj0jkmcwplv.filter(content, [
      /<br class="?Apple-interchange-newline"?>/gi,
      /<b[^>]+id="?docs-internal-[^>]*>/gi,
      /<!--[\s\S]+?-->/gi,
      /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,
      [
        /<(\/?)s>/gi,
        '<$1strike>'
      ],
      [
        /&nbsp;/gi,
        '\xA0'
      ],
      [
        /<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,
        function (str, spaces) {
          return spaces.length > 0 ? spaces.replace(/./, ' ').slice(Math.floor(spaces.length / 2)).split('').join('\xA0') : '';
        }
      ]
    ]);
    var validElements = $_5peev0ikjkmcwpkv.getWordValidElements(editor);
    var schema = global$8({
      valid_elements: validElements,
      valid_children: '-li[p]'
    });
    global$3.each(schema.elements, function (rule) {
      if (!rule.attributes.class) {
        rule.attributes.class = {};
        rule.attributesOrder.push('class');
      }
      if (!rule.attributes.style) {
        rule.attributes.style = {};
        rule.attributesOrder.push('style');
      }
    });
    var domParser = global$6({}, schema);
    domParser.addAttributeFilter('style', function (nodes) {
      var i = nodes.length, node;
      while (i--) {
        node = nodes[i];
        node.attr('style', filterStyles(editor, validStyles, node, node.attr('style')));
        if (node.name === 'span' && node.parent && !node.attributes.length) {
          node.unwrap();
        }
      }
    });
    domParser.addAttributeFilter('class', function (nodes) {
      var i = nodes.length, node, className;
      while (i--) {
        node = nodes[i];
        className = node.attr('class');
        if (/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(className)) {
          node.remove();
        }
        node.attr('class', null);
      }
    });
    domParser.addNodeFilter('del', function (nodes) {
      var i = nodes.length;
      while (i--) {
        nodes[i].remove();
      }
    });
    domParser.addNodeFilter('a', function (nodes) {
      var i = nodes.length, node, href, name;
      while (i--) {
        node = nodes[i];
        href = node.attr('href');
        name = node.attr('name');
        if (href && href.indexOf('#_msocom_') !== -1) {
          node.remove();
          continue;
        }
        if (href && href.indexOf('file://') === 0) {
          href = href.split('#')[1];
          if (href) {
            href = '#' + href;
          }
        }
        if (!href && !name) {
          node.unwrap();
        } else {
          if (name && !/^_?(?:toc|edn|ftn)/i.test(name)) {
            node.unwrap();
            continue;
          }
          node.attr({
            href: href,
            name: name
          });
        }
      }
    });
    var rootNode = domParser.parse(content);
    if ($_5peev0ikjkmcwpkv.shouldConvertWordFakeLists(editor)) {
      convertFakeListsToProperLists(rootNode);
    }
    content = global$9({ validate: editor.settings.validate }, schema).serialize(rootNode);
    return content;
  };
  var preProcess = function (editor, content) {
    return $_5peev0ikjkmcwpkv.shouldUseDefaultFilters(editor) ? filterWordContent(editor, content) : content;
  };
  var $_759xt5ivjkmcwplk = {
    preProcess: preProcess,
    isWordContent: isWordContent
  };
  var processResult = function (content, cancelled) {
    return {
      content: content,
      cancelled: cancelled
    };
  };
  var postProcessFilter = function (editor, html, internal, isWordHtml) {
    var tempBody = editor.dom.create('div', { style: 'display:none' }, html);
    var postProcessArgs = $_d8ovv8ijjkmcwpku.firePastePostProcess(editor, tempBody, internal, isWordHtml);
    return processResult(postProcessArgs.node.innerHTML, postProcessArgs.isDefaultPrevented());
  };
  var filterContent = function (editor, content, internal, isWordHtml) {
    var preProcessArgs = $_d8ovv8ijjkmcwpku.firePastePreProcess(editor, content, internal, isWordHtml);
    if (editor.hasEventListeners('PastePostProcess') && !preProcessArgs.isDefaultPrevented()) {
      return postProcessFilter(editor, preProcessArgs.content, internal, isWordHtml);
    } else {
      return processResult(preProcessArgs.content, preProcessArgs.isDefaultPrevented());
    }
  };
  var process = function (editor, html, internal) {
    var isWordHtml = $_759xt5ivjkmcwplk.isWordContent(html);
    var content = isWordHtml ? $_759xt5ivjkmcwplk.preProcess(editor, html) : html;
    return filterContent(editor, content, internal, isWordHtml);
  };
  var $_7a37nniujkmcwplh = { process: process };
  var pasteHtml = function (editor, html) {
    editor.insertContent(html, {
      merge: $_5peev0ikjkmcwpkv.shouldMergeFormats(editor),
      paste: true
    });
    return true;
  };
  var isAbsoluteUrl = function (url) {
    return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(url);
  };
  var isImageUrl = function (url) {
    return isAbsoluteUrl(url) && /.(gif|jpe?g|png)$/.test(url);
  };
  var createImage = function (editor, url, pasteHtmlFn) {
    editor.undoManager.extra(function () {
      pasteHtmlFn(editor, url);
    }, function () {
      editor.insertContent('<img src="' + url + '">');
    });
    return true;
  };
  var createLink = function (editor, url, pasteHtmlFn) {
    editor.undoManager.extra(function () {
      pasteHtmlFn(editor, url);
    }, function () {
      editor.execCommand('mceInsertLink', false, url);
    });
    return true;
  };
  var linkSelection = function (editor, html, pasteHtmlFn) {
    return editor.selection.isCollapsed() === false && isAbsoluteUrl(html) ? createLink(editor, html, pasteHtmlFn) : false;
  };
  var insertImage = function (editor, html, pasteHtmlFn) {
    return isImageUrl(html) ? createImage(editor, html, pasteHtmlFn) : false;
  };
  var smartInsertContent = function (editor, html) {
    global$3.each([
      linkSelection,
      insertImage,
      pasteHtml
    ], function (action) {
      return action(editor, html, pasteHtml) !== true;
    });
  };
  var insertContent = function (editor, html) {
    if ($_5peev0ikjkmcwpkv.isSmartPasteEnabled(editor) === false) {
      pasteHtml(editor, html);
    } else {
      smartInsertContent(editor, html);
    }
  };
  var $_3wqigwj1jkmcwplz = {
    isImageUrl: isImageUrl,
    isAbsoluteUrl: isAbsoluteUrl,
    insertContent: insertContent
  };
  var pasteHtml$1 = function (editor, html, internalFlag) {
    var internal = internalFlag ? internalFlag : $_93gcj3irjkmcwpld.isMarked(html);
    var args = $_7a37nniujkmcwplh.process(editor, $_93gcj3irjkmcwpld.unmark(html), internal);
    if (args.cancelled === false) {
      $_3wqigwj1jkmcwplz.insertContent(editor, args.content);
    }
  };
  var pasteText = function (editor, text) {
    text = editor.dom.encode(text).replace(/\r\n/g, '\n');
    text = $_3nag2qisjkmcwple.convert(text, editor.settings.forced_root_block, editor.settings.forced_root_block_attrs);
    pasteHtml$1(editor, text, false);
  };
  var getDataTransferItems = function (dataTransfer) {
    var items = {};
    var mceInternalUrlPrefix = 'data:text/mce-internal,';
    if (dataTransfer) {
      if (dataTransfer.getData) {
        var legacyText = dataTransfer.getData('Text');
        if (legacyText && legacyText.length > 0) {
          if (legacyText.indexOf(mceInternalUrlPrefix) === -1) {
            items['text/plain'] = legacyText;
          }
        }
      }
      if (dataTransfer.types) {
        for (var i = 0; i < dataTransfer.types.length; i++) {
          var contentType = dataTransfer.types[i];
          try {
            items[contentType] = dataTransfer.getData(contentType);
          } catch (ex) {
            items[contentType] = '';
          }
        }
      }
    }
    return items;
  };
  var getClipboardContent = function (editor, clipboardEvent) {
    var content = getDataTransferItems(clipboardEvent.clipboardData || editor.getDoc().dataTransfer);
    return $_2u5gcyj0jkmcwplv.isMsEdge() ? global$3.extend(content, { 'text/html': '' }) : content;
  };
  var hasContentType = function (clipboardContent, mimeType) {
    return mimeType in clipboardContent && clipboardContent[mimeType].length > 0;
  };
  var hasHtmlOrText = function (content) {
    return hasContentType(content, 'text/html') || hasContentType(content, 'text/plain');
  };
  var getBase64FromUri = function (uri) {
    var idx;
    idx = uri.indexOf(',');
    if (idx !== -1) {
      return uri.substr(idx + 1);
    }
    return null;
  };
  var isValidDataUriImage = function (settings, imgElm) {
    return settings.images_dataimg_filter ? settings.images_dataimg_filter(imgElm) : true;
  };
  var extractFilename = function (editor, str) {
    var m = str.match(/([\s\S]+?)\.(?:jpeg|jpg|png|gif)$/i);
    return m ? editor.dom.encode(m[1]) : null;
  };
  var uniqueId = $_2u5gcyj0jkmcwplv.createIdGenerator('mceclip');
  var pasteImage = function (editor, rng, reader, blob) {
    if (rng) {
      editor.selection.setRng(rng);
      rng = null;
    }
    var dataUri = reader.result;
    var base64 = getBase64FromUri(dataUri);
    var id = uniqueId();
    var name$$1 = editor.settings.images_reuse_filename && blob.name ? extractFilename(editor, blob.name) : id;
    var img = new Image();
    img.src = dataUri;
    if (isValidDataUriImage(editor.settings, img)) {
      var blobCache = editor.editorUpload.blobCache;
      var blobInfo = void 0, existingBlobInfo = void 0;
      existingBlobInfo = blobCache.findFirst(function (cachedBlobInfo) {
        return cachedBlobInfo.base64() === base64;
      });
      if (!existingBlobInfo) {
        blobInfo = blobCache.create(id, blob, base64, name$$1);
        blobCache.add(blobInfo);
      } else {
        blobInfo = existingBlobInfo;
      }
      pasteHtml$1(editor, '<img src="' + blobInfo.blobUri() + '">', false);
    } else {
      pasteHtml$1(editor, '<img src="' + dataUri + '">', false);
    }
  };
  var isClipboardEvent = function (event$$1) {
    return event$$1.type === 'paste';
  };
  var pasteImageData = function (editor, e, rng) {
    var dataTransfer = isClipboardEvent(e) ? e.clipboardData : e.dataTransfer;
    function processItems(items) {
      var i, item, reader, hadImage = false;
      if (items) {
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (/^image\/(jpeg|png|gif|bmp)$/.test(item.type)) {
            var blob = item.getAsFile ? item.getAsFile() : item;
            reader = new window.FileReader();
            reader.onload = pasteImage.bind(null, editor, rng, reader, blob);
            reader.readAsDataURL(blob);
            e.preventDefault();
            hadImage = true;
          }
        }
      }
      return hadImage;
    }
    if (editor.settings.paste_data_images && dataTransfer) {
      return processItems(dataTransfer.items) || processItems(dataTransfer.files);
    }
  };
  var isBrokenAndroidClipboardEvent = function (e) {
    var clipboardData = e.clipboardData;
    return navigator.userAgent.indexOf('Android') !== -1 && clipboardData && clipboardData.items && clipboardData.items.length === 0;
  };
  var isKeyboardPasteEvent = function (e) {
    return global$4.metaKeyPressed(e) && e.keyCode === 86 || e.shiftKey && e.keyCode === 45;
  };
  var registerEventHandlers = function (editor, pasteBin, pasteFormat) {
    var keyboardPasteTimeStamp = 0;
    var keyboardPastePlainTextState;
    editor.on('keydown', function (e) {
      function removePasteBinOnKeyUp(e) {
        if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
          pasteBin.remove();
        }
      }
      if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
        keyboardPastePlainTextState = e.shiftKey && e.keyCode === 86;
        if (keyboardPastePlainTextState && global$1.webkit && navigator.userAgent.indexOf('Version/') !== -1) {
          return;
        }
        e.stopImmediatePropagation();
        keyboardPasteTimeStamp = new Date().getTime();
        if (global$1.ie && keyboardPastePlainTextState) {
          e.preventDefault();
          $_d8ovv8ijjkmcwpku.firePaste(editor, true);
          return;
        }
        pasteBin.remove();
        pasteBin.create();
        editor.once('keyup', removePasteBinOnKeyUp);
        editor.once('paste', function () {
          editor.off('keyup', removePasteBinOnKeyUp);
        });
      }
    });
    function insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal) {
      var content, isPlainTextHtml;
      if (hasContentType(clipboardContent, 'text/html')) {
        content = clipboardContent['text/html'];
      } else {
        content = pasteBin.getHtml();
        internal = internal ? internal : $_93gcj3irjkmcwpld.isMarked(content);
        if (pasteBin.isDefaultContent(content)) {
          plainTextMode = true;
        }
      }
      content = $_2u5gcyj0jkmcwplv.trimHtml(content);
      pasteBin.remove();
      isPlainTextHtml = internal === false && $_3nag2qisjkmcwple.isPlainText(content);
      if (!content.length || isPlainTextHtml) {
        plainTextMode = true;
      }
      if (plainTextMode) {
        if (hasContentType(clipboardContent, 'text/plain') && isPlainTextHtml) {
          content = clipboardContent['text/plain'];
        } else {
          content = $_2u5gcyj0jkmcwplv.innerText(content);
        }
      }
      if (pasteBin.isDefaultContent(content)) {
        if (!isKeyBoardPaste) {
          editor.windowManager.alert('Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.');
        }
        return;
      }
      if (plainTextMode) {
        pasteText(editor, content);
      } else {
        pasteHtml$1(editor, content, internal);
      }
    }
    var getLastRng = function () {
      return pasteBin.getLastRng() || editor.selection.getRng();
    };
    editor.on('paste', function (e) {
      var clipboardTimer = new Date().getTime();
      var clipboardContent = getClipboardContent(editor, e);
      var clipboardDelay = new Date().getTime() - clipboardTimer;
      var isKeyBoardPaste = new Date().getTime() - keyboardPasteTimeStamp - clipboardDelay < 1000;
      var plainTextMode = pasteFormat.get() === 'text' || keyboardPastePlainTextState;
      var internal = hasContentType(clipboardContent, $_93gcj3irjkmcwpld.internalHtmlMime());
      keyboardPastePlainTextState = false;
      if (e.isDefaultPrevented() || isBrokenAndroidClipboardEvent(e)) {
        pasteBin.remove();
        return;
      }
      if (!hasHtmlOrText(clipboardContent) && pasteImageData(editor, e, getLastRng())) {
        pasteBin.remove();
        return;
      }
      if (!isKeyBoardPaste) {
        e.preventDefault();
      }
      if (global$1.ie && (!isKeyBoardPaste || e.ieFake) && !hasContentType(clipboardContent, 'text/html')) {
        pasteBin.create();
        editor.dom.bind(pasteBin.getEl(), 'paste', function (e) {
          e.stopPropagation();
        });
        editor.getDoc().execCommand('Paste', false, null);
        clipboardContent['text/html'] = pasteBin.getHtml();
      }
      if (hasContentType(clipboardContent, 'text/html')) {
        e.preventDefault();
        if (!internal) {
          internal = $_93gcj3irjkmcwpld.isMarked(clipboardContent['text/html']);
        }
        insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
      } else {
        global$2.setEditorTimeout(editor, function () {
          insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
        }, 0);
      }
    });
  };
  var registerEventsAndFilters = function (editor, pasteBin, pasteFormat) {
    registerEventHandlers(editor, pasteBin, pasteFormat);
    var src;
    editor.parser.addNodeFilter('img', function (nodes, name$$1, args) {
      var isPasteInsert = function (args) {
        return args.data && args.data.paste === true;
      };
      var remove = function (node) {
        if (!node.attr('data-mce-object') && src !== global$1.transparentSrc) {
          node.remove();
        }
      };
      var isWebKitFakeUrl = function (src) {
        return src.indexOf('webkit-fake-url') === 0;
      };
      var isDataUri = function (src) {
        return src.indexOf('data:') === 0;
      };
      if (!editor.settings.paste_data_images && isPasteInsert(args)) {
        var i = nodes.length;
        while (i--) {
          src = nodes[i].attributes.map.src;
          if (!src) {
            continue;
          }
          if (isWebKitFakeUrl(src)) {
            remove(nodes[i]);
          } else if (!editor.settings.allow_html_data_urls && isDataUri(src)) {
            remove(nodes[i]);
          }
        }
      }
    });
  };
  var getPasteBinParent = function (editor) {
    return global$1.ie && editor.inline ? document.body : editor.getBody();
  };
  var isExternalPasteBin = function (editor) {
    return getPasteBinParent(editor) !== editor.getBody();
  };
  var delegatePasteEvents = function (editor, pasteBinElm, pasteBinDefaultContent) {
    if (isExternalPasteBin(editor)) {
      editor.dom.bind(pasteBinElm, 'paste keyup', function (e) {
        if (!isDefault(editor, pasteBinDefaultContent)) {
          editor.fire('paste');
        }
      });
    }
  };
  var create = function (editor, lastRngCell, pasteBinDefaultContent) {
    var dom = editor.dom, body = editor.getBody();
    var pasteBinElm;
    lastRngCell.set(editor.selection.getRng());
    pasteBinElm = editor.dom.add(getPasteBinParent(editor), 'div', {
      'id': 'mcepastebin',
      'class': 'mce-pastebin',
      'contentEditable': true,
      'data-mce-bogus': 'all',
      'style': 'position: fixed; top: 50%; width: 10px; height: 10px; overflow: hidden; opacity: 0'
    }, pasteBinDefaultContent);
    if (global$1.ie || global$1.gecko) {
      dom.setStyle(pasteBinElm, 'left', dom.getStyle(body, 'direction', true) === 'rtl' ? 65535 : -65535);
    }
    dom.bind(pasteBinElm, 'beforedeactivate focusin focusout', function (e) {
      e.stopPropagation();
    });
    delegatePasteEvents(editor, pasteBinElm, pasteBinDefaultContent);
    pasteBinElm.focus();
    editor.selection.select(pasteBinElm, true);
  };
  var remove = function (editor, lastRngCell) {
    if (getEl(editor)) {
      var pasteBinClone = void 0;
      var lastRng = lastRngCell.get();
      while (pasteBinClone = editor.dom.get('mcepastebin')) {
        editor.dom.remove(pasteBinClone);
        editor.dom.unbind(pasteBinClone);
      }
      if (lastRng) {
        editor.selection.setRng(lastRng);
      }
    }
    lastRngCell.set(null);
  };
  var getEl = function (editor) {
    return editor.dom.get('mcepastebin');
  };
  var getHtml = function (editor) {
    var pasteBinElm, pasteBinClones, i, dirtyWrappers, cleanWrapper;
    var copyAndRemove = function (toElm, fromElm) {
      toElm.appendChild(fromElm);
      editor.dom.remove(fromElm, true);
    };
    pasteBinClones = global$3.grep(getPasteBinParent(editor).childNodes, function (elm) {
      return elm.id === 'mcepastebin';
    });
    pasteBinElm = pasteBinClones.shift();
    global$3.each(pasteBinClones, function (pasteBinClone) {
      copyAndRemove(pasteBinElm, pasteBinClone);
    });
    dirtyWrappers = editor.dom.select('div[id=mcepastebin]', pasteBinElm);
    for (i = dirtyWrappers.length - 1; i >= 0; i--) {
      cleanWrapper = editor.dom.create('div');
      pasteBinElm.insertBefore(cleanWrapper, dirtyWrappers[i]);
      copyAndRemove(cleanWrapper, dirtyWrappers[i]);
    }
    return pasteBinElm ? pasteBinElm.innerHTML : '';
  };
  var getLastRng = function (lastRng) {
    return lastRng.get();
  };
  var isDefaultContent = function (pasteBinDefaultContent, content) {
    return content === pasteBinDefaultContent;
  };
  var isPasteBin = function (elm) {
    return elm && elm.id === 'mcepastebin';
  };
  var isDefault = function (editor, pasteBinDefaultContent) {
    var pasteBinElm = getEl(editor);
    return isPasteBin(pasteBinElm) && isDefaultContent(pasteBinDefaultContent, pasteBinElm.innerHTML);
  };
  var PasteBin = function (editor) {
    var lastRng = Cell(null);
    var pasteBinDefaultContent = '%MCEPASTEBIN%';
    return {
      create: function () {
        return create(editor, lastRng, pasteBinDefaultContent);
      },
      remove: function () {
        return remove(editor, lastRng);
      },
      getEl: function () {
        return getEl(editor);
      },
      getHtml: function () {
        return getHtml(editor);
      },
      getLastRng: function () {
        return getLastRng(lastRng);
      },
      isDefault: function () {
        return isDefault(editor, pasteBinDefaultContent);
      },
      isDefaultContent: function (content) {
        return isDefaultContent(pasteBinDefaultContent, content);
      }
    };
  };
  var Clipboard = function (editor, pasteFormat) {
    var pasteBin = PasteBin(editor);
    editor.on('preInit', function () {
      return registerEventsAndFilters(editor, pasteBin, pasteFormat);
    });
    return {
      pasteFormat: pasteFormat,
      pasteHtml: function (html, internalFlag) {
        return pasteHtml$1(editor, html, internalFlag);
      },
      pasteText: function (text) {
        return pasteText(editor, text);
      },
      pasteImageData: function (e, rng) {
        return pasteImageData(editor, e, rng);
      },
      getDataTransferItems: getDataTransferItems,
      hasHtmlOrText: hasHtmlOrText,
      hasContentType: hasContentType
    };
  };
  var noop = function () {
  };
  var hasWorkingClipboardApi = function (clipboardData) {
    return global$1.iOS === false && clipboardData !== undefined && typeof clipboardData.setData === 'function' && $_2u5gcyj0jkmcwplv.isMsEdge() !== true;
  };
  var setHtml5Clipboard = function (clipboardData, html, text) {
    if (hasWorkingClipboardApi(clipboardData)) {
      try {
        clipboardData.clearData();
        clipboardData.setData('text/html', html);
        clipboardData.setData('text/plain', text);
        clipboardData.setData($_93gcj3irjkmcwpld.internalHtmlMime(), html);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };
  var setClipboardData = function (evt, data, fallback, done) {
    if (setHtml5Clipboard(evt.clipboardData, data.html, data.text)) {
      evt.preventDefault();
      done();
    } else {
      fallback(data.html, done);
    }
  };
  var fallback = function (editor) {
    return function (html, done) {
      var markedHtml = $_93gcj3irjkmcwpld.mark(html);
      var outer = editor.dom.create('div', {
        'contenteditable': 'false',
        'data-mce-bogus': 'all'
      });
      var inner = editor.dom.create('div', { contenteditable: 'true' }, markedHtml);
      editor.dom.setStyles(outer, {
        position: 'fixed',
        top: '0',
        left: '-3000px',
        width: '1000px',
        overflow: 'hidden'
      });
      outer.appendChild(inner);
      editor.dom.add(editor.getBody(), outer);
      var range = editor.selection.getRng();
      inner.focus();
      var offscreenRange = editor.dom.createRng();
      offscreenRange.selectNodeContents(inner);
      editor.selection.setRng(offscreenRange);
      setTimeout(function () {
        editor.selection.setRng(range);
        outer.parentNode.removeChild(outer);
        done();
      }, 0);
    };
  };
  var getData = function (editor) {
    return {
      html: editor.selection.getContent({ contextual: true }),
      text: editor.selection.getContent({ format: 'text' })
    };
  };
  var cut = function (editor) {
    return function (evt) {
      if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), function () {
          setTimeout(function () {
            editor.execCommand('Delete');
          }, 0);
        });
      }
    };
  };
  var copy = function (editor) {
    return function (evt) {
      if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), noop);
      }
    };
  };
  var register$1 = function (editor) {
    editor.on('cut', cut(editor));
    editor.on('copy', copy(editor));
  };
  var $_5k6lg4j3jkmcwpmg = { register: register$1 };
  var global$10 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');
  var getCaretRangeFromEvent = function (editor, e) {
    return global$10.getCaretRangeFromPoint(e.clientX, e.clientY, editor.getDoc());
  };
  var isPlainTextFileUrl = function (content) {
    var plainTextContent = content['text/plain'];
    return plainTextContent ? plainTextContent.indexOf('file://') === 0 : false;
  };
  var setFocusedRange = function (editor, rng) {
    editor.focus();
    editor.selection.setRng(rng);
  };
  var setup = function (editor, clipboard, draggingInternallyState) {
    if ($_5peev0ikjkmcwpkv.shouldBlockDrop(editor)) {
      editor.on('dragend dragover draggesture dragdrop drop drag', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
    if (!$_5peev0ikjkmcwpkv.shouldPasteDataImages(editor)) {
      editor.on('drop', function (e) {
        var dataTransfer = e.dataTransfer;
        if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
          e.preventDefault();
        }
      });
    }
    editor.on('drop', function (e) {
      var dropContent, rng;
      rng = getCaretRangeFromEvent(editor, e);
      if (e.isDefaultPrevented() || draggingInternallyState.get()) {
        return;
      }
      dropContent = clipboard.getDataTransferItems(e.dataTransfer);
      var internal = clipboard.hasContentType(dropContent, $_93gcj3irjkmcwpld.internalHtmlMime());
      if ((!clipboard.hasHtmlOrText(dropContent) || isPlainTextFileUrl(dropContent)) && clipboard.pasteImageData(e, rng)) {
        return;
      }
      if (rng && $_5peev0ikjkmcwpkv.shouldFilterDrop(editor)) {
        var content_1 = dropContent['mce-internal'] || dropContent['text/html'] || dropContent['text/plain'];
        if (content_1) {
          e.preventDefault();
          global$2.setEditorTimeout(editor, function () {
            editor.undoManager.transact(function () {
              if (dropContent['mce-internal']) {
                editor.execCommand('Delete');
              }
              setFocusedRange(editor, rng);
              content_1 = $_2u5gcyj0jkmcwplv.trimHtml(content_1);
              if (!dropContent['text/html']) {
                clipboard.pasteText(content_1);
              } else {
                clipboard.pasteHtml(content_1, internal);
              }
            });
          });
        }
      }
    });
    editor.on('dragstart', function (e) {
      draggingInternallyState.set(true);
    });
    editor.on('dragover dragend', function (e) {
      if ($_5peev0ikjkmcwpkv.shouldPasteDataImages(editor) && draggingInternallyState.get() === false) {
        e.preventDefault();
        setFocusedRange(editor, getCaretRangeFromEvent(editor, e));
      }
      if (e.type === 'dragend') {
        draggingInternallyState.set(false);
      }
    });
  };
  var $_eiqz0aj4jkmcwpmj = { setup: setup };
  var setup$1 = function (editor) {
    var plugin = editor.plugins.paste;
    var preProcess = $_5peev0ikjkmcwpkv.getPreProcess(editor);
    if (preProcess) {
      editor.on('PastePreProcess', function (e) {
        preProcess.call(plugin, plugin, e);
      });
    }
    var postProcess = $_5peev0ikjkmcwpkv.getPostProcess(editor);
    if (postProcess) {
      editor.on('PastePostProcess', function (e) {
        postProcess.call(plugin, plugin, e);
      });
    }
  };
  var $_9alamfj6jkmcwpmm = { setup: setup$1 };
  function addPreProcessFilter(editor, filterFunc) {
    editor.on('PastePreProcess', function (e) {
      e.content = filterFunc(editor, e.content, e.internal, e.wordContent);
    });
  }
  function addPostProcessFilter(editor, filterFunc) {
    editor.on('PastePostProcess', function (e) {
      filterFunc(editor, e.node);
    });
  }
  function removeExplorerBrElementsAfterBlocks(editor, html) {
    if (!$_759xt5ivjkmcwplk.isWordContent(html)) {
      return html;
    }
    var blockElements = [];
    global$3.each(editor.schema.getBlockElements(), function (block, blockName) {
      blockElements.push(blockName);
    });
    var explorerBlocksRegExp = new RegExp('(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?(' + blockElements.join('|') + ')[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*', 'g');
    html = $_2u5gcyj0jkmcwplv.filter(html, [[
        explorerBlocksRegExp,
        '$1'
      ]]);
    html = $_2u5gcyj0jkmcwplv.filter(html, [
      [
        /<br><br>/g,
        '<BR><BR>'
      ],
      [
        /<br>/g,
        ' '
      ],
      [
        /<BR><BR>/g,
        '<br>'
      ]
    ]);
    return html;
  }
  function removeWebKitStyles(editor, content, internal, isWordHtml) {
    if (isWordHtml || internal) {
      return content;
    }
    var webKitStylesSetting = $_5peev0ikjkmcwpkv.getWebkitStyles(editor);
    var webKitStyles;
    if ($_5peev0ikjkmcwpkv.shouldRemoveWebKitStyles(editor) === false || webKitStylesSetting === 'all') {
      return content;
    }
    if (webKitStylesSetting) {
      webKitStyles = webKitStylesSetting.split(/[, ]/);
    }
    if (webKitStyles) {
      var dom_1 = editor.dom, node_1 = editor.selection.getNode();
      content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, function (all, before, value, after) {
        var inputStyles = dom_1.parseStyle(dom_1.decode(value));
        var outputStyles = {};
        if (webKitStyles === 'none') {
          return before + after;
        }
        for (var i = 0; i < webKitStyles.length; i++) {
          var inputValue = inputStyles[webKitStyles[i]], currentValue = dom_1.getStyle(node_1, webKitStyles[i], true);
          if (/color/.test(webKitStyles[i])) {
            inputValue = dom_1.toHex(inputValue);
            currentValue = dom_1.toHex(currentValue);
          }
          if (currentValue !== inputValue) {
            outputStyles[webKitStyles[i]] = inputValue;
          }
        }
        outputStyles = dom_1.serializeStyle(outputStyles, 'span');
        if (outputStyles) {
          return before + ' style="' + outputStyles + '"' + after;
        }
        return before + after;
      });
    } else {
      content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, '$1$3');
    }
    content = content.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi, function (all, before, value, after) {
      return before + ' style="' + value + '"' + after;
    });
    return content;
  }
  function removeUnderlineAndFontInAnchor(editor, root) {
    editor.$('a', root).find('font,u').each(function (i, node) {
      editor.dom.remove(node, true);
    });
  }
  var setup$2 = function (editor) {
    if (global$1.webkit) {
      addPreProcessFilter(editor, removeWebKitStyles);
    }
    if (global$1.ie) {
      addPreProcessFilter(editor, removeExplorerBrElementsAfterBlocks);
      addPostProcessFilter(editor, removeUnderlineAndFontInAnchor);
    }
  };
  var $_ca6muwj7jkmcwpmo = { setup: setup$2 };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var stateChange = function (editor, clipboard, e) {
    var ctrl = e.control;
    ctrl.active(clipboard.pasteFormat.get() === 'text');
    editor.on('PastePlainTextToggle', function (e) {
      ctrl.active(e.state);
    });
  };
  var register$2 = function (editor, clipboard) {
    var postRender = curry(stateChange, editor, clipboard);
    editor.addButton('pastetext', {
      active: false,
      icon: 'pastetext',
      tooltip: 'Paste as text',
      cmd: 'mceTogglePlainTextPaste',
      onPostRender: postRender
    });
    editor.addMenuItem('pastetext', {
      text: 'Paste as text',
      selectable: true,
      active: clipboard.pasteFormat,
      cmd: 'mceTogglePlainTextPaste',
      onPostRender: postRender
    });
  };
  var $_98erksj8jkmcwpmr = { register: register$2 };
  global.add('paste', function (editor) {
    if ($_ee0gktiejkmcwpkb.hasProPlugin(editor) === false) {
      var userIsInformedState = Cell(false);
      var draggingInternallyState = Cell(false);
      var pasteFormat = Cell($_5peev0ikjkmcwpkv.isPasteAsTextEnabled(editor) ? 'text' : 'html');
      var clipboard = Clipboard(editor, pasteFormat);
      var quirks = $_ca6muwj7jkmcwpmo.setup(editor);
      $_98erksj8jkmcwpmr.register(editor, clipboard);
      $_gh26txihjkmcwpkr.register(editor, clipboard, userIsInformedState);
      $_9alamfj6jkmcwpmm.setup(editor);
      $_5k6lg4j3jkmcwpmg.register(editor);
      $_eiqz0aj4jkmcwpmj.setup(editor, clipboard, draggingInternallyState);
      return $_6khw6eigjkmcwpkp.get(clipboard, quirks);
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var print = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var register = function (editor) {
    editor.addCommand('mcePrint', function () {
      editor.getWin().print();
    });
  };
  var $_2erysvjljkmcwpqj = { register: register };
  var register$1 = function (editor) {
    editor.addButton('print', {
      title: 'Print',
      cmd: 'mcePrint'
    });
    editor.addMenuItem('print', {
      text: 'Print',
      cmd: 'mcePrint',
      icon: 'print'
    });
  };
  var $_2k5wrxjmjkmcwpqk = { register: register$1 };
  global.add('print', function (editor) {
    $_2erysvjljkmcwpqj.register(editor);
    $_2k5wrxjmjkmcwpqk.register(editor);
    editor.addShortcut('Meta+P', '', 'mcePrint');
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var searchreplace = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  function isContentEditableFalse(node) {
    return node && node.nodeType === 1 && node.contentEditable === 'false';
  }
  function findAndReplaceDOMText(regex, node, replacementNode, captureGroup, schema) {
    var m;
    var matches = [];
    var text, count = 0, doc;
    var blockElementsMap, hiddenTextElementsMap, shortEndedElementsMap;
    doc = node.ownerDocument;
    blockElementsMap = schema.getBlockElements();
    hiddenTextElementsMap = schema.getWhiteSpaceElements();
    shortEndedElementsMap = schema.getShortEndedElements();
    function getMatchIndexes(m, captureGroup) {
      captureGroup = captureGroup || 0;
      if (!m[0]) {
        throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
      }
      var index = m.index;
      if (captureGroup > 0) {
        var cg = m[captureGroup];
        if (!cg) {
          throw new Error('Invalid capture group');
        }
        index += m[0].indexOf(cg);
        m[0] = cg;
      }
      return [
        index,
        index + m[0].length,
        [m[0]]
      ];
    }
    function getText(node) {
      var txt;
      if (node.nodeType === 3) {
        return node.data;
      }
      if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
        return '';
      }
      txt = '';
      if (isContentEditableFalse(node)) {
        return '\n';
      }
      if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
        txt += '\n';
      }
      if (node = node.firstChild) {
        do {
          txt += getText(node);
        } while (node = node.nextSibling);
      }
      return txt;
    }
    function stepThroughMatches(node, matches, replaceFn) {
      var startNode, endNode, startNodeIndex, endNodeIndex, innerNodes = [], atIndex = 0, curNode = node, matchLocation = matches.shift(), matchIndex = 0;
      out:
        while (true) {
          if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName] || isContentEditableFalse(curNode)) {
            atIndex++;
          }
          if (curNode.nodeType === 3) {
            if (!endNode && curNode.length + atIndex >= matchLocation[1]) {
              endNode = curNode;
              endNodeIndex = matchLocation[1] - atIndex;
            } else if (startNode) {
              innerNodes.push(curNode);
            }
            if (!startNode && curNode.length + atIndex > matchLocation[0]) {
              startNode = curNode;
              startNodeIndex = matchLocation[0] - atIndex;
            }
            atIndex += curNode.length;
          }
          if (startNode && endNode) {
            curNode = replaceFn({
              startNode: startNode,
              startNodeIndex: startNodeIndex,
              endNode: endNode,
              endNodeIndex: endNodeIndex,
              innerNodes: innerNodes,
              match: matchLocation[2],
              matchIndex: matchIndex
            });
            atIndex -= endNode.length - endNodeIndex;
            startNode = null;
            endNode = null;
            innerNodes = [];
            matchLocation = matches.shift();
            matchIndex++;
            if (!matchLocation) {
              break;
            }
          } else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
            if (!isContentEditableFalse(curNode)) {
              curNode = curNode.firstChild;
              continue;
            }
          } else if (curNode.nextSibling) {
            curNode = curNode.nextSibling;
            continue;
          }
          while (true) {
            if (curNode.nextSibling) {
              curNode = curNode.nextSibling;
              break;
            } else if (curNode.parentNode !== node) {
              curNode = curNode.parentNode;
            } else {
              break out;
            }
          }
        }
    }
    function genReplacer(nodeName) {
      var makeReplacementNode;
      if (typeof nodeName !== 'function') {
        var stencilNode_1 = nodeName.nodeType ? nodeName : doc.createElement(nodeName);
        makeReplacementNode = function (fill, matchIndex) {
          var clone = stencilNode_1.cloneNode(false);
          clone.setAttribute('data-mce-index', matchIndex);
          if (fill) {
            clone.appendChild(doc.createTextNode(fill));
          }
          return clone;
        };
      } else {
        makeReplacementNode = nodeName;
      }
      return function (range) {
        var before;
        var after;
        var parentNode;
        var startNode = range.startNode;
        var endNode = range.endNode;
        var matchIndex = range.matchIndex;
        if (startNode === endNode) {
          var node_1 = startNode;
          parentNode = node_1.parentNode;
          if (range.startNodeIndex > 0) {
            before = doc.createTextNode(node_1.data.substring(0, range.startNodeIndex));
            parentNode.insertBefore(before, node_1);
          }
          var el = makeReplacementNode(range.match[0], matchIndex);
          parentNode.insertBefore(el, node_1);
          if (range.endNodeIndex < node_1.length) {
            after = doc.createTextNode(node_1.data.substring(range.endNodeIndex));
            parentNode.insertBefore(after, node_1);
          }
          node_1.parentNode.removeChild(node_1);
          return el;
        }
        before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
        after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
        var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
        var innerEls = [];
        for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
          var innerNode = range.innerNodes[i];
          var innerEl = makeReplacementNode(innerNode.data, matchIndex);
          innerNode.parentNode.replaceChild(innerEl, innerNode);
          innerEls.push(innerEl);
        }
        var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
        parentNode = startNode.parentNode;
        parentNode.insertBefore(before, startNode);
        parentNode.insertBefore(elA, startNode);
        parentNode.removeChild(startNode);
        parentNode = endNode.parentNode;
        parentNode.insertBefore(elB, endNode);
        parentNode.insertBefore(after, endNode);
        parentNode.removeChild(endNode);
        return elB;
      };
    }
    text = getText(node);
    if (!text) {
      return;
    }
    if (regex.global) {
      while (m = regex.exec(text)) {
        matches.push(getMatchIndexes(m, captureGroup));
      }
    } else {
      m = text.match(regex);
      matches.push(getMatchIndexes(m, captureGroup));
    }
    if (matches.length) {
      count = matches.length;
      stepThroughMatches(node, matches, genReplacer(replacementNode));
    }
    return count;
  }
  var $_2vfkuyk1jkmcwprj = { findAndReplaceDOMText: findAndReplaceDOMText };
  var getElmIndex = function (elm) {
    var value = elm.getAttribute('data-mce-index');
    if (typeof value === 'number') {
      return '' + value;
    }
    return value;
  };
  var markAllMatches = function (editor, currentIndexState, regex) {
    var node, marker;
    marker = editor.dom.create('span', { 'data-mce-bogus': 1 });
    marker.className = 'mce-match-marker';
    node = editor.getBody();
    done(editor, currentIndexState, false);
    return $_2vfkuyk1jkmcwprj.findAndReplaceDOMText(regex, node, marker, false, editor.schema);
  };
  var unwrap = function (node) {
    var parentNode = node.parentNode;
    if (node.firstChild) {
      parentNode.insertBefore(node.firstChild, node);
    }
    node.parentNode.removeChild(node);
  };
  var findSpansByIndex = function (editor, index) {
    var nodes;
    var spans = [];
    nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
    if (nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        if (nodeIndex === null || !nodeIndex.length) {
          continue;
        }
        if (nodeIndex === index.toString()) {
          spans.push(nodes[i]);
        }
      }
    }
    return spans;
  };
  var moveSelection = function (editor, currentIndexState, forward) {
    var testIndex = currentIndexState.get();
    var dom = editor.dom;
    forward = forward !== false;
    if (forward) {
      testIndex++;
    } else {
      testIndex--;
    }
    dom.removeClass(findSpansByIndex(editor, currentIndexState.get()), 'mce-match-marker-selected');
    var spans = findSpansByIndex(editor, testIndex);
    if (spans.length) {
      dom.addClass(findSpansByIndex(editor, testIndex), 'mce-match-marker-selected');
      editor.selection.scrollIntoView(spans[0]);
      return testIndex;
    }
    return -1;
  };
  var removeNode = function (dom, node) {
    var parent = node.parentNode;
    dom.remove(node);
    if (dom.isEmpty(parent)) {
      dom.remove(parent);
    }
  };
  var find = function (editor, currentIndexState, text, matchCase, wholeWord) {
    text = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    text = text.replace(/\s/g, '\\s');
    text = wholeWord ? '\\b' + text + '\\b' : text;
    var count = markAllMatches(editor, currentIndexState, new RegExp(text, matchCase ? 'g' : 'gi'));
    if (count) {
      currentIndexState.set(-1);
      currentIndexState.set(moveSelection(editor, currentIndexState, true));
    }
    return count;
  };
  var next = function (editor, currentIndexState) {
    var index = moveSelection(editor, currentIndexState, true);
    if (index !== -1) {
      currentIndexState.set(index);
    }
  };
  var prev = function (editor, currentIndexState) {
    var index = moveSelection(editor, currentIndexState, false);
    if (index !== -1) {
      currentIndexState.set(index);
    }
  };
  var isMatchSpan = function (node) {
    var matchIndex = getElmIndex(node);
    return matchIndex !== null && matchIndex.length > 0;
  };
  var replace = function (editor, currentIndexState, text, forward, all) {
    var i, nodes, node, matchIndex, currentMatchIndex, nextIndex = currentIndexState.get(), hasMore;
    forward = forward !== false;
    node = editor.getBody();
    nodes = global$1.grep(global$1.toArray(node.getElementsByTagName('span')), isMatchSpan);
    for (i = 0; i < nodes.length; i++) {
      var nodeIndex = getElmIndex(nodes[i]);
      matchIndex = currentMatchIndex = parseInt(nodeIndex, 10);
      if (all || matchIndex === currentIndexState.get()) {
        if (text.length) {
          nodes[i].firstChild.nodeValue = text;
          unwrap(nodes[i]);
        } else {
          removeNode(editor.dom, nodes[i]);
        }
        while (nodes[++i]) {
          matchIndex = parseInt(getElmIndex(nodes[i]), 10);
          if (matchIndex === currentMatchIndex) {
            removeNode(editor.dom, nodes[i]);
          } else {
            i--;
            break;
          }
        }
        if (forward) {
          nextIndex--;
        }
      } else if (currentMatchIndex > currentIndexState.get()) {
        nodes[i].setAttribute('data-mce-index', currentMatchIndex - 1);
      }
    }
    currentIndexState.set(nextIndex);
    if (forward) {
      hasMore = hasNext(editor, currentIndexState);
      next(editor, currentIndexState);
    } else {
      hasMore = hasPrev(editor, currentIndexState);
      prev(editor, currentIndexState);
    }
    return !all && hasMore;
  };
  var done = function (editor, currentIndexState, keepEditorSelection) {
    var i, nodes, startContainer, endContainer;
    nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
    for (i = 0; i < nodes.length; i++) {
      var nodeIndex = getElmIndex(nodes[i]);
      if (nodeIndex !== null && nodeIndex.length) {
        if (nodeIndex === currentIndexState.get().toString()) {
          if (!startContainer) {
            startContainer = nodes[i].firstChild;
          }
          endContainer = nodes[i].firstChild;
        }
        unwrap(nodes[i]);
      }
    }
    if (startContainer && endContainer) {
      var rng = editor.dom.createRng();
      rng.setStart(startContainer, 0);
      rng.setEnd(endContainer, endContainer.data.length);
      if (keepEditorSelection !== false) {
        editor.selection.setRng(rng);
      }
      return rng;
    }
  };
  var hasNext = function (editor, currentIndexState) {
    return findSpansByIndex(editor, currentIndexState.get() + 1).length > 0;
  };
  var hasPrev = function (editor, currentIndexState) {
    return findSpansByIndex(editor, currentIndexState.get() - 1).length > 0;
  };
  var $_f6rasljzjkmcwprd = {
    done: done,
    find: find,
    next: next,
    prev: prev,
    replace: replace,
    hasNext: hasNext,
    hasPrev: hasPrev
  };
  var get = function (editor, currentIndexState) {
    var done = function (keepEditorSelection) {
      return $_f6rasljzjkmcwprd.done(editor, currentIndexState, keepEditorSelection);
    };
    var find = function (text, matchCase, wholeWord) {
      return $_f6rasljzjkmcwprd.find(editor, currentIndexState, text, matchCase, wholeWord);
    };
    var next = function () {
      return $_f6rasljzjkmcwprd.next(editor, currentIndexState);
    };
    var prev = function () {
      return $_f6rasljzjkmcwprd.prev(editor, currentIndexState);
    };
    var replace = function (text, forward, all) {
      return $_f6rasljzjkmcwprd.replace(editor, currentIndexState, text, forward, all);
    };
    return {
      done: done,
      find: find,
      next: next,
      prev: prev,
      replace: replace
    };
  };
  var $_aeho3jyjkmcwpra = { get: get };
  var open = function (editor, currentIndexState) {
    var last = {}, selectedText;
    editor.undoManager.add();
    selectedText = global$1.trim(editor.selection.getContent({ format: 'text' }));
    function updateButtonStates() {
      win.statusbar.find('#next').disabled($_f6rasljzjkmcwprd.hasNext(editor, currentIndexState) === false);
      win.statusbar.find('#prev').disabled($_f6rasljzjkmcwprd.hasPrev(editor, currentIndexState) === false);
    }
    function notFoundAlert() {
      editor.windowManager.alert('Could not find the specified string.', function () {
        win.find('#find')[0].focus();
      });
    }
    var win = editor.windowManager.open({
      layout: 'flex',
      pack: 'center',
      align: 'center',
      onClose: function () {
        editor.focus();
        $_f6rasljzjkmcwprd.done(editor, currentIndexState);
        editor.undoManager.add();
      },
      onSubmit: function (e) {
        var count, caseState, text, wholeWord;
        e.preventDefault();
        caseState = win.find('#case').checked();
        wholeWord = win.find('#words').checked();
        text = win.find('#find').value();
        if (!text.length) {
          $_f6rasljzjkmcwprd.done(editor, currentIndexState, false);
          win.statusbar.items().slice(1).disabled(true);
          return;
        }
        if (last.text === text && last.caseState === caseState && last.wholeWord === wholeWord) {
          if (!$_f6rasljzjkmcwprd.hasNext(editor, currentIndexState)) {
            notFoundAlert();
            return;
          }
          $_f6rasljzjkmcwprd.next(editor, currentIndexState);
          updateButtonStates();
          return;
        }
        count = $_f6rasljzjkmcwprd.find(editor, currentIndexState, text, caseState, wholeWord);
        if (!count) {
          notFoundAlert();
        }
        win.statusbar.items().slice(1).disabled(count === 0);
        updateButtonStates();
        last = {
          text: text,
          caseState: caseState,
          wholeWord: wholeWord
        };
      },
      buttons: [
        {
          text: 'Find',
          subtype: 'primary',
          onclick: function () {
            win.submit();
          }
        },
        {
          text: 'Replace',
          disabled: true,
          onclick: function () {
            if (!$_f6rasljzjkmcwprd.replace(editor, currentIndexState, win.find('#replace').value())) {
              win.statusbar.items().slice(1).disabled(true);
              currentIndexState.set(-1);
              last = {};
            }
          }
        },
        {
          text: 'Replace all',
          disabled: true,
          onclick: function () {
            $_f6rasljzjkmcwprd.replace(editor, currentIndexState, win.find('#replace').value(), true, true);
            win.statusbar.items().slice(1).disabled(true);
            last = {};
          }
        },
        {
          type: 'spacer',
          flex: 1
        },
        {
          text: 'Prev',
          name: 'prev',
          disabled: true,
          onclick: function () {
            $_f6rasljzjkmcwprd.prev(editor, currentIndexState);
            updateButtonStates();
          }
        },
        {
          text: 'Next',
          name: 'next',
          disabled: true,
          onclick: function () {
            $_f6rasljzjkmcwprd.next(editor, currentIndexState);
            updateButtonStates();
          }
        }
      ],
      title: 'Find and replace',
      items: {
        type: 'form',
        padding: 20,
        labelGap: 30,
        spacing: 10,
        items: [
          {
            type: 'textbox',
            name: 'find',
            size: 40,
            label: 'Find',
            value: selectedText
          },
          {
            type: 'textbox',
            name: 'replace',
            size: 40,
            label: 'Replace with'
          },
          {
            type: 'checkbox',
            name: 'case',
            text: 'Match case',
            label: ' '
          },
          {
            type: 'checkbox',
            name: 'words',
            text: 'Whole words',
            label: ' '
          }
        ]
      }
    });
  };
  var $_54e0m7k3jkmcwprp = { open: open };
  var register = function (editor, currentIndexState) {
    editor.addCommand('SearchReplace', function () {
      $_54e0m7k3jkmcwprp.open(editor, currentIndexState);
    });
  };
  var $_2k91tsk2jkmcwpro = { register: register };
  var showDialog = function (editor, currentIndexState) {
    return function () {
      $_54e0m7k3jkmcwprp.open(editor, currentIndexState);
    };
  };
  var register$1 = function (editor, currentIndexState) {
    editor.addMenuItem('searchreplace', {
      text: 'Find and replace',
      shortcut: 'Meta+F',
      onclick: showDialog(editor, currentIndexState),
      separator: 'before',
      context: 'edit'
    });
    editor.addButton('searchreplace', {
      tooltip: 'Find and replace',
      onclick: showDialog(editor, currentIndexState)
    });
    editor.shortcuts.add('Meta+F', '', showDialog(editor, currentIndexState));
  };
  var $_a57hmjk4jkmcwprx = { register: register$1 };
  global.add('searchreplace', function (editor) {
    var currentIndexState = Cell(-1);
    $_2k91tsk2jkmcwpro.register(editor, currentIndexState);
    $_a57hmjk4jkmcwprx.register(editor, currentIndexState);
    return $_aeho3jyjkmcwpra.get(editor, currentIndexState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var tabfocus = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.EditorManager');
  var global$3 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$6 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var getTabFocusElements = function (editor) {
    return editor.getParam('tabfocus_elements', ':prev,:next');
  };
  var getTabFocus = function (editor) {
    return editor.getParam('tab_focus', getTabFocusElements(editor));
  };
  var $_97qheekwjkmcwpw7 = { getTabFocus: getTabFocus };
  var DOM = global$1.DOM;
  var tabCancel = function (e) {
    if (e.keyCode === global$6.TAB && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
    }
  };
  var setup = function (editor) {
    function tabHandler(e) {
      var x, el, v, i;
      if (e.keyCode !== global$6.TAB || e.ctrlKey || e.altKey || e.metaKey || e.isDefaultPrevented()) {
        return;
      }
      function find(direction) {
        el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');
        function canSelectRecursive(e) {
          return e.nodeName === 'BODY' || e.type !== 'hidden' && e.style.display !== 'none' && e.style.visibility !== 'hidden' && canSelectRecursive(e.parentNode);
        }
        function canSelect(el) {
          return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && global$2.get(e.id) && el.tabIndex !== -1 && canSelectRecursive(el);
        }
        global$5.each(el, function (e, i) {
          if (e.id === editor.id) {
            x = i;
            return false;
          }
        });
        if (direction > 0) {
          for (i = x + 1; i < el.length; i++) {
            if (canSelect(el[i])) {
              return el[i];
            }
          }
        } else {
          for (i = x - 1; i >= 0; i--) {
            if (canSelect(el[i])) {
              return el[i];
            }
          }
        }
        return null;
      }
      v = global$5.explode($_97qheekwjkmcwpw7.getTabFocus(editor));
      if (v.length === 1) {
        v[1] = v[0];
        v[0] = ':prev';
      }
      if (e.shiftKey) {
        if (v[0] === ':prev') {
          el = find(-1);
        } else {
          el = DOM.get(v[0]);
        }
      } else {
        if (v[1] === ':next') {
          el = find(1);
        } else {
          el = DOM.get(v[1]);
        }
      }
      if (el) {
        var focusEditor = global$2.get(el.id || el.name);
        if (el.id && focusEditor) {
          focusEditor.focus();
        } else {
          global$4.setTimeout(function () {
            if (!global$3.webkit) {
              window.focus();
            }
            el.focus();
          }, 10);
        }
        e.preventDefault();
      }
    }
    editor.on('init', function () {
      if (editor.inline) {
        DOM.setAttrib(editor.getBody(), 'tabIndex', null);
      }
      editor.on('keyup', tabCancel);
      if (global$3.gecko) {
        editor.on('keypress keydown', tabHandler);
      } else {
        editor.on('keydown', tabHandler);
      }
    });
  };
  var $_5ayj4bkpjkmcwpw2 = { setup: setup };
  global.add('tabfocus', function (editor) {
    $_5ayj4bkpjkmcwpw2.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var template = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.XHR');
  var global$3 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var getCreationDateClasses = function (editor) {
    return editor.getParam('template_cdate_classes', 'cdate');
  };
  var getModificationDateClasses = function (editor) {
    return editor.getParam('template_mdate_classes', 'mdate');
  };
  var getSelectedContentClasses = function (editor) {
    return editor.getParam('template_selected_content_classes', 'selcontent');
  };
  var getPreviewReplaceValues = function (editor) {
    return editor.getParam('template_preview_replace_values');
  };
  var getTemplateReplaceValues = function (editor) {
    return editor.getParam('template_replace_values');
  };
  var getTemplates = function (editorSettings) {
    return editorSettings.templates;
  };
  var getCdateFormat = function (editor) {
    return editor.getParam('template_cdate_format', editor.getLang('template.cdate_format'));
  };
  var getMdateFormat = function (editor) {
    return editor.getParam('template_mdate_format', editor.getLang('template.mdate_format'));
  };
  var getDialogWidth = function (editor) {
    return editor.getParam('template_popup_width', 600);
  };
  var getDialogHeight = function (editor) {
    return Math.min(global$3.DOM.getViewPort().h, editor.getParam('template_popup_height', 500));
  };
  var $_j4vdpr9jkmcws43 = {
    getCreationDateClasses: getCreationDateClasses,
    getModificationDateClasses: getModificationDateClasses,
    getSelectedContentClasses: getSelectedContentClasses,
    getPreviewReplaceValues: getPreviewReplaceValues,
    getTemplateReplaceValues: getTemplateReplaceValues,
    getTemplates: getTemplates,
    getCdateFormat: getCdateFormat,
    getMdateFormat: getMdateFormat,
    getDialogWidth: getDialogWidth,
    getDialogHeight: getDialogHeight
  };
  var addZeros = function (value, len) {
    value = '' + value;
    if (value.length < len) {
      for (var i = 0; i < len - value.length; i++) {
        value = '0' + value;
      }
    }
    return value;
  };
  var getDateTime = function (editor, fmt, date) {
    var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
    var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
    var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var monthsLong = 'January February March April May June July August September October November December'.split(' ');
    date = date || new Date();
    fmt = fmt.replace('%D', '%m/%d/%Y');
    fmt = fmt.replace('%r', '%I:%M:%S %p');
    fmt = fmt.replace('%Y', '' + date.getFullYear());
    fmt = fmt.replace('%y', '' + date.getYear());
    fmt = fmt.replace('%m', addZeros(date.getMonth() + 1, 2));
    fmt = fmt.replace('%d', addZeros(date.getDate(), 2));
    fmt = fmt.replace('%H', '' + addZeros(date.getHours(), 2));
    fmt = fmt.replace('%M', '' + addZeros(date.getMinutes(), 2));
    fmt = fmt.replace('%S', '' + addZeros(date.getSeconds(), 2));
    fmt = fmt.replace('%I', '' + ((date.getHours() + 11) % 12 + 1));
    fmt = fmt.replace('%p', '' + (date.getHours() < 12 ? 'AM' : 'PM'));
    fmt = fmt.replace('%B', '' + editor.translate(monthsLong[date.getMonth()]));
    fmt = fmt.replace('%b', '' + editor.translate(monthsShort[date.getMonth()]));
    fmt = fmt.replace('%A', '' + editor.translate(daysLong[date.getDay()]));
    fmt = fmt.replace('%a', '' + editor.translate(daysShort[date.getDay()]));
    fmt = fmt.replace('%%', '%');
    return fmt;
  };
  var $_7qxvygrbjkmcws45 = { getDateTime: getDateTime };
  var createTemplateList = function (editorSettings, callback) {
    return function () {
      var templateList = $_j4vdpr9jkmcws43.getTemplates(editorSettings);
      if (typeof templateList === 'function') {
        templateList(callback);
        return;
      }
      if (typeof templateList === 'string') {
        global$2.send({
          url: templateList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else {
        callback(templateList);
      }
    };
  };
  var replaceTemplateValues = function (editor, html, templateValues) {
    global$1.each(templateValues, function (v, k) {
      if (typeof v === 'function') {
        v = v(k);
      }
      html = html.replace(new RegExp('\\{\\$' + k + '\\}', 'g'), v);
    });
    return html;
  };
  var replaceVals = function (editor, e) {
    var dom = editor.dom, vl = $_j4vdpr9jkmcws43.getTemplateReplaceValues(editor);
    global$1.each(dom.select('*', e), function (e) {
      global$1.each(vl, function (v, k) {
        if (dom.hasClass(e, k)) {
          if (typeof vl[k] === 'function') {
            vl[k](e);
          }
        }
      });
    });
  };
  var hasClass = function (n, c) {
    return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
  };
  var insertTemplate = function (editor, ui, html) {
    var el;
    var n;
    var dom = editor.dom;
    var sel = editor.selection.getContent();
    html = replaceTemplateValues(editor, html, $_j4vdpr9jkmcws43.getTemplateReplaceValues(editor));
    el = dom.create('div', null, html);
    n = dom.select('.mceTmpl', el);
    if (n && n.length > 0) {
      el = dom.create('div', null);
      el.appendChild(n[0].cloneNode(true));
    }
    global$1.each(dom.select('*', el), function (n) {
      if (hasClass(n, $_j4vdpr9jkmcws43.getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_7qxvygrbjkmcws45.getDateTime(editor, $_j4vdpr9jkmcws43.getCdateFormat(editor));
      }
      if (hasClass(n, $_j4vdpr9jkmcws43.getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_7qxvygrbjkmcws45.getDateTime(editor, $_j4vdpr9jkmcws43.getMdateFormat(editor));
      }
      if (hasClass(n, $_j4vdpr9jkmcws43.getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = sel;
      }
    });
    replaceVals(editor, el);
    editor.execCommand('mceInsertContent', false, el.innerHTML);
    editor.addVisual();
  };
  var $_dv7lv7r6jkmcws40 = {
    createTemplateList: createTemplateList,
    replaceTemplateValues: replaceTemplateValues,
    replaceVals: replaceVals,
    insertTemplate: insertTemplate
  };
  var register = function (editor) {
    editor.addCommand('mceInsertTemplate', curry($_dv7lv7r6jkmcws40.insertTemplate, editor));
  };
  var $_ga6lx9r4jkmcws3k = { register: register };
  var setup = function (editor) {
    editor.on('PreProcess', function (o) {
      var dom = editor.dom, dateFormat = $_j4vdpr9jkmcws43.getMdateFormat(editor);
      global$1.each(dom.select('div', o.node), function (e) {
        if (dom.hasClass(e, 'mceTmpl')) {
          global$1.each(dom.select('*', e), function (e) {
            if (dom.hasClass(e, editor.getParam('template_mdate_classes', 'mdate').replace(/\s+/g, '|'))) {
              e.innerHTML = $_7qxvygrbjkmcws45.getDateTime(editor, dateFormat);
            }
          });
          $_dv7lv7r6jkmcws40.replaceVals(editor, e);
        }
      });
    });
  };
  var $_cfkisrrcjkmcws47 = { setup: setup };
  var insertIframeHtml = function (editor, win, html) {
    if (html.indexOf('<html>') === -1) {
      var contentCssLinks_1 = '';
      global$1.each(editor.contentCSS, function (url) {
        contentCssLinks_1 += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
      });
      var bodyClass = editor.settings.body_class || '';
      if (bodyClass.indexOf('=') !== -1) {
        bodyClass = editor.getParam('body_class', '', 'hash');
        bodyClass = bodyClass[editor.id] || '';
      }
      html = '<!DOCTYPE html>' + '<html>' + '<head>' + contentCssLinks_1 + '</head>' + '<body class="' + bodyClass + '">' + html + '</body>' + '</html>';
    }
    html = $_dv7lv7r6jkmcws40.replaceTemplateValues(editor, html, $_j4vdpr9jkmcws43.getPreviewReplaceValues(editor));
    var doc = win.find('iframe')[0].getEl().contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  };
  var open = function (editor, templateList) {
    var win;
    var values = [];
    var templateHtml;
    if (!templateList || templateList.length === 0) {
      var message = editor.translate('No templates defined.');
      editor.notificationManager.open({
        text: message,
        type: 'info'
      });
      return;
    }
    global$1.each(templateList, function (template) {
      values.push({
        selected: !values.length,
        text: template.title,
        value: {
          url: template.url,
          content: template.content,
          description: template.description
        }
      });
    });
    var onSelectTemplate = function (e) {
      var value = e.control.value();
      if (value.url) {
        global$2.send({
          url: value.url,
          success: function (html) {
            templateHtml = html;
            insertIframeHtml(editor, win, templateHtml);
          }
        });
      } else {
        templateHtml = value.content;
        insertIframeHtml(editor, win, templateHtml);
      }
      win.find('#description')[0].text(e.control.value().description);
    };
    win = editor.windowManager.open({
      title: 'Insert template',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      padding: 15,
      spacing: 10,
      items: [
        {
          type: 'form',
          flex: 0,
          padding: 0,
          items: [{
              type: 'container',
              label: 'Templates',
              items: {
                type: 'listbox',
                label: 'Templates',
                name: 'template',
                values: values,
                onselect: onSelectTemplate
              }
            }]
        },
        {
          type: 'label',
          name: 'description',
          label: 'Description',
          text: '\xA0'
        },
        {
          type: 'iframe',
          flex: 1,
          border: 1
        }
      ],
      onsubmit: function () {
        $_dv7lv7r6jkmcws40.insertTemplate(editor, false, templateHtml);
      },
      minWidth: $_j4vdpr9jkmcws43.getDialogWidth(editor),
      minHeight: $_j4vdpr9jkmcws43.getDialogHeight(editor)
    });
    win.find('listbox')[0].fire('select');
  };
  var $_3zebchrejkmcws4b = { open: open };
  var showDialog = function (editor) {
    return function (templates) {
      $_3zebchrejkmcws4b.open(editor, templates);
    };
  };
  var register$1 = function (editor) {
    editor.addButton('template', {
      title: 'Insert template',
      onclick: $_dv7lv7r6jkmcws40.createTemplateList(editor.settings, showDialog(editor))
    });
    editor.addMenuItem('template', {
      text: 'Template',
      onclick: $_dv7lv7r6jkmcws40.createTemplateList(editor.settings, showDialog(editor)),
      icon: 'template',
      context: 'insert'
    });
  };
  var $_3pj1nhrdjkmcws49 = { register: register$1 };
  global.add('template', function (editor) {
    $_3pj1nhrdjkmcws49.register(editor);
    $_ga6lx9r4jkmcws3k.register(editor);
    $_cfkisrrcjkmcws47.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var textpattern = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var get = function (patternsState) {
    var setPatterns = function (newPatterns) {
      patternsState.set(newPatterns);
    };
    var getPatterns = function () {
      return patternsState.get();
    };
    return {
      setPatterns: setPatterns,
      getPatterns: getPatterns
    };
  };
  var $_fp2mq2rsjkmcws6f = { get: get };
  var defaultPatterns = [
    {
      start: '*',
      end: '*',
      format: 'italic'
    },
    {
      start: '**',
      end: '**',
      format: 'bold'
    },
    {
      start: '***',
      end: '***',
      format: [
        'bold',
        'italic'
      ]
    },
    {
      start: '#',
      format: 'h1'
    },
    {
      start: '##',
      format: 'h2'
    },
    {
      start: '###',
      format: 'h3'
    },
    {
      start: '####',
      format: 'h4'
    },
    {
      start: '#####',
      format: 'h5'
    },
    {
      start: '######',
      format: 'h6'
    },
    {
      start: '1. ',
      cmd: 'InsertOrderedList'
    },
    {
      start: '* ',
      cmd: 'InsertUnorderedList'
    },
    {
      start: '- ',
      cmd: 'InsertUnorderedList'
    }
  ];
  var getPatterns = function (editorSettings) {
    return editorSettings.textpattern_patterns !== undefined ? editorSettings.textpattern_patterns : defaultPatterns;
  };
  var $_1rurpvrtjkmcws6g = { getPatterns: getPatterns };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var global$3 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var sortPatterns = function (patterns) {
    return patterns.sort(function (a, b) {
      if (a.start.length > b.start.length) {
        return -1;
      }
      if (a.start.length < b.start.length) {
        return 1;
      }
      return 0;
    });
  };
  var findPattern = function (patterns, text) {
    for (var i = 0; i < patterns.length; i++) {
      if (text.indexOf(patterns[i].start) !== 0) {
        continue;
      }
      if (patterns[i].end && text.lastIndexOf(patterns[i].end) !== text.length - patterns[i].end.length) {
        continue;
      }
      return patterns[i];
    }
  };
  var isMatchingPattern = function (pattern, text, offset, delta) {
    var textEnd = text.substr(offset - pattern.end.length - delta, pattern.end.length);
    return textEnd === pattern.end;
  };
  var hasContent = function (offset, delta, pattern) {
    return offset - delta - pattern.end.length - pattern.start.length > 0;
  };
  var findEndPattern = function (patterns, text, offset, delta) {
    var pattern, i;
    var sortedPatterns = sortPatterns(patterns);
    for (i = 0; i < sortedPatterns.length; i++) {
      pattern = sortedPatterns[i];
      if (pattern.end !== undefined && isMatchingPattern(pattern, text, offset, delta) && hasContent(offset, delta, pattern)) {
        return pattern;
      }
    }
  };
  var $_beghvss1jkmcws6v = {
    findPattern: findPattern,
    findEndPattern: findEndPattern
  };
  var splitContainer = function (container, pattern, endOffset, startOffset, space) {
    container = startOffset > 0 ? container.splitText(startOffset) : container;
    container.splitText(endOffset - startOffset + pattern.end.length);
    container.deleteData(0, pattern.start.length);
    container.deleteData(container.data.length - pattern.end.length, pattern.end.length);
    return container;
  };
  var patternFromRng = function (patterns, rng, space) {
    if (rng.collapsed === false) {
      return;
    }
    var container = rng.startContainer;
    var text = container.data;
    var delta = space === true ? 1 : 0;
    if (container.nodeType !== 3) {
      return;
    }
    var endPattern = $_beghvss1jkmcws6v.findEndPattern(patterns, text, rng.startOffset, delta);
    if (endPattern === undefined) {
      return;
    }
    var endOffset = text.lastIndexOf(endPattern.end, rng.startOffset - delta);
    var startOffset = text.lastIndexOf(endPattern.start, endOffset - endPattern.end.length);
    endOffset = text.indexOf(endPattern.end, startOffset + endPattern.start.length);
    if (startOffset === -1) {
      return;
    }
    var patternRng = document.createRange();
    patternRng.setStart(container, startOffset);
    patternRng.setEnd(container, endOffset + endPattern.end.length);
    var startPattern = $_beghvss1jkmcws6v.findPattern(patterns, patternRng.toString());
    if (endPattern === undefined || startPattern !== endPattern || container.data.length <= endPattern.start.length + endPattern.end.length) {
      return;
    }
    return {
      pattern: endPattern,
      startOffset: startOffset,
      endOffset: endOffset
    };
  };
  var splitAndApply = function (editor, container, found, space) {
    var formatArray = global$4.isArray(found.pattern.format) ? found.pattern.format : [found.pattern.format];
    var validFormats = global$4.grep(formatArray, function (formatName) {
      var format = editor.formatter.get(formatName);
      return format && format[0].inline;
    });
    if (validFormats.length !== 0) {
      editor.undoManager.transact(function () {
        container = splitContainer(container, found.pattern, found.endOffset, found.startOffset, space);
        formatArray.forEach(function (format) {
          editor.formatter.apply(format, {}, container);
        });
      });
      return container;
    }
  };
  var doApplyInlineFormat = function (editor, patterns, space) {
    var rng = editor.selection.getRng(true);
    var foundPattern = patternFromRng(patterns, rng, space);
    if (foundPattern) {
      return splitAndApply(editor, rng.startContainer, foundPattern, space);
    }
  };
  var applyInlineFormatSpace = function (editor, patterns) {
    return doApplyInlineFormat(editor, patterns, true);
  };
  var applyInlineFormatEnter = function (editor, patterns) {
    return doApplyInlineFormat(editor, patterns, false);
  };
  var applyBlockFormat = function (editor, patterns) {
    var selection, dom, container, firstTextNode, node, format, textBlockElm, pattern, walker, rng, offset;
    selection = editor.selection;
    dom = editor.dom;
    if (!selection.isCollapsed()) {
      return;
    }
    textBlockElm = dom.getParent(selection.getStart(), 'p');
    if (textBlockElm) {
      walker = new global$3(textBlockElm, textBlockElm);
      while (node = walker.next()) {
        if (node.nodeType === 3) {
          firstTextNode = node;
          break;
        }
      }
      if (firstTextNode) {
        pattern = $_beghvss1jkmcws6v.findPattern(patterns, firstTextNode.data);
        if (!pattern) {
          return;
        }
        rng = selection.getRng(true);
        container = rng.startContainer;
        offset = rng.startOffset;
        if (firstTextNode === container) {
          offset = Math.max(0, offset - pattern.start.length);
        }
        if (global$4.trim(firstTextNode.data).length === pattern.start.length) {
          return;
        }
        if (pattern.format) {
          format = editor.formatter.get(pattern.format);
          if (format && format[0].block) {
            firstTextNode.deleteData(0, pattern.start.length);
            editor.formatter.apply(pattern.format, {}, firstTextNode);
            rng.setStart(container, offset);
            rng.collapse(true);
            selection.setRng(rng);
          }
        }
        if (pattern.cmd) {
          editor.undoManager.transact(function () {
            firstTextNode.deleteData(0, pattern.start.length);
            editor.execCommand(pattern.cmd);
          });
        }
      }
    }
  };
  var $_c3c0zdryjkmcws6m = {
    patternFromRng: patternFromRng,
    applyInlineFormatSpace: applyInlineFormatSpace,
    applyInlineFormatEnter: applyInlineFormatEnter,
    applyBlockFormat: applyBlockFormat
  };
  function handleEnter(editor, patterns) {
    var wrappedTextNode, rng;
    wrappedTextNode = $_c3c0zdryjkmcws6m.applyInlineFormatEnter(editor, patterns);
    if (wrappedTextNode) {
      rng = editor.dom.createRng();
      rng.setStart(wrappedTextNode, wrappedTextNode.data.length);
      rng.setEnd(wrappedTextNode, wrappedTextNode.data.length);
      editor.selection.setRng(rng);
    }
    $_c3c0zdryjkmcws6m.applyBlockFormat(editor, patterns);
  }
  function handleInlineKey(editor, patterns) {
    var wrappedTextNode, lastChar, lastCharNode, rng, dom;
    wrappedTextNode = $_c3c0zdryjkmcws6m.applyInlineFormatSpace(editor, patterns);
    if (wrappedTextNode) {
      dom = editor.dom;
      lastChar = wrappedTextNode.data.slice(-1);
      if (/[\u00a0 ]/.test(lastChar)) {
        wrappedTextNode.deleteData(wrappedTextNode.data.length - 1, 1);
        lastCharNode = dom.doc.createTextNode(lastChar);
        dom.insertAfter(lastCharNode, wrappedTextNode.parentNode);
        rng = dom.createRng();
        rng.setStart(lastCharNode, 1);
        rng.setEnd(lastCharNode, 1);
        editor.selection.setRng(rng);
      }
    }
  }
  var checkKeyEvent = function (codes, event, predicate) {
    for (var i = 0; i < codes.length; i++) {
      if (predicate(codes[i], event)) {
        return true;
      }
    }
  };
  var checkKeyCode = function (codes, event) {
    return checkKeyEvent(codes, event, function (code, event) {
      return code === event.keyCode && global$2.modifierPressed(event) === false;
    });
  };
  var checkCharCode = function (chars, event) {
    return checkKeyEvent(chars, event, function (chr, event) {
      return chr.charCodeAt(0) === event.charCode;
    });
  };
  var $_g4f2z3rxjkmcws6k = {
    handleEnter: handleEnter,
    handleInlineKey: handleInlineKey,
    checkCharCode: checkCharCode,
    checkKeyCode: checkKeyCode
  };
  var setup = function (editor, patternsState) {
    var charCodes = [
      ',',
      '.',
      ';',
      ':',
      '!',
      '?'
    ];
    var keyCodes = [32];
    editor.on('keydown', function (e) {
      if (e.keyCode === 13 && !global$2.modifierPressed(e)) {
        $_g4f2z3rxjkmcws6k.handleEnter(editor, patternsState.get());
      }
    }, true);
    editor.on('keyup', function (e) {
      if ($_g4f2z3rxjkmcws6k.checkKeyCode(keyCodes, e)) {
        $_g4f2z3rxjkmcws6k.handleInlineKey(editor, patternsState.get());
      }
    });
    editor.on('keypress', function (e) {
      if ($_g4f2z3rxjkmcws6k.checkCharCode(charCodes, e)) {
        global$1.setEditorTimeout(editor, function () {
          $_g4f2z3rxjkmcws6k.handleInlineKey(editor, patternsState.get());
        });
      }
    });
  };
  var $_6b0tfhrujkmcws6h = { setup: setup };
  global.add('textpattern', function (editor) {
    var patternsState = Cell($_1rurpvrtjkmcws6g.getPatterns(editor.settings));
    $_6b0tfhrujkmcws6h.setup(editor, patternsState);
    return $_fp2mq2rsjkmcws6f.get(patternsState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var visualblocks = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var fireVisualBlocks = function (editor, state) {
    editor.fire('VisualBlocks', { state: state });
  };
  var $_coqgixsjjkmcws9p = { fireVisualBlocks: fireVisualBlocks };
  var isEnabledByDefault = function (editor) {
    return editor.getParam('visualblocks_default_state', false);
  };
  var getContentCss = function (editor) {
    return editor.settings.visualblocks_content_css;
  };
  var $_4hwsakskjkmcws9q = {
    isEnabledByDefault: isEnabledByDefault,
    getContentCss: getContentCss
  };
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var cssId = global$1.DOM.uniqueId();
  var load = function (doc, url) {
    var linkElements = global$2.toArray(doc.getElementsByTagName('link'));
    var matchingLinkElms = global$2.grep(linkElements, function (head) {
      return head.id === cssId;
    });
    if (matchingLinkElms.length === 0) {
      var linkElm = global$1.DOM.create('link', {
        id: cssId,
        rel: 'stylesheet',
        href: url
      });
      doc.getElementsByTagName('head')[0].appendChild(linkElm);
    }
  };
  var $_45cf2sljkmcws9r = { load: load };
  var toggleVisualBlocks = function (editor, pluginUrl, enabledState) {
    var dom = editor.dom;
    var contentCss = $_4hwsakskjkmcws9q.getContentCss(editor);
    $_45cf2sljkmcws9r.load(editor.getDoc(), contentCss ? contentCss : pluginUrl + '/css/visualblocks.css');
    dom.toggleClass(editor.getBody(), 'mce-visualblocks');
    enabledState.set(!enabledState.get());
    $_coqgixsjjkmcws9p.fireVisualBlocks(editor, enabledState.get());
  };
  var $_b52xvasijkmcws9o = { toggleVisualBlocks: toggleVisualBlocks };
  var register = function (editor, pluginUrl, enabledState) {
    editor.addCommand('mceVisualBlocks', function () {
      $_b52xvasijkmcws9o.toggleVisualBlocks(editor, pluginUrl, enabledState);
    });
  };
  var $_4m8bnnshjkmcws9n = { register: register };
  var setup = function (editor, pluginUrl, enabledState) {
    editor.on('PreviewFormats AfterPreviewFormats', function (e) {
      if (enabledState.get()) {
        editor.dom.toggleClass(editor.getBody(), 'mce-visualblocks', e.type === 'afterpreviewformats');
      }
    });
    editor.on('init', function () {
      if ($_4hwsakskjkmcws9q.isEnabledByDefault(editor)) {
        $_b52xvasijkmcws9o.toggleVisualBlocks(editor, pluginUrl, enabledState);
      }
    });
    editor.on('remove', function () {
      editor.dom.removeClass(editor.getBody(), 'mce-visualblocks');
    });
  };
  var $_7pkzsdsojkmcws9t = { setup: setup };
  var toggleActiveState = function (editor, enabledState) {
    return function (e) {
      var ctrl = e.control;
      ctrl.active(enabledState.get());
      editor.on('VisualBlocks', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor, enabledState) {
    editor.addButton('visualblocks', {
      active: false,
      title: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState)
    });
    editor.addMenuItem('visualblocks', {
      text: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };
  var $_6ab4fspjkmcws9u = { register: register$1 };
  global.add('visualblocks', function (editor, pluginUrl) {
    var enabledState = Cell(false);
    $_4m8bnnshjkmcws9n.register(editor, pluginUrl, enabledState);
    $_6ab4fspjkmcws9u.register(editor, enabledState);
    $_7pkzsdsojkmcws9t.setup(editor, pluginUrl, enabledState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var anchor = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var isValidId = function (id) {
    return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
  };
  var getId = function (editor) {
    var selectedNode = editor.selection.getNode();
    var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
    return isAnchor ? selectedNode.id || selectedNode.name : '';
  };
  var insert = function (editor, id) {
    var selectedNode = editor.selection.getNode();
    var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
    if (isAnchor) {
      selectedNode.removeAttribute('name');
      selectedNode.id = id;
      editor.undoManager.add();
    } else {
      editor.focus();
      editor.selection.collapse(true);
      editor.execCommand('mceInsertContent', false, editor.dom.createHTML('a', { id: id }));
    }
  };
  var $_diakhu8ojkmcwo32 = {
    isValidId: isValidId,
    getId: getId,
    insert: insert
  };
  var insertAnchor = function (editor, newId) {
    if (!$_diakhu8ojkmcwo32.isValidId(newId)) {
      editor.windowManager.alert('Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
      return true;
    } else {
      $_diakhu8ojkmcwo32.insert(editor, newId);
      return false;
    }
  };
  var open = function (editor) {
    var currentId = $_diakhu8ojkmcwo32.getId(editor);
    editor.windowManager.open({
      title: 'Anchor',
      body: {
        type: 'textbox',
        name: 'id',
        size: 40,
        label: 'Id',
        value: currentId
      },
      onsubmit: function (e) {
        var newId = e.data.id;
        if (insertAnchor(editor, newId)) {
          e.preventDefault();
        }
      }
    });
  };
  var $_3a31oa8njkmcwo30 = { open: open };
  var register = function (editor) {
    editor.addCommand('mceAnchor', function () {
      $_3a31oa8njkmcwo30.open(editor);
    });
  };
  var $_531sc78mjkmcwo2z = { register: register };
  var isAnchorNode = function (node) {
    return !node.attr('href') && (node.attr('id') || node.attr('name')) && !node.firstChild;
  };
  var setContentEditable = function (state) {
    return function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (isAnchorNode(nodes[i])) {
          nodes[i].attr('contenteditable', state);
        }
      }
    };
  };
  var setup = function (editor) {
    editor.on('PreInit', function () {
      editor.parser.addNodeFilter('a', setContentEditable('false'));
      editor.serializer.addNodeFilter('a', setContentEditable(null));
    });
  };
  var $_6ryayv8pjkmcwo33 = { setup: setup };
  var register$1 = function (editor) {
    editor.addButton('anchor', {
      icon: 'anchor',
      tooltip: 'Anchor',
      cmd: 'mceAnchor',
      stateSelector: 'a:not([href])'
    });
    editor.addMenuItem('anchor', {
      icon: 'anchor',
      text: 'Anchor',
      context: 'insert',
      cmd: 'mceAnchor'
    });
  };
  var $_4xjg5w8qjkmcwo35 = { register: register$1 };
  global.add('anchor', function (editor) {
    $_6ryayv8pjkmcwo33.setup(editor);
    $_531sc78mjkmcwo2z.register(editor);
    $_4xjg5w8qjkmcwo35.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var autoresize = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var getAutoResizeMinHeight = function (editor) {
    return parseInt(editor.getParam('autoresize_min_height', editor.getElement().offsetHeight), 10);
  };
  var getAutoResizeMaxHeight = function (editor) {
    return parseInt(editor.getParam('autoresize_max_height', 0), 10);
  };
  var getAutoResizeOverflowPadding = function (editor) {
    return editor.getParam('autoresize_overflow_padding', 1);
  };
  var getAutoResizeBottomMargin = function (editor) {
    return editor.getParam('autoresize_bottom_margin', 50);
  };
  var shouldAutoResizeOnInit = function (editor) {
    return editor.getParam('autoresize_on_init', true);
  };
  var $_37zh3k93jkmcwo49 = {
    getAutoResizeMinHeight: getAutoResizeMinHeight,
    getAutoResizeMaxHeight: getAutoResizeMaxHeight,
    getAutoResizeOverflowPadding: getAutoResizeOverflowPadding,
    getAutoResizeBottomMargin: getAutoResizeBottomMargin,
    shouldAutoResizeOnInit: shouldAutoResizeOnInit
  };
  var isFullscreen = function (editor) {
    return editor.plugins.fullscreen && editor.plugins.fullscreen.isFullscreen();
  };
  var wait = function (editor, oldSize, times, interval, callback) {
    global$2.setEditorTimeout(editor, function () {
      resize(editor, oldSize);
      if (times--) {
        wait(editor, oldSize, times, interval, callback);
      } else if (callback) {
        callback();
      }
    }, interval);
  };
  var toggleScrolling = function (editor, state) {
    var body = editor.getBody();
    if (body) {
      body.style.overflowY = state ? '' : 'hidden';
      if (!state) {
        body.scrollTop = 0;
      }
    }
  };
  var resize = function (editor, oldSize) {
    var deltaSize, doc, body, resizeHeight, myHeight;
    var marginTop, marginBottom, paddingTop, paddingBottom, borderTop, borderBottom;
    var dom = editor.dom;
    doc = editor.getDoc();
    if (!doc) {
      return;
    }
    if (isFullscreen(editor)) {
      toggleScrolling(editor, true);
      return;
    }
    body = doc.body;
    resizeHeight = $_37zh3k93jkmcwo49.getAutoResizeMinHeight(editor);
    marginTop = dom.getStyle(body, 'margin-top', true);
    marginBottom = dom.getStyle(body, 'margin-bottom', true);
    paddingTop = dom.getStyle(body, 'padding-top', true);
    paddingBottom = dom.getStyle(body, 'padding-bottom', true);
    borderTop = dom.getStyle(body, 'border-top-width', true);
    borderBottom = dom.getStyle(body, 'border-bottom-width', true);
    myHeight = body.offsetHeight + parseInt(marginTop, 10) + parseInt(marginBottom, 10) + parseInt(paddingTop, 10) + parseInt(paddingBottom, 10) + parseInt(borderTop, 10) + parseInt(borderBottom, 10);
    if (isNaN(myHeight) || myHeight <= 0) {
      myHeight = global$1.ie ? body.scrollHeight : global$1.webkit && body.clientHeight === 0 ? 0 : body.offsetHeight;
    }
    if (myHeight > $_37zh3k93jkmcwo49.getAutoResizeMinHeight(editor)) {
      resizeHeight = myHeight;
    }
    var maxHeight = $_37zh3k93jkmcwo49.getAutoResizeMaxHeight(editor);
    if (maxHeight && myHeight > maxHeight) {
      resizeHeight = maxHeight;
      toggleScrolling(editor, true);
    } else {
      toggleScrolling(editor, false);
    }
    if (resizeHeight !== oldSize.get()) {
      deltaSize = resizeHeight - oldSize.get();
      dom.setStyle(editor.iframeElement, 'height', resizeHeight + 'px');
      oldSize.set(resizeHeight);
      if (global$1.webkit && deltaSize < 0) {
        resize(editor, oldSize);
      }
    }
  };
  var setup = function (editor, oldSize) {
    editor.on('init', function () {
      var overflowPadding, bottomMargin;
      var dom = editor.dom;
      overflowPadding = $_37zh3k93jkmcwo49.getAutoResizeOverflowPadding(editor);
      bottomMargin = $_37zh3k93jkmcwo49.getAutoResizeBottomMargin(editor);
      if (overflowPadding !== false) {
        dom.setStyles(editor.getBody(), {
          paddingLeft: overflowPadding,
          paddingRight: overflowPadding
        });
      }
      if (bottomMargin !== false) {
        dom.setStyles(editor.getBody(), { paddingBottom: bottomMargin });
      }
    });
    editor.on('nodechange setcontent keyup FullscreenStateChanged', function (e) {
      resize(editor, oldSize);
    });
    if ($_37zh3k93jkmcwo49.shouldAutoResizeOnInit(editor)) {
      editor.on('init', function () {
        wait(editor, oldSize, 20, 100, function () {
          wait(editor, oldSize, 5, 1000);
        });
      });
    }
  };
  var $_5bbetq90jkmcwo45 = {
    setup: setup,
    resize: resize
  };
  var register = function (editor, oldSize) {
    editor.addCommand('mceAutoResize', function () {
      $_5bbetq90jkmcwo45.resize(editor, oldSize);
    });
  };
  var $_86jjbn8zjkmcwo43 = { register: register };
  global.add('autoresize', function (editor) {
    if (!editor.inline) {
      var oldSize = Cell(0);
      $_86jjbn8zjkmcwo43.register(editor, oldSize);
      $_5bbetq90jkmcwo45.setup(editor, oldSize);
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var bbcode = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var html2bbcode = function (s) {
    s = global$1.trim(s);
    var rep = function (re, str) {
      s = s.replace(re, str);
    };
    rep(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi, '[url=$1]$2[/url]');
    rep(/<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
    rep(/<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
    rep(/<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
    rep(/<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
    rep(/<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi, '[color=$1]$2[/color]');
    rep(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[color=$1]$2[/color]');
    rep(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi, '[size=$1]$2[/size]');
    rep(/<font>(.*?)<\/font>/gi, '$1');
    rep(/<img.*?src=\"(.*?)\".*?\/>/gi, '[img]$1[/img]');
    rep(/<span class=\"codeStyle\">(.*?)<\/span>/gi, '[code]$1[/code]');
    rep(/<span class=\"quoteStyle\">(.*?)<\/span>/gi, '[quote]$1[/quote]');
    rep(/<strong class=\"codeStyle\">(.*?)<\/strong>/gi, '[code][b]$1[/b][/code]');
    rep(/<strong class=\"quoteStyle\">(.*?)<\/strong>/gi, '[quote][b]$1[/b][/quote]');
    rep(/<em class=\"codeStyle\">(.*?)<\/em>/gi, '[code][i]$1[/i][/code]');
    rep(/<em class=\"quoteStyle\">(.*?)<\/em>/gi, '[quote][i]$1[/i][/quote]');
    rep(/<u class=\"codeStyle\">(.*?)<\/u>/gi, '[code][u]$1[/u][/code]');
    rep(/<u class=\"quoteStyle\">(.*?)<\/u>/gi, '[quote][u]$1[/u][/quote]');
    rep(/<\/(strong|b)>/gi, '[/b]');
    rep(/<(strong|b)>/gi, '[b]');
    rep(/<\/(em|i)>/gi, '[/i]');
    rep(/<(em|i)>/gi, '[i]');
    rep(/<\/u>/gi, '[/u]');
    rep(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi, '[u]$1[/u]');
    rep(/<u>/gi, '[u]');
    rep(/<blockquote[^>]*>/gi, '[quote]');
    rep(/<\/blockquote>/gi, '[/quote]');
    rep(/<br \/>/gi, '\n');
    rep(/<br\/>/gi, '\n');
    rep(/<br>/gi, '\n');
    rep(/<p>/gi, '');
    rep(/<\/p>/gi, '\n');
    rep(/&nbsp;|\u00a0/gi, ' ');
    rep(/&quot;/gi, '"');
    rep(/&lt;/gi, '<');
    rep(/&gt;/gi, '>');
    rep(/&amp;/gi, '&');
    return s;
  };
  var bbcode2html = function (s) {
    s = global$1.trim(s);
    var rep = function (re, str) {
      s = s.replace(re, str);
    };
    rep(/\n/gi, '<br />');
    rep(/\[b\]/gi, '<strong>');
    rep(/\[\/b\]/gi, '</strong>');
    rep(/\[i\]/gi, '<em>');
    rep(/\[\/i\]/gi, '</em>');
    rep(/\[u\]/gi, '<u>');
    rep(/\[\/u\]/gi, '</u>');
    rep(/\[url=([^\]]+)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
    rep(/\[url\](.*?)\[\/url\]/gi, '<a href="$1">$1</a>');
    rep(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
    rep(/\[color=(.*?)\](.*?)\[\/color\]/gi, '<font color="$1">$2</font>');
    rep(/\[code\](.*?)\[\/code\]/gi, '<span class="codeStyle">$1</span>&nbsp;');
    rep(/\[quote.*?\](.*?)\[\/quote\]/gi, '<span class="quoteStyle">$1</span>&nbsp;');
    return s;
  };
  var $_5v5ntp9kjkmcwo6u = {
    html2bbcode: html2bbcode,
    bbcode2html: bbcode2html
  };
  global.add('bbcode', function () {
    return {
      init: function (editor) {
        editor.on('beforeSetContent', function (e) {
          e.content = $_5v5ntp9kjkmcwo6u.bbcode2html(e.content);
        });
        editor.on('postProcess', function (e) {
          if (e.set) {
            e.content = $_5v5ntp9kjkmcwo6u.bbcode2html(e.content);
          }
          if (e.get) {
            e.content = $_5v5ntp9kjkmcwo6u.html2bbcode(e.content);
          }
        });
      }
    };
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var code = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(global$1.DOM.getViewPort().h - 200, 500));
  };
  var $_2agnwba2jkmcwo8k = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };
  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_gf01w3a4jkmcwo8n = {
    setContent: setContent,
    getContent: getContent
  };
  var open = function (editor) {
    var minWidth = $_2agnwba2jkmcwo8k.getMinWidth(editor);
    var minHeight = $_2agnwba2jkmcwo8k.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_gf01w3a4jkmcwo8n.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_gf01w3a4jkmcwo8n.getContent(editor));
  };
  var $_4xs1xna1jkmcwo8j = { open: open };
  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_4xs1xna1jkmcwo8j.open(editor);
    });
  };
  var $_atmzsea0jkmcwo8i = { register: register };
  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_4xs1xna1jkmcwo8j.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_4xs1xna1jkmcwo8j.open(editor);
      }
    });
  };
  var $_f9f308a5jkmcwo8o = { register: register$1 };
  global.add('code', function (editor) {
    $_atmzsea0jkmcwo8i.register(editor);
    $_f9f308a5jkmcwo8o.register(editor);
    return {};
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var colorpicker = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Color');
  var showPreview = function (win, hexColor) {
    win.find('#preview')[0].getEl().style.background = hexColor;
  };
  var setColor = function (win, value) {
    var color = global$1(value), rgb = color.toRgb();
    win.fromJSON({
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      hex: color.toHex().substr(1)
    });
    showPreview(win, color.toHex());
  };
  var open = function (editor, callback, value) {
    var win = editor.windowManager.open({
      title: 'Color',
      items: {
        type: 'container',
        layout: 'flex',
        direction: 'row',
        align: 'stretch',
        padding: 5,
        spacing: 10,
        items: [
          {
            type: 'colorpicker',
            value: value,
            onchange: function () {
              var rgb = this.rgb();
              if (win) {
                win.find('#r').value(rgb.r);
                win.find('#g').value(rgb.g);
                win.find('#b').value(rgb.b);
                win.find('#hex').value(this.value().substr(1));
                showPreview(win, this.value());
              }
            }
          },
          {
            type: 'form',
            padding: 0,
            labelGap: 5,
            defaults: {
              type: 'textbox',
              size: 7,
              value: '0',
              flex: 1,
              spellcheck: false,
              onchange: function () {
                var colorPickerCtrl = win.find('colorpicker')[0];
                var name, value;
                name = this.name();
                value = this.value();
                if (name === 'hex') {
                  value = '#' + value;
                  setColor(win, value);
                  colorPickerCtrl.value(value);
                  return;
                }
                value = {
                  r: win.find('#r').value(),
                  g: win.find('#g').value(),
                  b: win.find('#b').value()
                };
                colorPickerCtrl.value(value);
                setColor(win, value);
              }
            },
            items: [
              {
                name: 'r',
                label: 'R',
                autofocus: 1
              },
              {
                name: 'g',
                label: 'G'
              },
              {
                name: 'b',
                label: 'B'
              },
              {
                name: 'hex',
                label: '#',
                value: '000000'
              },
              {
                name: 'preview',
                type: 'container',
                border: 1
              }
            ]
          }
        ]
      },
      onSubmit: function () {
        callback('#' + win.toJSON().hex);
      }
    });
    setColor(win, value);
  };
  var $_f3o2huanjkmcwocp = { open: open };
  global.add('colorpicker', function (editor) {
    if (!editor.settings.color_picker_callback) {
      editor.settings.color_picker_callback = function (callback, value) {
        $_f3o2huanjkmcwocp.open(editor, callback, value);
      };
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var directionality = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var setDir = function (editor, dir) {
    var dom = editor.dom;
    var curDir;
    var blocks = editor.selection.getSelectedBlocks();
    if (blocks.length) {
      curDir = dom.getAttrib(blocks[0], 'dir');
      global$1.each(blocks, function (block) {
        if (!dom.getParent(block.parentNode, '*[dir="' + dir + '"]', dom.getRoot())) {
          dom.setAttrib(block, 'dir', curDir !== dir ? dir : null);
        }
      });
      editor.nodeChanged();
    }
  };
  var $_dctzu4b4jkmcwoe2 = { setDir: setDir };
  var register = function (editor) {
    editor.addCommand('mceDirectionLTR', function () {
      $_dctzu4b4jkmcwoe2.setDir(editor, 'ltr');
    });
    editor.addCommand('mceDirectionRTL', function () {
      $_dctzu4b4jkmcwoe2.setDir(editor, 'rtl');
    });
  };
  var $_221gbtb3jkmcwoe1 = { register: register };
  var generateSelector = function (dir) {
    var selector = [];
    global$1.each('h1 h2 h3 h4 h5 h6 div p'.split(' '), function (name) {
      selector.push(name + '[dir=' + dir + ']');
    });
    return selector.join(',');
  };
  var register$1 = function (editor) {
    editor.addButton('ltr', {
      title: 'Left to right',
      cmd: 'mceDirectionLTR',
      stateSelector: generateSelector('ltr')
    });
    editor.addButton('rtl', {
      title: 'Right to left',
      cmd: 'mceDirectionRTL',
      stateSelector: generateSelector('rtl')
    });
  };
  var $_8qw6vsb6jkmcwoe4 = { register: register$1 };
  global.add('directionality', function (editor) {
    $_221gbtb3jkmcwoe1.register(editor);
    $_8qw6vsb6jkmcwoe4.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var fullpage = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$2 = tinymce.util.Tools.resolve('tinymce.html.DomParser');
  var global$3 = tinymce.util.Tools.resolve('tinymce.html.Node');
  var global$4 = tinymce.util.Tools.resolve('tinymce.html.Serializer');
  var shouldHideInSourceView = function (editor) {
    return editor.getParam('fullpage_hide_in_source_view');
  };
  var getDefaultXmlPi = function (editor) {
    return editor.getParam('fullpage_default_xml_pi');
  };
  var getDefaultEncoding = function (editor) {
    return editor.getParam('fullpage_default_encoding');
  };
  var getDefaultFontFamily = function (editor) {
    return editor.getParam('fullpage_default_font_family');
  };
  var getDefaultFontSize = function (editor) {
    return editor.getParam('fullpage_default_font_size');
  };
  var getDefaultTextColor = function (editor) {
    return editor.getParam('fullpage_default_text_color');
  };
  var getDefaultTitle = function (editor) {
    return editor.getParam('fullpage_default_title');
  };
  var getDefaultDocType = function (editor) {
    return editor.getParam('fullpage_default_doctype', '<!DOCTYPE html>');
  };
  var $_7rjdl7c7jkmcwoj4 = {
    shouldHideInSourceView: shouldHideInSourceView,
    getDefaultXmlPi: getDefaultXmlPi,
    getDefaultEncoding: getDefaultEncoding,
    getDefaultFontFamily: getDefaultFontFamily,
    getDefaultFontSize: getDefaultFontSize,
    getDefaultTextColor: getDefaultTextColor,
    getDefaultTitle: getDefaultTitle,
    getDefaultDocType: getDefaultDocType
  };
  var parseHeader = function (head) {
    return global$2({
      validate: false,
      root_name: '#document'
    }).parse(head);
  };
  var htmlToData = function (editor, head) {
    var headerFragment = parseHeader(head);
    var data = {};
    var elm, matches;
    function getAttr(elm, name) {
      var value = elm.attr(name);
      return value || '';
    }
    data.fontface = $_7rjdl7c7jkmcwoj4.getDefaultFontFamily(editor);
    data.fontsize = $_7rjdl7c7jkmcwoj4.getDefaultFontSize(editor);
    elm = headerFragment.firstChild;
    if (elm.type === 7) {
      data.xml_pi = true;
      matches = /encoding="([^"]+)"/.exec(elm.value);
      if (matches) {
        data.docencoding = matches[1];
      }
    }
    elm = headerFragment.getAll('#doctype')[0];
    if (elm) {
      data.doctype = '<!DOCTYPE' + elm.value + '>';
    }
    elm = headerFragment.getAll('title')[0];
    if (elm && elm.firstChild) {
      data.title = elm.firstChild.value;
    }
    global$1.each(headerFragment.getAll('meta'), function (meta) {
      var name = meta.attr('name');
      var httpEquiv = meta.attr('http-equiv');
      var matches;
      if (name) {
        data[name.toLowerCase()] = meta.attr('content');
      } else if (httpEquiv === 'Content-Type') {
        matches = /charset\s*=\s*(.*)\s*/gi.exec(meta.attr('content'));
        if (matches) {
          data.docencoding = matches[1];
        }
      }
    });
    elm = headerFragment.getAll('html')[0];
    if (elm) {
      data.langcode = getAttr(elm, 'lang') || getAttr(elm, 'xml:lang');
    }
    data.stylesheets = [];
    global$1.each(headerFragment.getAll('link'), function (link) {
      if (link.attr('rel') === 'stylesheet') {
        data.stylesheets.push(link.attr('href'));
      }
    });
    elm = headerFragment.getAll('body')[0];
    if (elm) {
      data.langdir = getAttr(elm, 'dir');
      data.style = getAttr(elm, 'style');
      data.visited_color = getAttr(elm, 'vlink');
      data.link_color = getAttr(elm, 'link');
      data.active_color = getAttr(elm, 'alink');
    }
    return data;
  };
  var dataToHtml = function (editor, data, head) {
    var headerFragment, headElement, html, elm, value;
    var dom = editor.dom;
    function setAttr(elm, name, value) {
      elm.attr(name, value ? value : undefined);
    }
    function addHeadNode(node) {
      if (headElement.firstChild) {
        headElement.insert(node, headElement.firstChild);
      } else {
        headElement.append(node);
      }
    }
    headerFragment = parseHeader(head);
    headElement = headerFragment.getAll('head')[0];
    if (!headElement) {
      elm = headerFragment.getAll('html')[0];
      headElement = new global$3('head', 1);
      if (elm.firstChild) {
        elm.insert(headElement, elm.firstChild, true);
      } else {
        elm.append(headElement);
      }
    }
    elm = headerFragment.firstChild;
    if (data.xml_pi) {
      value = 'version="1.0"';
      if (data.docencoding) {
        value += ' encoding="' + data.docencoding + '"';
      }
      if (elm.type !== 7) {
        elm = new global$3('xml', 7);
        headerFragment.insert(elm, headerFragment.firstChild, true);
      }
      elm.value = value;
    } else if (elm && elm.type === 7) {
      elm.remove();
    }
    elm = headerFragment.getAll('#doctype')[0];
    if (data.doctype) {
      if (!elm) {
        elm = new global$3('#doctype', 10);
        if (data.xml_pi) {
          headerFragment.insert(elm, headerFragment.firstChild);
        } else {
          addHeadNode(elm);
        }
      }
      elm.value = data.doctype.substring(9, data.doctype.length - 1);
    } else if (elm) {
      elm.remove();
    }
    elm = null;
    global$1.each(headerFragment.getAll('meta'), function (meta) {
      if (meta.attr('http-equiv') === 'Content-Type') {
        elm = meta;
      }
    });
    if (data.docencoding) {
      if (!elm) {
        elm = new global$3('meta', 1);
        elm.attr('http-equiv', 'Content-Type');
        elm.shortEnded = true;
        addHeadNode(elm);
      }
      elm.attr('content', 'text/html; charset=' + data.docencoding);
    } else if (elm) {
      elm.remove();
    }
    elm = headerFragment.getAll('title')[0];
    if (data.title) {
      if (!elm) {
        elm = new global$3('title', 1);
        addHeadNode(elm);
      } else {
        elm.empty();
      }
      elm.append(new global$3('#text', 3)).value = data.title;
    } else if (elm) {
      elm.remove();
    }
    global$1.each('keywords,description,author,copyright,robots'.split(','), function (name) {
      var nodes = headerFragment.getAll('meta');
      var i, meta;
      var value = data[name];
      for (i = 0; i < nodes.length; i++) {
        meta = nodes[i];
        if (meta.attr('name') === name) {
          if (value) {
            meta.attr('content', value);
          } else {
            meta.remove();
          }
          return;
        }
      }
      if (value) {
        elm = new global$3('meta', 1);
        elm.attr('name', name);
        elm.attr('content', value);
        elm.shortEnded = true;
        addHeadNode(elm);
      }
    });
    var currentStyleSheetsMap = {};
    global$1.each(headerFragment.getAll('link'), function (stylesheet) {
      if (stylesheet.attr('rel') === 'stylesheet') {
        currentStyleSheetsMap[stylesheet.attr('href')] = stylesheet;
      }
    });
    global$1.each(data.stylesheets, function (stylesheet) {
      if (!currentStyleSheetsMap[stylesheet]) {
        elm = new global$3('link', 1);
        elm.attr({
          rel: 'stylesheet',
          text: 'text/css',
          href: stylesheet
        });
        elm.shortEnded = true;
        addHeadNode(elm);
      }
      delete currentStyleSheetsMap[stylesheet];
    });
    global$1.each(currentStyleSheetsMap, function (stylesheet) {
      stylesheet.remove();
    });
    elm = headerFragment.getAll('body')[0];
    if (elm) {
      setAttr(elm, 'dir', data.langdir);
      setAttr(elm, 'style', data.style);
      setAttr(elm, 'vlink', data.visited_color);
      setAttr(elm, 'link', data.link_color);
      setAttr(elm, 'alink', data.active_color);
      dom.setAttribs(editor.getBody(), {
        style: data.style,
        dir: data.dir,
        vLink: data.visited_color,
        link: data.link_color,
        aLink: data.active_color
      });
    }
    elm = headerFragment.getAll('html')[0];
    if (elm) {
      setAttr(elm, 'lang', data.langcode);
      setAttr(elm, 'xml:lang', data.langcode);
    }
    if (!headElement.firstChild) {
      headElement.remove();
    }
    html = global$4({
      validate: false,
      indent: true,
      apply_source_formatting: true,
      indent_before: 'head,html,body,meta,title,script,link,style',
      indent_after: 'head,html,body,meta,title,script,link,style'
    }).serialize(headerFragment);
    return html.substring(0, html.indexOf('</body>'));
  };
  var $_5rofa0c3jkmcwoix = {
    parseHeader: parseHeader,
    htmlToData: htmlToData,
    dataToHtml: dataToHtml
  };
  var open = function (editor, headState) {
    var data = $_5rofa0c3jkmcwoix.htmlToData(editor, headState.get());
    editor.windowManager.open({
      title: 'Document properties',
      data: data,
      defaults: {
        type: 'textbox',
        size: 40
      },
      body: [
        {
          name: 'title',
          label: 'Title'
        },
        {
          name: 'keywords',
          label: 'Keywords'
        },
        {
          name: 'description',
          label: 'Description'
        },
        {
          name: 'robots',
          label: 'Robots'
        },
        {
          name: 'author',
          label: 'Author'
        },
        {
          name: 'docencoding',
          label: 'Encoding'
        }
      ],
      onSubmit: function (e) {
        var headHtml = $_5rofa0c3jkmcwoix.dataToHtml(editor, global$1.extend(data, e.data), headState.get());
        headState.set(headHtml);
      }
    });
  };
  var $_7mvolec1jkmcwoit = { open: open };
  var register = function (editor, headState) {
    editor.addCommand('mceFullPageProperties', function () {
      $_7mvolec1jkmcwoit.open(editor, headState);
    });
  };
  var $_4a9ny4c0jkmcwoir = { register: register };
  var protectHtml = function (protect, html) {
    global$1.each(protect, function (pattern) {
      html = html.replace(pattern, function (str) {
        return '<!--mce:protected ' + escape(str) + '-->';
      });
    });
    return html;
  };
  var unprotectHtml = function (html) {
    return html.replace(/<!--mce:protected ([\s\S]*?)-->/g, function (a, m) {
      return unescape(m);
    });
  };
  var $_7stjxwc9jkmcwoja = {
    protectHtml: protectHtml,
    unprotectHtml: unprotectHtml
  };
  var each = global$1.each;
  var low = function (s) {
    return s.replace(/<\/?[A-Z]+/g, function (a) {
      return a.toLowerCase();
    });
  };
  var handleSetContent = function (editor, headState, footState, evt) {
    var startPos, endPos, content, headerFragment, styles = '';
    var dom = editor.dom;
    var elm;
    if (evt.selection) {
      return;
    }
    content = $_7stjxwc9jkmcwoja.protectHtml(editor.settings.protect, evt.content);
    if (evt.format === 'raw' && headState.get()) {
      return;
    }
    if (evt.source_view && $_7rjdl7c7jkmcwoj4.shouldHideInSourceView(editor)) {
      return;
    }
    if (content.length === 0 && !evt.source_view) {
      content = global$1.trim(headState.get()) + '\n' + global$1.trim(content) + '\n' + global$1.trim(footState.get());
    }
    content = content.replace(/<(\/?)BODY/gi, '<$1body');
    startPos = content.indexOf('<body');
    if (startPos !== -1) {
      startPos = content.indexOf('>', startPos);
      headState.set(low(content.substring(0, startPos + 1)));
      endPos = content.indexOf('</body', startPos);
      if (endPos === -1) {
        endPos = content.length;
      }
      evt.content = global$1.trim(content.substring(startPos + 1, endPos));
      footState.set(low(content.substring(endPos)));
    } else {
      headState.set(getDefaultHeader(editor));
      footState.set('\n</body>\n</html>');
    }
    headerFragment = $_5rofa0c3jkmcwoix.parseHeader(headState.get());
    each(headerFragment.getAll('style'), function (node) {
      if (node.firstChild) {
        styles += node.firstChild.value;
      }
    });
    elm = headerFragment.getAll('body')[0];
    if (elm) {
      dom.setAttribs(editor.getBody(), {
        style: elm.attr('style') || '',
        dir: elm.attr('dir') || '',
        vLink: elm.attr('vlink') || '',
        link: elm.attr('link') || '',
        aLink: elm.attr('alink') || ''
      });
    }
    dom.remove('fullpage_styles');
    var headElm = editor.getDoc().getElementsByTagName('head')[0];
    if (styles) {
      dom.add(headElm, 'style', { id: 'fullpage_styles' }, styles);
      elm = dom.get('fullpage_styles');
      if (elm.styleSheet) {
        elm.styleSheet.cssText = styles;
      }
    }
    var currentStyleSheetsMap = {};
    global$1.each(headElm.getElementsByTagName('link'), function (stylesheet) {
      if (stylesheet.rel === 'stylesheet' && stylesheet.getAttribute('data-mce-fullpage')) {
        currentStyleSheetsMap[stylesheet.href] = stylesheet;
      }
    });
    global$1.each(headerFragment.getAll('link'), function (stylesheet) {
      var href = stylesheet.attr('href');
      if (!href) {
        return true;
      }
      if (!currentStyleSheetsMap[href] && stylesheet.attr('rel') === 'stylesheet') {
        dom.add(headElm, 'link', {
          'rel': 'stylesheet',
          'text': 'text/css',
          'href': href,
          'data-mce-fullpage': '1'
        });
      }
      delete currentStyleSheetsMap[href];
    });
    global$1.each(currentStyleSheetsMap, function (stylesheet) {
      stylesheet.parentNode.removeChild(stylesheet);
    });
  };
  var getDefaultHeader = function (editor) {
    var header = '', value, styles = '';
    if ($_7rjdl7c7jkmcwoj4.getDefaultXmlPi(editor)) {
      var piEncoding = $_7rjdl7c7jkmcwoj4.getDefaultEncoding(editor);
      header += '<?xml version="1.0" encoding="' + (piEncoding ? piEncoding : 'ISO-8859-1') + '" ?>\n';
    }
    header += $_7rjdl7c7jkmcwoj4.getDefaultDocType(editor);
    header += '\n<html>\n<head>\n';
    if (value = $_7rjdl7c7jkmcwoj4.getDefaultTitle(editor)) {
      header += '<title>' + value + '</title>\n';
    }
    if (value = $_7rjdl7c7jkmcwoj4.getDefaultEncoding(editor)) {
      header += '<meta http-equiv="Content-Type" content="text/html; charset=' + value + '" />\n';
    }
    if (value = $_7rjdl7c7jkmcwoj4.getDefaultFontFamily(editor)) {
      styles += 'font-family: ' + value + ';';
    }
    if (value = $_7rjdl7c7jkmcwoj4.getDefaultFontSize(editor)) {
      styles += 'font-size: ' + value + ';';
    }
    if (value = $_7rjdl7c7jkmcwoj4.getDefaultTextColor(editor)) {
      styles += 'color: ' + value + ';';
    }
    header += '</head>\n<body' + (styles ? ' style="' + styles + '"' : '') + '>\n';
    return header;
  };
  var handleGetContent = function (editor, head, foot, evt) {
    if (!evt.selection && (!evt.source_view || !$_7rjdl7c7jkmcwoj4.shouldHideInSourceView(editor))) {
      evt.content = $_7stjxwc9jkmcwoja.unprotectHtml(global$1.trim(head) + '\n' + global$1.trim(evt.content) + '\n' + global$1.trim(foot));
    }
  };
  var setup = function (editor, headState, footState) {
    editor.on('BeforeSetContent', function (evt) {
      handleSetContent(editor, headState, footState, evt);
    });
    editor.on('GetContent', function (evt) {
      handleGetContent(editor, headState.get(), footState.get(), evt);
    });
  };
  var $_9yn4mc8jkmcwoj6 = { setup: setup };
  var register$1 = function (editor) {
    editor.addButton('fullpage', {
      title: 'Document properties',
      cmd: 'mceFullPageProperties'
    });
    editor.addMenuItem('fullpage', {
      text: 'Document properties',
      cmd: 'mceFullPageProperties',
      context: 'file'
    });
  };
  var $_ai61ducajkmcwojc = { register: register$1 };
  global.add('fullpage', function (editor) {
    var headState = Cell(''), footState = Cell('');
    $_4a9ny4c0jkmcwoir.register(editor, headState);
    $_ai61ducajkmcwojc.register(editor);
    $_9yn4mc8jkmcwoj6.setup(editor, headState, footState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var help = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return !f.apply(null, arguments);
    };
  };
  var never = constant(false);
  var always = constant(true);
  var never$1 = never;
  var always$1 = always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call$$1 = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop$$1 = function () {
    };
    var nul = function () {
      return null;
    };
    var undef = function () {
      return undefined;
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call$$1,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      getOrNull: nul,
      getOrUndefined: undef,
      or: id,
      orThunk: call$$1,
      map: none,
      ap: none,
      each: noop$$1,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };
  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var isFunction = isType('function');
  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var slice = Array.prototype.slice;
  var from$1 = isFunction(Array.from) ? Array.from : function (x) {
    return slice.call(x);
  };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.I18n');
  var global$2 = tinymce.util.Tools.resolve('tinymce.Env');
  var meta = global$2.mac ? '\u2318' : 'Ctrl';
  var access = global$2.mac ? 'Ctrl + Alt' : 'Shift + Alt';
  var shortcuts = [
    {
      shortcut: meta + ' + B',
      action: 'Bold'
    },
    {
      shortcut: meta + ' + I',
      action: 'Italic'
    },
    {
      shortcut: meta + ' + U',
      action: 'Underline'
    },
    {
      shortcut: meta + ' + A',
      action: 'Select all'
    },
    {
      shortcut: meta + ' + Y or ' + meta + ' + Shift + Z',
      action: 'Redo'
    },
    {
      shortcut: meta + ' + Z',
      action: 'Undo'
    },
    {
      shortcut: access + ' + 1',
      action: 'Header 1'
    },
    {
      shortcut: access + ' + 2',
      action: 'Header 2'
    },
    {
      shortcut: access + ' + 3',
      action: 'Header 3'
    },
    {
      shortcut: access + ' + 4',
      action: 'Header 4'
    },
    {
      shortcut: access + ' + 5',
      action: 'Header 5'
    },
    {
      shortcut: access + ' + 6',
      action: 'Header 6'
    },
    {
      shortcut: access + ' + 7',
      action: 'Paragraph'
    },
    {
      shortcut: access + ' + 8',
      action: 'Div'
    },
    {
      shortcut: access + ' + 9',
      action: 'Address'
    },
    {
      shortcut: 'Alt + F9',
      action: 'Focus to menubar'
    },
    {
      shortcut: 'Alt + F10',
      action: 'Focus to toolbar'
    },
    {
      shortcut: 'Alt + F11',
      action: 'Focus to element path'
    },
    {
      shortcut: 'Ctrl + Shift + P > Ctrl + Shift + P',
      action: 'Focus to contextual toolbar'
    },
    {
      shortcut: meta + ' + K',
      action: 'Insert link (if link plugin activated)'
    },
    {
      shortcut: meta + ' + S',
      action: 'Save (if save plugin activated)'
    },
    {
      shortcut: meta + ' + F',
      action: 'Find (if searchreplace plugin activated)'
    }
  ];
  var $_ca3by6bmjkmcwofx = { shortcuts: shortcuts };
  var makeTab = function () {
    var makeAriaLabel = function (shortcut) {
      return 'aria-label="Action: ' + shortcut.action + ', Shortcut: ' + shortcut.shortcut.replace(/Ctrl/g, 'Control') + '"';
    };
    var shortcutLisString = map($_ca3by6bmjkmcwofx.shortcuts, function (shortcut) {
      return '<tr data-mce-tabstop="1" tabindex="-1" ' + makeAriaLabel(shortcut) + '>' + '<td>' + global$1.translate(shortcut.action) + '</td>' + '<td>' + shortcut.shortcut + '</td>' + '</tr>';
    }).join('');
    return {
      title: 'Handy Shortcuts',
      type: 'container',
      style: 'overflow-y: auto; overflow-x: hidden; max-height: 250px',
      items: [{
          type: 'container',
          html: '<div>' + '<table class="mce-table-striped">' + '<thead>' + '<th>' + global$1.translate('Action') + '</th>' + '<th>' + global$1.translate('Shortcut') + '</th>' + '</thead>' + shortcutLisString + '</table>' + '</div>'
        }]
    };
  };
  var $_dvk2vcbgjkmcwoet = { makeTab: makeTab };
  var keys = Object.keys;
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\$\{([^{}]*)\}/g, function (fullMatch, key) {
      var value = obj[key];
      return isStringOrNumber(value) ? value.toString() : fullMatch;
    });
  };
  var urls = [
    {
      key: 'advlist',
      name: 'Advanced List'
    },
    {
      key: 'anchor',
      name: 'Anchor'
    },
    {
      key: 'autolink',
      name: 'Autolink'
    },
    {
      key: 'autoresize',
      name: 'Autoresize'
    },
    {
      key: 'autosave',
      name: 'Autosave'
    },
    {
      key: 'bbcode',
      name: 'BBCode'
    },
    {
      key: 'charmap',
      name: 'Character Map'
    },
    {
      key: 'code',
      name: 'Code'
    },
    {
      key: 'codesample',
      name: 'Code Sample'
    },
    {
      key: 'colorpicker',
      name: 'Color Picker'
    },
    {
      key: 'compat3x',
      name: '3.x Compatibility'
    },
    {
      key: 'contextmenu',
      name: 'Context Menu'
    },
    {
      key: 'directionality',
      name: 'Directionality'
    },
    {
      key: 'emoticons',
      name: 'Emoticons'
    },
    {
      key: 'fullpage',
      name: 'Full Page'
    },
    {
      key: 'fullscreen',
      name: 'Full Screen'
    },
    {
      key: 'help',
      name: 'Help'
    },
    {
      key: 'hr',
      name: 'Horizontal Rule'
    },
    {
      key: 'image',
      name: 'Image'
    },
    {
      key: 'imagetools',
      name: 'Image Tools'
    },
    {
      key: 'importcss',
      name: 'Import CSS'
    },
    {
      key: 'insertdatetime',
      name: 'Insert Date/Time'
    },
    {
      key: 'legacyoutput',
      name: 'Legacy Output'
    },
    {
      key: 'link',
      name: 'Link'
    },
    {
      key: 'lists',
      name: 'Lists'
    },
    {
      key: 'media',
      name: 'Media'
    },
    {
      key: 'nonbreaking',
      name: 'Nonbreaking'
    },
    {
      key: 'noneditable',
      name: 'Noneditable'
    },
    {
      key: 'pagebreak',
      name: 'Page Break'
    },
    {
      key: 'paste',
      name: 'Paste'
    },
    {
      key: 'preview',
      name: 'Preview'
    },
    {
      key: 'print',
      name: 'Print'
    },
    {
      key: 'save',
      name: 'Save'
    },
    {
      key: 'searchreplace',
      name: 'Search and Replace'
    },
    {
      key: 'spellchecker',
      name: 'Spell Checker'
    },
    {
      key: 'tabfocus',
      name: 'Tab Focus'
    },
    {
      key: 'table',
      name: 'Table'
    },
    {
      key: 'template',
      name: 'Template'
    },
    {
      key: 'textcolor',
      name: 'Text Color'
    },
    {
      key: 'textpattern',
      name: 'Text Pattern'
    },
    {
      key: 'toc',
      name: 'Table of Contents'
    },
    {
      key: 'visualblocks',
      name: 'Visual Blocks'
    },
    {
      key: 'visualchars',
      name: 'Visual Characters'
    },
    {
      key: 'wordcount',
      name: 'Word Count'
    }
  ];
  var $_dyqrh9btjkmcwogi = { urls: urls };
  var makeLink = curry(supplant, '<a href="${url}" target="_blank" rel="noopener">${name}</a>');
  var maybeUrlize = function (editor, key) {
    return find($_dyqrh9btjkmcwogi.urls, function (x) {
      return x.key === key;
    }).fold(function () {
      var getMetadata = editor.plugins[key].getMetadata;
      return typeof getMetadata === 'function' ? makeLink(getMetadata()) : key;
    }, function (x) {
      return makeLink({
        name: x.name,
        url: 'https://www.tinymce.com/docs/plugins/' + x.key
      });
    });
  };
  var getPluginKeys = function (editor) {
    var keys$$1 = keys(editor.plugins);
    return editor.settings.forced_plugins === undefined ? keys$$1 : filter(keys$$1, not(curry(contains, editor.settings.forced_plugins)));
  };
  var pluginLister = function (editor) {
    var pluginKeys = getPluginKeys(editor);
    var pluginLis = map(pluginKeys, function (key) {
      return '<li>' + maybeUrlize(editor, key) + '</li>';
    });
    var count = pluginLis.length;
    var pluginsString = pluginLis.join('');
    return '<p><b>' + global$1.translate([
      'Plugins installed ({0}):',
      count
    ]) + '</b></p>' + '<ul>' + pluginsString + '</ul>';
  };
  var installedPlugins = function (editor) {
    return {
      type: 'container',
      html: '<div style="overflow-y: auto; overflow-x: hidden; max-height: 230px; height: 230px;" data-mce-tabstop="1" tabindex="-1">' + pluginLister(editor) + '</div>',
      flex: 1
    };
  };
  var availablePlugins = function () {
    return {
      type: 'container',
      html: '<div style="padding: 10px; background: #e3e7f4; height: 100%;" data-mce-tabstop="1" tabindex="-1">' + '<p><b>' + global$1.translate('Premium plugins:') + '</b></p>' + '<ul>' + '<li>PowerPaste</li>' + '<li>Spell Checker Pro</li>' + '<li>Accessibility Checker</li>' + '<li>Advanced Code Editor</li>' + '<li>Enhanced Media Embed</li>' + '<li>Link Checker</li>' + '</ul><br />' + '<p style="float: right;"><a href="https://www.tinymce.com/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">' + global$1.translate('Learn more...') + '</a></p>' + '</div>',
      flex: 1
    };
  };
  var makeTab$1 = function (editor) {
    return {
      title: 'Plugins',
      type: 'container',
      style: 'overflow-y: auto; overflow-x: hidden;',
      layout: 'flex',
      padding: 10,
      spacing: 10,
      items: [
        installedPlugins(editor),
        availablePlugins()
      ]
    };
  };
  var $_4umya5bojkmcwog1 = { makeTab: makeTab$1 };
  var global$3 = tinymce.util.Tools.resolve('tinymce.EditorManager');
  var getVersion = function (major, minor) {
    return major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
  };
  var makeRow = function () {
    var version = getVersion(global$3.majorVersion, global$3.minorVersion);
    var changeLogLink = '<a href="https://www.tinymce.com/docs/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">TinyMCE ' + version + '</a>';
    return [
      {
        type: 'label',
        html: global$1.translate([
          'You are using {0}',
          changeLogLink
        ])
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'Close',
        onclick: function () {
          this.parent().parent().close();
        }
      }
    ];
  };
  var $_65igs5bujkmcwogo = { makeRow: makeRow };
  var open = function (editor, pluginUrl) {
    return function () {
      editor.windowManager.open({
        title: 'Help',
        bodyType: 'tabpanel',
        layout: 'flex',
        body: [
          $_dvk2vcbgjkmcwoet.makeTab(),
          $_4umya5bojkmcwog1.makeTab(editor)
        ],
        buttons: $_65igs5bujkmcwogo.makeRow(),
        onPostRender: function () {
          var title = this.getEl('title');
          title.innerHTML = '<img src="' + pluginUrl + '/img/logo.png" alt="TinyMCE Logo" style="display: inline-block; width: 200px; height: 50px">';
        }
      });
    };
  };
  var $_bqz00lbfjkmcwoes = { open: open };
  var register = function (editor, pluginUrl) {
    editor.addCommand('mceHelp', $_bqz00lbfjkmcwoes.open(editor, pluginUrl));
  };
  var $_rfsc8bejkmcwoeq = { register: register };
  var register$1 = function (editor, pluginUrl) {
    editor.addButton('help', {
      icon: 'help',
      onclick: $_bqz00lbfjkmcwoes.open(editor, pluginUrl)
    });
    editor.addMenuItem('help', {
      text: 'Help',
      icon: 'help',
      context: 'help',
      onclick: $_bqz00lbfjkmcwoes.open(editor, pluginUrl)
    });
  };
  var $_aex9i7bwjkmcwogq = { register: register$1 };
  global.add('help', function (editor, pluginUrl) {
    $_aex9i7bwjkmcwogq.register(editor, pluginUrl);
    $_rfsc8bejkmcwoeq.register(editor, pluginUrl);
    editor.shortcuts.add('Alt+0', 'Open help dialog', 'mceHelp');
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var image = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var hasDimensions = function (editor) {
    return editor.settings.image_dimensions === false ? false : true;
  };
  var hasAdvTab = function (editor) {
    return editor.settings.image_advtab === true ? true : false;
  };
  var getPrependUrl = function (editor) {
    return editor.getParam('image_prepend_url', '');
  };
  var getClassList = function (editor) {
    return editor.getParam('image_class_list');
  };
  var hasDescription = function (editor) {
    return editor.settings.image_description === false ? false : true;
  };
  var hasImageTitle = function (editor) {
    return editor.settings.image_title === true ? true : false;
  };
  var hasImageCaption = function (editor) {
    return editor.settings.image_caption === true ? true : false;
  };
  var getImageList = function (editor) {
    return editor.getParam('image_list', false);
  };
  var hasUploadUrl = function (editor) {
    return editor.getParam('images_upload_url', false);
  };
  var hasUploadHandler = function (editor) {
    return editor.getParam('images_upload_handler', false);
  };
  var getUploadUrl = function (editor) {
    return editor.getParam('images_upload_url');
  };
  var getUploadHandler = function (editor) {
    return editor.getParam('images_upload_handler');
  };
  var getUploadBasePath = function (editor) {
    return editor.getParam('images_upload_base_path');
  };
  var getUploadCredentials = function (editor) {
    return editor.getParam('images_upload_credentials');
  };
  var $_gc1jdictjkmcwomd = {
    hasDimensions: hasDimensions,
    hasAdvTab: hasAdvTab,
    getPrependUrl: getPrependUrl,
    getClassList: getClassList,
    hasDescription: hasDescription,
    hasImageTitle: hasImageTitle,
    hasImageCaption: hasImageCaption,
    getImageList: getImageList,
    hasUploadUrl: hasUploadUrl,
    hasUploadHandler: hasUploadHandler,
    getUploadUrl: getUploadUrl,
    getUploadHandler: getUploadHandler,
    getUploadBasePath: getUploadBasePath,
    getUploadCredentials: getUploadCredentials
  };
  var Global = typeof window !== 'undefined' ? window : Function('return this;')();
  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : Global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var unsafe = function (name, scope) {
    return resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_db9o2scwjkmcwomp = { getOrDie: getOrDie };
  function FileReader () {
    var f = $_db9o2scwjkmcwomp.getOrDie('FileReader');
    return new f();
  }
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Promise');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');
  var parseIntAndGetMax = function (val1, val2) {
    return Math.max(parseInt(val1, 10), parseInt(val2, 10));
  };
  var getImageSize = function (url, callback) {
    var img = document.createElement('img');
    function done(width, height) {
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
      callback({
        width: width,
        height: height
      });
    }
    img.onload = function () {
      var width = parseIntAndGetMax(img.width, img.clientWidth);
      var height = parseIntAndGetMax(img.height, img.clientHeight);
      done(width, height);
    };
    img.onerror = function () {
      done(0, 0);
    };
    var style = img.style;
    style.visibility = 'hidden';
    style.position = 'fixed';
    style.bottom = style.left = '0px';
    style.width = style.height = 'auto';
    document.body.appendChild(img);
    img.src = url;
  };
  var buildListItems = function (inputList, itemCallback, startItems) {
    function appendItems(values, output) {
      output = output || [];
      global$2.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          itemCallback(menuItem);
        }
        output.push(menuItem);
      });
      return output;
    }
    return appendItems(inputList, startItems || []);
  };
  var removePixelSuffix = function (value) {
    if (value) {
      value = value.replace(/px$/, '');
    }
    return value;
  };
  var addPixelSuffix = function (value) {
    if (value.length > 0 && /^[0-9]+$/.test(value)) {
      value += 'px';
    }
    return value;
  };
  var mergeMargins = function (css) {
    if (css.margin) {
      var splitMargin = css.margin.split(' ');
      switch (splitMargin.length) {
      case 1:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[0];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
        css['margin-left'] = css['margin-left'] || splitMargin[0];
        break;
      case 2:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
        css['margin-left'] = css['margin-left'] || splitMargin[1];
        break;
      case 3:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
        css['margin-left'] = css['margin-left'] || splitMargin[1];
        break;
      case 4:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
        css['margin-left'] = css['margin-left'] || splitMargin[3];
      }
      delete css.margin;
    }
    return css;
  };
  var createImageList = function (editor, callback) {
    var imageList = $_gc1jdictjkmcwomd.getImageList(editor);
    if (typeof imageList === 'string') {
      global$3.send({
        url: imageList,
        success: function (text) {
          callback(JSON.parse(text));
        }
      });
    } else if (typeof imageList === 'function') {
      imageList(callback);
    } else {
      callback(imageList);
    }
  };
  var waitLoadImage = function (editor, data, imgElm) {
    function selectImage() {
      imgElm.onload = imgElm.onerror = null;
      if (editor.selection) {
        editor.selection.select(imgElm);
        editor.nodeChanged();
      }
    }
    imgElm.onload = function () {
      if (!data.width && !data.height && $_gc1jdictjkmcwomd.hasDimensions(editor)) {
        editor.dom.setAttribs(imgElm, {
          width: imgElm.clientWidth,
          height: imgElm.clientHeight
        });
      }
      selectImage();
    };
    imgElm.onerror = selectImage;
  };
  var blobToDataUri = function (blob) {
    return new global$1(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(FileReader.error.message);
      };
      reader.readAsDataURL(blob);
    });
  };
  var $_9v7cmwcujkmcwomi = {
    getImageSize: getImageSize,
    buildListItems: buildListItems,
    removePixelSuffix: removePixelSuffix,
    addPixelSuffix: addPixelSuffix,
    mergeMargins: mergeMargins,
    createImageList: createImageList,
    waitLoadImage: waitLoadImage,
    blobToDataUri: blobToDataUri
  };
  var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var shallow = function (old, nu) {
    return nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (hasOwnProperty.call(curObject, key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var merge = baseMerge(shallow);
  var DOM = global$4.DOM;
  var getHspace = function (image) {
    if (image.style.marginLeft && image.style.marginRight && image.style.marginLeft === image.style.marginRight) {
      return $_9v7cmwcujkmcwomi.removePixelSuffix(image.style.marginLeft);
    } else {
      return '';
    }
  };
  var getVspace = function (image) {
    if (image.style.marginTop && image.style.marginBottom && image.style.marginTop === image.style.marginBottom) {
      return $_9v7cmwcujkmcwomi.removePixelSuffix(image.style.marginTop);
    } else {
      return '';
    }
  };
  var getBorder = function (image) {
    if (image.style.borderWidth) {
      return $_9v7cmwcujkmcwomi.removePixelSuffix(image.style.borderWidth);
    } else {
      return '';
    }
  };
  var getAttrib = function (image, name$$1) {
    if (image.hasAttribute(name$$1)) {
      return image.getAttribute(name$$1);
    } else {
      return '';
    }
  };
  var getStyle = function (image, name$$1) {
    return image.style[name$$1] ? image.style[name$$1] : '';
  };
  var hasCaption = function (image) {
    return image.parentNode !== null && image.parentNode.nodeName === 'FIGURE';
  };
  var setAttrib = function (image, name$$1, value) {
    image.setAttribute(name$$1, value);
  };
  var wrapInFigure = function (image) {
    var figureElm = DOM.create('figure', { class: 'image' });
    DOM.insertAfter(figureElm, image);
    figureElm.appendChild(image);
    figureElm.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
    figureElm.contentEditable = 'false';
  };
  var removeFigure = function (image) {
    var figureElm = image.parentNode;
    DOM.insertAfter(image, figureElm);
    DOM.remove(figureElm);
  };
  var toggleCaption = function (image) {
    if (hasCaption(image)) {
      removeFigure(image);
    } else {
      wrapInFigure(image);
    }
  };
  var normalizeStyle = function (image, normalizeCss) {
    var attrValue = image.getAttribute('style');
    var value = normalizeCss(attrValue !== null ? attrValue : '');
    if (value.length > 0) {
      image.setAttribute('style', value);
      image.setAttribute('data-mce-style', value);
    } else {
      image.removeAttribute('style');
    }
  };
  var setSize = function (name$$1, normalizeCss) {
    return function (image, name$$1, value) {
      if (image.style[name$$1]) {
        image.style[name$$1] = $_9v7cmwcujkmcwomi.addPixelSuffix(value);
        normalizeStyle(image, normalizeCss);
      } else {
        setAttrib(image, name$$1, value);
      }
    };
  };
  var getSize = function (image, name$$1) {
    if (image.style[name$$1]) {
      return $_9v7cmwcujkmcwomi.removePixelSuffix(image.style[name$$1]);
    } else {
      return getAttrib(image, name$$1);
    }
  };
  var setHspace = function (image, value) {
    var pxValue = $_9v7cmwcujkmcwomi.addPixelSuffix(value);
    image.style.marginLeft = pxValue;
    image.style.marginRight = pxValue;
  };
  var setVspace = function (image, value) {
    var pxValue = $_9v7cmwcujkmcwomi.addPixelSuffix(value);
    image.style.marginTop = pxValue;
    image.style.marginBottom = pxValue;
  };
  var setBorder = function (image, value) {
    var pxValue = $_9v7cmwcujkmcwomi.addPixelSuffix(value);
    image.style.borderWidth = pxValue;
  };
  var setBorderStyle = function (image, value) {
    image.style.borderStyle = value;
  };
  var getBorderStyle = function (image) {
    return getStyle(image, 'borderStyle');
  };
  var isFigure = function (elm) {
    return elm.nodeName === 'FIGURE';
  };
  var defaultData = function () {
    return {
      src: '',
      alt: '',
      title: '',
      width: '',
      height: '',
      class: '',
      style: '',
      caption: false,
      hspace: '',
      vspace: '',
      border: '',
      borderStyle: ''
    };
  };
  var getStyleValue = function (normalizeCss, data) {
    var image = document.createElement('img');
    setAttrib(image, 'style', data.style);
    if (getHspace(image) || data.hspace !== '') {
      setHspace(image, data.hspace);
    }
    if (getVspace(image) || data.vspace !== '') {
      setVspace(image, data.vspace);
    }
    if (getBorder(image) || data.border !== '') {
      setBorder(image, data.border);
    }
    if (getBorderStyle(image) || data.borderStyle !== '') {
      setBorderStyle(image, data.borderStyle);
    }
    return normalizeCss(image.getAttribute('style'));
  };
  var create = function (normalizeCss, data) {
    var image = document.createElement('img');
    write(normalizeCss, merge(data, { caption: false }), image);
    setAttrib(image, 'alt', data.alt);
    if (data.caption) {
      var figure = DOM.create('figure', { class: 'image' });
      figure.appendChild(image);
      figure.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
      figure.contentEditable = 'false';
      return figure;
    } else {
      return image;
    }
  };
  var read = function (normalizeCss, image) {
    return {
      src: getAttrib(image, 'src'),
      alt: getAttrib(image, 'alt'),
      title: getAttrib(image, 'title'),
      width: getSize(image, 'width'),
      height: getSize(image, 'height'),
      class: getAttrib(image, 'class'),
      style: normalizeCss(getAttrib(image, 'style')),
      caption: hasCaption(image),
      hspace: getHspace(image),
      vspace: getVspace(image),
      border: getBorder(image),
      borderStyle: getStyle(image, 'borderStyle')
    };
  };
  var updateProp = function (image, oldData, newData, name$$1, set) {
    if (newData[name$$1] !== oldData[name$$1]) {
      set(image, name$$1, newData[name$$1]);
    }
  };
  var normalized = function (set, normalizeCss) {
    return function (image, name$$1, value) {
      set(image, value);
      normalizeStyle(image, normalizeCss);
    };
  };
  var write = function (normalizeCss, newData, image) {
    var oldData = read(normalizeCss, image);
    updateProp(image, oldData, newData, 'caption', function (image, _name, _value) {
      return toggleCaption(image);
    });
    updateProp(image, oldData, newData, 'src', setAttrib);
    updateProp(image, oldData, newData, 'alt', setAttrib);
    updateProp(image, oldData, newData, 'title', setAttrib);
    updateProp(image, oldData, newData, 'width', setSize('width', normalizeCss));
    updateProp(image, oldData, newData, 'height', setSize('height', normalizeCss));
    updateProp(image, oldData, newData, 'class', setAttrib);
    updateProp(image, oldData, newData, 'style', normalized(function (image, value) {
      return setAttrib(image, 'style', value);
    }, normalizeCss));
    updateProp(image, oldData, newData, 'hspace', normalized(setHspace, normalizeCss));
    updateProp(image, oldData, newData, 'vspace', normalized(setVspace, normalizeCss));
    updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
    updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
  };
  var normalizeCss = function (editor, cssText) {
    var css = editor.dom.styles.parse(cssText);
    var mergedCss = $_9v7cmwcujkmcwomi.mergeMargins(css);
    var compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
    return editor.dom.styles.serialize(compressed);
  };
  var getSelectedImage = function (editor) {
    var imgElm = editor.selection.getNode();
    var figureElm = editor.dom.getParent(imgElm, 'figure.image');
    if (figureElm) {
      return editor.dom.select('img', figureElm)[0];
    }
    if (imgElm && (imgElm.nodeName !== 'IMG' || imgElm.getAttribute('data-mce-object') || imgElm.getAttribute('data-mce-placeholder'))) {
      return null;
    }
    return imgElm;
  };
  var splitTextBlock = function (editor, figure) {
    var dom = editor.dom;
    var textBlock = dom.getParent(figure.parentNode, function (node) {
      return editor.schema.getTextBlockElements()[node.nodeName];
    });
    if (textBlock) {
      return dom.split(textBlock, figure);
    } else {
      return figure;
    }
  };
  var readImageDataFromSelection = function (editor) {
    var image = getSelectedImage(editor);
    return image ? read(function (css) {
      return normalizeCss(editor, css);
    }, image) : defaultData();
  };
  var insertImageAtCaret = function (editor, data) {
    var elm = create(function (css) {
      return normalizeCss(editor, css);
    }, data);
    editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
    editor.focus();
    editor.selection.setContent(elm.outerHTML);
    var insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
    editor.dom.setAttrib(insertedElm, 'data-mce-id', null);
    if (isFigure(insertedElm)) {
      var figure = splitTextBlock(editor, insertedElm);
      editor.selection.select(figure);
    } else {
      editor.selection.select(insertedElm);
    }
  };
  var syncSrcAttr = function (editor, image) {
    editor.dom.setAttrib(image, 'src', image.getAttribute('src'));
  };
  var deleteImage = function (editor, image) {
    if (image) {
      var elm = editor.dom.is(image.parentNode, 'figure.image') ? image.parentNode : image;
      editor.dom.remove(elm);
      editor.focus();
      editor.nodeChanged();
      if (editor.dom.isEmpty(editor.getBody())) {
        editor.setContent('');
        editor.selection.setCursorLocation();
      }
    }
  };
  var writeImageDataToSelection = function (editor, data) {
    var image = getSelectedImage(editor);
    write(function (css) {
      return normalizeCss(editor, css);
    }, data, image);
    syncSrcAttr(editor, image);
    if (isFigure(image.parentNode)) {
      var figure = image.parentNode;
      splitTextBlock(editor, figure);
      editor.selection.select(image.parentNode);
    } else {
      editor.selection.select(image);
      $_9v7cmwcujkmcwomi.waitLoadImage(editor, data, image);
    }
  };
  var insertOrUpdateImage = function (editor, data) {
    var image = getSelectedImage(editor);
    if (image) {
      if (data.src) {
        writeImageDataToSelection(editor, data);
      } else {
        deleteImage(editor, image);
      }
    } else if (data.src) {
      insertImageAtCaret(editor, data);
    }
  };
  var updateVSpaceHSpaceBorder = function (editor) {
    return function (evt) {
      var dom = editor.dom;
      var rootControl = evt.control.rootControl;
      if (!$_gc1jdictjkmcwomd.hasAdvTab(editor)) {
        return;
      }
      var data = rootControl.toJSON();
      var css = dom.parseStyle(data.style);
      rootControl.find('#vspace').value('');
      rootControl.find('#hspace').value('');
      css = $_9v7cmwcujkmcwomi.mergeMargins(css);
      if (css['margin-top'] && css['margin-bottom'] || css['margin-right'] && css['margin-left']) {
        if (css['margin-top'] === css['margin-bottom']) {
          rootControl.find('#vspace').value($_9v7cmwcujkmcwomi.removePixelSuffix(css['margin-top']));
        } else {
          rootControl.find('#vspace').value('');
        }
        if (css['margin-right'] === css['margin-left']) {
          rootControl.find('#hspace').value($_9v7cmwcujkmcwomi.removePixelSuffix(css['margin-right']));
        } else {
          rootControl.find('#hspace').value('');
        }
      }
      if (css['border-width']) {
        rootControl.find('#border').value($_9v7cmwcujkmcwomi.removePixelSuffix(css['border-width']));
      } else {
        rootControl.find('#border').value('');
      }
      if (css['border-style']) {
        rootControl.find('#borderStyle').value(css['border-style']);
      } else {
        rootControl.find('#borderStyle').value('');
      }
      rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
    };
  };
  var updateStyle = function (editor, win) {
    win.find('#style').each(function (ctrl) {
      var value = getStyleValue(function (css) {
        return normalizeCss(editor, css);
      }, merge(defaultData(), win.toJSON()));
      ctrl.value(value);
    });
  };
  var makeTab = function (editor) {
    return {
      title: 'Advanced',
      type: 'form',
      pack: 'start',
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox',
          onchange: updateVSpaceHSpaceBorder(editor)
        },
        {
          type: 'form',
          layout: 'grid',
          packV: 'start',
          columns: 2,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50,
            onchange: function (evt) {
              updateStyle(editor, evt.control.rootControl);
            }
          },
          items: [
            {
              label: 'Vertical space',
              name: 'vspace'
            },
            {
              label: 'Border width',
              name: 'border'
            },
            {
              label: 'Horizontal space',
              name: 'hspace'
            },
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              maxWidth: 90,
              onselect: function (evt) {
                updateStyle(editor, evt.control.rootControl);
              },
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            }
          ]
        }
      ]
    };
  };
  var $_4qd61kd3jkmcwonl = { makeTab: makeTab };
  var doSyncSize = function (widthCtrl, heightCtrl) {
    widthCtrl.state.set('oldVal', widthCtrl.value());
    heightCtrl.state.set('oldVal', heightCtrl.value());
  };
  var doSizeControls = function (win, f) {
    var widthCtrl = win.find('#width')[0];
    var heightCtrl = win.find('#height')[0];
    var constrained = win.find('#constrain')[0];
    if (widthCtrl && heightCtrl && constrained) {
      f(widthCtrl, heightCtrl, constrained.checked());
    }
  };
  var doUpdateSize = function (widthCtrl, heightCtrl, isContrained) {
    var oldWidth = widthCtrl.state.get('oldVal');
    var oldHeight = heightCtrl.state.get('oldVal');
    var newWidth = widthCtrl.value();
    var newHeight = heightCtrl.value();
    if (isContrained && oldWidth && oldHeight && newWidth && newHeight) {
      if (newWidth !== oldWidth) {
        newHeight = Math.round(newWidth / oldWidth * newHeight);
        if (!isNaN(newHeight)) {
          heightCtrl.value(newHeight);
        }
      } else {
        newWidth = Math.round(newHeight / oldHeight * newWidth);
        if (!isNaN(newWidth)) {
          widthCtrl.value(newWidth);
        }
      }
    }
    doSyncSize(widthCtrl, heightCtrl);
  };
  var syncSize = function (win) {
    doSizeControls(win, doSyncSize);
  };
  var updateSize = function (win) {
    doSizeControls(win, doUpdateSize);
  };
  var createUi = function () {
    var recalcSize = function (evt) {
      updateSize(evt.control.rootControl);
    };
    return {
      type: 'container',
      label: 'Dimensions',
      layout: 'flex',
      align: 'center',
      spacing: 5,
      items: [
        {
          name: 'width',
          type: 'textbox',
          maxLength: 5,
          size: 5,
          onchange: recalcSize,
          ariaLabel: 'Width'
        },
        {
          type: 'label',
          text: 'x'
        },
        {
          name: 'height',
          type: 'textbox',
          maxLength: 5,
          size: 5,
          onchange: recalcSize,
          ariaLabel: 'Height'
        },
        {
          name: 'constrain',
          type: 'checkbox',
          checked: true,
          text: 'Constrain proportions'
        }
      ]
    };
  };
  var $_14kdtjdajkmcwoo8 = {
    createUi: createUi,
    syncSize: syncSize,
    updateSize: updateSize
  };
  var onSrcChange = function (evt, editor) {
    var srcURL, prependURL, absoluteURLPattern;
    var meta = evt.meta || {};
    var control = evt.control;
    var rootControl = control.rootControl;
    var imageListCtrl = rootControl.find('#image-list')[0];
    if (imageListCtrl) {
      imageListCtrl.value(editor.convertURL(control.value(), 'src'));
    }
    global$2.each(meta, function (value, key) {
      rootControl.find('#' + key).value(value);
    });
    if (!meta.width && !meta.height) {
      srcURL = editor.convertURL(control.value(), 'src');
      prependURL = $_gc1jdictjkmcwomd.getPrependUrl(editor);
      absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (prependURL && !absoluteURLPattern.test(srcURL) && srcURL.substring(0, prependURL.length) !== prependURL) {
        srcURL = prependURL + srcURL;
      }
      control.value(srcURL);
      $_9v7cmwcujkmcwomi.getImageSize(editor.documentBaseURI.toAbsolute(control.value()), function (data) {
        if (data.width && data.height && $_gc1jdictjkmcwomd.hasDimensions(editor)) {
          rootControl.find('#width').value(data.width);
          rootControl.find('#height').value(data.height);
          $_14kdtjdajkmcwoo8.syncSize(rootControl);
        }
      });
    }
  };
  var onBeforeCall = function (evt) {
    evt.meta = evt.control.rootControl.toJSON();
  };
  var getGeneralItems = function (editor, imageListCtrl) {
    var generalFormItems = [
      {
        name: 'src',
        type: 'filepicker',
        filetype: 'image',
        label: 'Source',
        autofocus: true,
        onchange: function (evt) {
          onSrcChange(evt, editor);
        },
        onbeforecall: onBeforeCall
      },
      imageListCtrl
    ];
    if ($_gc1jdictjkmcwomd.hasDescription(editor)) {
      generalFormItems.push({
        name: 'alt',
        type: 'textbox',
        label: 'Image description'
      });
    }
    if ($_gc1jdictjkmcwomd.hasImageTitle(editor)) {
      generalFormItems.push({
        name: 'title',
        type: 'textbox',
        label: 'Image Title'
      });
    }
    if ($_gc1jdictjkmcwomd.hasDimensions(editor)) {
      generalFormItems.push($_14kdtjdajkmcwoo8.createUi());
    }
    if ($_gc1jdictjkmcwomd.getClassList(editor)) {
      generalFormItems.push({
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_9v7cmwcujkmcwomi.buildListItems($_gc1jdictjkmcwomd.getClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                inline: 'img',
                classes: [item.value]
              });
            };
          }
        })
      });
    }
    if ($_gc1jdictjkmcwomd.hasImageCaption(editor)) {
      generalFormItems.push({
        name: 'caption',
        type: 'checkbox',
        label: 'Caption'
      });
    }
    return generalFormItems;
  };
  var makeTab$1 = function (editor, imageListCtrl) {
    return {
      title: 'General',
      type: 'form',
      items: getGeneralItems(editor, imageListCtrl)
    };
  };
  var $_bpqbuud9jkmcwoo5 = {
    makeTab: makeTab$1,
    getGeneralItems: getGeneralItems
  };
  var url = function () {
    return $_db9o2scwjkmcwomp.getOrDie('URL');
  };
  var createObjectURL = function (blob) {
    return url().createObjectURL(blob);
  };
  var revokeObjectURL = function (u) {
    url().revokeObjectURL(u);
  };
  var $_e8tsx4dcjkmcwooe = {
    createObjectURL: createObjectURL,
    revokeObjectURL: revokeObjectURL
  };
  var global$5 = tinymce.util.Tools.resolve('tinymce.ui.Factory');
  function XMLHttpRequest () {
    var f = $_db9o2scwjkmcwomp.getOrDie('XMLHttpRequest');
    return new f();
  }
  var noop = function () {
  };
  var pathJoin = function (path1, path2) {
    if (path1) {
      return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
    }
    return path2;
  };
  function Uploader (settings) {
    var defaultHandler = function (blobInfo, success, failure, progress) {
      var xhr, formData;
      xhr = new XMLHttpRequest();
      xhr.open('POST', settings.url);
      xhr.withCredentials = settings.credentials;
      xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100);
      };
      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };
      xhr.onload = function () {
        var json;
        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(pathJoin(settings.basePath, json.location));
      };
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    };
    var uploadBlob = function (blobInfo, handler) {
      return new global$1(function (resolve, reject) {
        try {
          handler(blobInfo, resolve, reject, noop);
        } catch (ex) {
          reject(ex.message);
        }
      });
    };
    var isDefaultHandler = function (handler) {
      return handler === defaultHandler;
    };
    var upload = function (blobInfo) {
      return !settings.url && isDefaultHandler(settings.handler) ? global$1.reject('Upload url missing from the settings.') : uploadBlob(blobInfo, settings.handler);
    };
    settings = global$2.extend({
      credentials: false,
      handler: defaultHandler
    }, settings);
    return { upload: upload };
  }
  var onFileInput = function (editor) {
    return function (evt) {
      var Throbber = global$5.get('Throbber');
      var rootControl = evt.control.rootControl;
      var throbber = new Throbber(rootControl.getEl());
      var file = evt.control.value();
      var blobUri = $_e8tsx4dcjkmcwooe.createObjectURL(file);
      var uploader = Uploader({
        url: $_gc1jdictjkmcwomd.getUploadUrl(editor),
        basePath: $_gc1jdictjkmcwomd.getUploadBasePath(editor),
        credentials: $_gc1jdictjkmcwomd.getUploadCredentials(editor),
        handler: $_gc1jdictjkmcwomd.getUploadHandler(editor)
      });
      var finalize = function () {
        throbber.hide();
        $_e8tsx4dcjkmcwooe.revokeObjectURL(blobUri);
      };
      throbber.show();
      return $_9v7cmwcujkmcwomi.blobToDataUri(file).then(function (dataUrl) {
        var blobInfo = editor.editorUpload.blobCache.create({
          blob: file,
          blobUri: blobUri,
          name: file.name ? file.name.replace(/\.[^\.]+$/, '') : null,
          base64: dataUrl.split(',')[1]
        });
        return uploader.upload(blobInfo).then(function (url) {
          var src = rootControl.find('#src');
          src.value(url);
          rootControl.find('tabpanel')[0].activateTab(0);
          src.fire('change');
          finalize();
          return url;
        });
      }).catch(function (err) {
        editor.windowManager.alert(err);
        finalize();
      });
    };
  };
  var acceptExts = '.jpg,.jpeg,.png,.gif';
  var makeTab$2 = function (editor) {
    return {
      title: 'Upload',
      type: 'form',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      padding: '20 20 20 20',
      items: [
        {
          type: 'container',
          layout: 'flex',
          direction: 'column',
          align: 'center',
          spacing: 10,
          items: [
            {
              text: 'Browse for an image',
              type: 'browsebutton',
              accept: acceptExts,
              onchange: onFileInput(editor)
            },
            {
              text: 'OR',
              type: 'label'
            }
          ]
        },
        {
          text: 'Drop an image here',
          type: 'dropzone',
          accept: acceptExts,
          height: 100,
          onchange: onFileInput(editor)
        }
      ]
    };
  };
  var $_26ghgddbjkmcwooa = { makeTab: makeTab$2 };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var submitForm = function (editor, evt) {
    var win = evt.control.getRoot();
    $_14kdtjdajkmcwoo8.updateSize(win);
    editor.undoManager.transact(function () {
      var data = merge(readImageDataFromSelection(editor), win.toJSON());
      insertOrUpdateImage(editor, data);
    });
    editor.editorUpload.uploadImagesAuto();
  };
  function Dialog (editor) {
    function showDialog(imageList) {
      var data = readImageDataFromSelection(editor);
      var win, imageListCtrl;
      if (imageList) {
        imageListCtrl = {
          type: 'listbox',
          label: 'Image list',
          name: 'image-list',
          values: $_9v7cmwcujkmcwomi.buildListItems(imageList, function (item) {
            item.value = editor.convertURL(item.value || item.url, 'src');
          }, [{
              text: 'None',
              value: ''
            }]),
          value: data.src && editor.convertURL(data.src, 'src'),
          onselect: function (e) {
            var altCtrl = win.find('#alt');
            if (!altCtrl.value() || e.lastControl && altCtrl.value() === e.lastControl.text()) {
              altCtrl.value(e.control.text());
            }
            win.find('#src').value(e.control.value()).fire('change');
          },
          onPostRender: function () {
            imageListCtrl = this;
          }
        };
      }
      if ($_gc1jdictjkmcwomd.hasAdvTab(editor) || $_gc1jdictjkmcwomd.hasUploadUrl(editor) || $_gc1jdictjkmcwomd.hasUploadHandler(editor)) {
        var body = [$_bpqbuud9jkmcwoo5.makeTab(editor, imageListCtrl)];
        if ($_gc1jdictjkmcwomd.hasAdvTab(editor)) {
          body.push($_4qd61kd3jkmcwonl.makeTab(editor));
        }
        if ($_gc1jdictjkmcwomd.hasUploadUrl(editor) || $_gc1jdictjkmcwomd.hasUploadHandler(editor)) {
          body.push($_26ghgddbjkmcwooa.makeTab(editor));
        }
        win = editor.windowManager.open({
          title: 'Insert/edit image',
          data: data,
          bodyType: 'tabpanel',
          body: body,
          onSubmit: curry(submitForm, editor)
        });
      } else {
        win = editor.windowManager.open({
          title: 'Insert/edit image',
          data: data,
          body: $_bpqbuud9jkmcwoo5.getGeneralItems(editor, imageListCtrl),
          onSubmit: curry(submitForm, editor)
        });
      }
      $_14kdtjdajkmcwoo8.syncSize(win);
    }
    function open() {
      $_9v7cmwcujkmcwomi.createImageList(editor, showDialog);
    }
    return { open: open };
  }
  var register = function (editor) {
    editor.addCommand('mceImage', Dialog(editor).open);
  };
  var $_cwg86qcrjkmcwom6 = { register: register };
  var hasImageClass = function (node) {
    var className = node.attr('class');
    return className && /\bimage\b/.test(className);
  };
  var toggleContentEditableState = function (state) {
    return function (nodes) {
      var i = nodes.length, node;
      var toggleContentEditable = function (node) {
        node.attr('contenteditable', state ? 'true' : null);
      };
      while (i--) {
        node = nodes[i];
        if (hasImageClass(node)) {
          node.attr('contenteditable', state ? 'false' : null);
          global$2.each(node.getAll('figcaption'), toggleContentEditable);
        }
      }
    };
  };
  var setup = function (editor) {
    editor.on('preInit', function () {
      editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
      editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
    });
  };
  var $_8m7aavdhjkmcwooq = { setup: setup };
  var register$1 = function (editor) {
    editor.addButton('image', {
      icon: 'image',
      tooltip: 'Insert/edit image',
      onclick: Dialog(editor).open,
      stateSelector: 'img:not([data-mce-object],[data-mce-placeholder]),figure.image'
    });
    editor.addMenuItem('image', {
      icon: 'image',
      text: 'Image',
      onclick: Dialog(editor).open,
      context: 'insert',
      prependToContext: true
    });
  };
  var $_2zobs0dijkmcwoos = { register: register$1 };
  global.add('image', function (editor) {
    $_8m7aavdhjkmcwooq.setup(editor);
    $_2zobs0dijkmcwoos.register(editor);
    $_cwg86qcrjkmcwom6.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var importcss = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.EditorManager');
  var global$3 = tinymce.util.Tools.resolve('tinymce.Env');
  var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var shouldMergeClasses = function (editor) {
    return editor.getParam('importcss_merge_classes');
  };
  var shouldImportExclusive = function (editor) {
    return editor.getParam('importcss_exclusive');
  };
  var getSelectorConverter = function (editor) {
    return editor.getParam('importcss_selector_converter');
  };
  var getSelectorFilter = function (editor) {
    return editor.getParam('importcss_selector_filter');
  };
  var getCssGroups = function (editor) {
    return editor.getParam('importcss_groups');
  };
  var shouldAppend = function (editor) {
    return editor.getParam('importcss_append');
  };
  var getFileFilter = function (editor) {
    return editor.getParam('importcss_file_filter');
  };
  var $_9eehcvfcjkmcwp6k = {
    shouldMergeClasses: shouldMergeClasses,
    shouldImportExclusive: shouldImportExclusive,
    getSelectorConverter: getSelectorConverter,
    getSelectorFilter: getSelectorFilter,
    getCssGroups: getCssGroups,
    shouldAppend: shouldAppend,
    getFileFilter: getFileFilter
  };
  var removeCacheSuffix = function (url) {
    var cacheSuffix = global$3.cacheSuffix;
    if (typeof url === 'string') {
      url = url.replace('?' + cacheSuffix, '').replace('&' + cacheSuffix, '');
    }
    return url;
  };
  var isSkinContentCss = function (editor, href) {
    var settings = editor.settings, skin = settings.skin !== false ? settings.skin || 'lightgray' : false;
    if (skin) {
      var skinUrl = settings.skin_url ? editor.documentBaseURI.toAbsolute(settings.skin_url) : global$2.baseURL + '/skins/' + skin;
      return href === skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css';
    }
    return false;
  };
  var compileFilter = function (filter) {
    if (typeof filter === 'string') {
      return function (value) {
        return value.indexOf(filter) !== -1;
      };
    } else if (filter instanceof RegExp) {
      return function (value) {
        return filter.test(value);
      };
    }
    return filter;
  };
  var getSelectors = function (editor, doc, fileFilter) {
    var selectors = [], contentCSSUrls = {};
    function append(styleSheet, imported) {
      var href = styleSheet.href, rules;
      href = removeCacheSuffix(href);
      if (!href || !fileFilter(href, imported) || isSkinContentCss(editor, href)) {
        return;
      }
      global$4.each(styleSheet.imports, function (styleSheet) {
        append(styleSheet, true);
      });
      try {
        rules = styleSheet.cssRules || styleSheet.rules;
      } catch (e) {
      }
      global$4.each(rules, function (cssRule) {
        if (cssRule.styleSheet) {
          append(cssRule.styleSheet, true);
        } else if (cssRule.selectorText) {
          global$4.each(cssRule.selectorText.split(','), function (selector) {
            selectors.push(global$4.trim(selector));
          });
        }
      });
    }
    global$4.each(editor.contentCSS, function (url) {
      contentCSSUrls[url] = true;
    });
    if (!fileFilter) {
      fileFilter = function (href, imported) {
        return imported || contentCSSUrls[href];
      };
    }
    try {
      global$4.each(doc.styleSheets, function (styleSheet) {
        append(styleSheet);
      });
    } catch (e) {
    }
    return selectors;
  };
  var defaultConvertSelectorToFormat = function (editor, selectorText) {
    var format;
    var selector = /^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(selectorText);
    if (!selector) {
      return;
    }
    var elementName = selector[1];
    var classes = selector[2].substr(1).split('.').join(' ');
    var inlineSelectorElements = global$4.makeMap('a,img');
    if (selector[1]) {
      format = { title: selectorText };
      if (editor.schema.getTextBlockElements()[elementName]) {
        format.block = elementName;
      } else if (editor.schema.getBlockElements()[elementName] || inlineSelectorElements[elementName.toLowerCase()]) {
        format.selector = elementName;
      } else {
        format.inline = elementName;
      }
    } else if (selector[2]) {
      format = {
        inline: 'span',
        title: selectorText.substr(1),
        classes: classes
      };
    }
    if ($_9eehcvfcjkmcwp6k.shouldMergeClasses(editor) !== false) {
      format.classes = classes;
    } else {
      format.attributes = { class: classes };
    }
    return format;
  };
  var getGroupsBySelector = function (groups, selector) {
    return global$4.grep(groups, function (group) {
      return !group.filter || group.filter(selector);
    });
  };
  var compileUserDefinedGroups = function (groups) {
    return global$4.map(groups, function (group) {
      return global$4.extend({}, group, {
        original: group,
        selectors: {},
        filter: compileFilter(group.filter),
        item: {
          text: group.title,
          menu: []
        }
      });
    });
  };
  var isExclusiveMode = function (editor, group) {
    return group === null || $_9eehcvfcjkmcwp6k.shouldImportExclusive(editor) !== false;
  };
  var isUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
    return !(isExclusiveMode(editor, group) ? selector in globallyUniqueSelectors : selector in group.selectors);
  };
  var markUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
    if (isExclusiveMode(editor, group)) {
      globallyUniqueSelectors[selector] = true;
    } else {
      group.selectors[selector] = true;
    }
  };
  var convertSelectorToFormat = function (editor, plugin, selector, group) {
    var selectorConverter;
    if (group && group.selector_converter) {
      selectorConverter = group.selector_converter;
    } else if ($_9eehcvfcjkmcwp6k.getSelectorConverter(editor)) {
      selectorConverter = $_9eehcvfcjkmcwp6k.getSelectorConverter(editor);
    } else {
      selectorConverter = function () {
        return defaultConvertSelectorToFormat(editor, selector);
      };
    }
    return selectorConverter.call(plugin, selector, group);
  };
  var setup = function (editor) {
    editor.on('renderFormatsMenu', function (e) {
      var globallyUniqueSelectors = {};
      var selectorFilter = compileFilter($_9eehcvfcjkmcwp6k.getSelectorFilter(editor)), ctrl = e.control;
      var groups = compileUserDefinedGroups($_9eehcvfcjkmcwp6k.getCssGroups(editor));
      var processSelector = function (selector, group) {
        if (isUniqueSelector(editor, selector, group, globallyUniqueSelectors)) {
          markUniqueSelector(editor, selector, group, globallyUniqueSelectors);
          var format = convertSelectorToFormat(editor, editor.plugins.importcss, selector, group);
          if (format) {
            var formatName = format.name || global$1.DOM.uniqueId();
            editor.formatter.register(formatName, format);
            return global$4.extend({}, ctrl.settings.itemDefaults, {
              text: format.title,
              format: formatName
            });
          }
        }
        return null;
      };
      if (!$_9eehcvfcjkmcwp6k.shouldAppend(editor)) {
        ctrl.items().remove();
      }
      global$4.each(getSelectors(editor, e.doc || editor.getDoc(), compileFilter($_9eehcvfcjkmcwp6k.getFileFilter(editor))), function (selector) {
        if (selector.indexOf('.mce-') === -1) {
          if (!selectorFilter || selectorFilter(selector)) {
            var selectorGroups = getGroupsBySelector(groups, selector);
            if (selectorGroups.length > 0) {
              global$4.each(selectorGroups, function (group) {
                var menuItem = processSelector(selector, group);
                if (menuItem) {
                  group.item.menu.push(menuItem);
                }
              });
            } else {
              var menuItem = processSelector(selector, null);
              if (menuItem) {
                ctrl.add(menuItem);
              }
            }
          }
        }
      });
      global$4.each(groups, function (group) {
        if (group.item.menu.length > 0) {
          ctrl.add(group.item);
        }
      });
      e.control.renderNew();
    });
  };
  var $_2llan7f7jkmcwp6d = {
    defaultConvertSelectorToFormat: defaultConvertSelectorToFormat,
    setup: setup
  };
  var get = function (editor) {
    var convertSelectorToFormat = function (selectorText) {
      return $_2llan7f7jkmcwp6d.defaultConvertSelectorToFormat(editor, selectorText);
    };
    return { convertSelectorToFormat: convertSelectorToFormat };
  };
  var $_e2zr3af6jkmcwp69 = { get: get };
  global.add('importcss', function (editor) {
    $_2llan7f7jkmcwp6d.setup(editor);
    return $_e2zr3af6jkmcwp69.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var legacyoutput = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var overrideFormats = function (editor) {
    var alignElements = 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', fontSizes = global$1.explode(editor.settings.font_size_style_values), schema = editor.schema;
    editor.formatter.register({
      alignleft: {
        selector: alignElements,
        attributes: { align: 'left' }
      },
      aligncenter: {
        selector: alignElements,
        attributes: { align: 'center' }
      },
      alignright: {
        selector: alignElements,
        attributes: { align: 'right' }
      },
      alignjustify: {
        selector: alignElements,
        attributes: { align: 'justify' }
      },
      bold: [
        {
          inline: 'b',
          remove: 'all'
        },
        {
          inline: 'strong',
          remove: 'all'
        },
        {
          inline: 'span',
          styles: { fontWeight: 'bold' }
        }
      ],
      italic: [
        {
          inline: 'i',
          remove: 'all'
        },
        {
          inline: 'em',
          remove: 'all'
        },
        {
          inline: 'span',
          styles: { fontStyle: 'italic' }
        }
      ],
      underline: [
        {
          inline: 'u',
          remove: 'all'
        },
        {
          inline: 'span',
          styles: { textDecoration: 'underline' },
          exact: true
        }
      ],
      strikethrough: [
        {
          inline: 'strike',
          remove: 'all'
        },
        {
          inline: 'span',
          styles: { textDecoration: 'line-through' },
          exact: true
        }
      ],
      fontname: {
        inline: 'font',
        attributes: { face: '%value' }
      },
      fontsize: {
        inline: 'font',
        attributes: {
          size: function (vars) {
            return global$1.inArray(fontSizes, vars.value) + 1;
          }
        }
      },
      forecolor: {
        inline: 'font',
        attributes: { color: '%value' }
      },
      hilitecolor: {
        inline: 'font',
        styles: { backgroundColor: '%value' }
      }
    });
    global$1.each('b,i,u,strike'.split(','), function (name) {
      schema.addValidElements(name + '[*]');
    });
    if (!schema.getElementRule('font')) {
      schema.addValidElements('font[face|size|color|style]');
    }
    global$1.each(alignElements.split(','), function (name) {
      var rule = schema.getElementRule(name);
      if (rule) {
        if (!rule.attributes.align) {
          rule.attributes.align = {};
          rule.attributesOrder.push('align');
        }
      }
    });
  };
  var setup = function (editor) {
    editor.settings.inline_styles = false;
    editor.on('init', function () {
      overrideFormats(editor);
    });
  };
  var $_34p1gyfnjkmcwp7q = { setup: setup };
  var register = function (editor) {
    editor.addButton('fontsizeselect', function () {
      var items = [], defaultFontsizeFormats = '8pt=1 10pt=2 12pt=3 14pt=4 18pt=5 24pt=6 36pt=7';
      var fontsizeFormats = editor.settings.fontsizeFormats || defaultFontsizeFormats;
      editor.$.each(fontsizeFormats.split(' '), function (i, item) {
        var text = item, value = item;
        var values = item.split('=');
        if (values.length > 1) {
          text = values[0];
          value = values[1];
        }
        items.push({
          text: text,
          value: value
        });
      });
      return {
        type: 'listbox',
        text: 'Font Sizes',
        tooltip: 'Font Sizes',
        values: items,
        fixedWidth: true,
        onPostRender: function () {
          var self = this;
          editor.on('NodeChange', function () {
            var fontElm;
            fontElm = editor.dom.getParent(editor.selection.getNode(), 'font');
            if (fontElm) {
              self.value(fontElm.size);
            } else {
              self.value('');
            }
          });
        },
        onclick: function (e) {
          if (e.control.settings.value) {
            editor.execCommand('FontSize', false, e.control.settings.value);
          }
        }
      };
    });
    editor.addButton('fontselect', function () {
      function createFormats(formats) {
        formats = formats.replace(/;$/, '').split(';');
        var i = formats.length;
        while (i--) {
          formats[i] = formats[i].split('=');
        }
        return formats;
      }
      var defaultFontsFormats = 'Andale Mono=andale mono,monospace;' + 'Arial=arial,helvetica,sans-serif;' + 'Arial Black=arial black,sans-serif;' + 'Book Antiqua=book antiqua,palatino,serif;' + 'Comic Sans MS=comic sans ms,sans-serif;' + 'Courier New=courier new,courier,monospace;' + 'Georgia=georgia,palatino,serif;' + 'Helvetica=helvetica,arial,sans-serif;' + 'Impact=impact,sans-serif;' + 'Symbol=symbol;' + 'Tahoma=tahoma,arial,helvetica,sans-serif;' + 'Terminal=terminal,monaco,monospace;' + 'Times New Roman=times new roman,times,serif;' + 'Trebuchet MS=trebuchet ms,geneva,sans-serif;' + 'Verdana=verdana,geneva,sans-serif;' + 'Webdings=webdings;' + 'Wingdings=wingdings,zapf dingbats';
      var items = [], fonts = createFormats(editor.settings.font_formats || defaultFontsFormats);
      editor.$.each(fonts, function (i, font) {
        items.push({
          text: { raw: font[0] },
          value: font[1],
          textStyle: font[1].indexOf('dings') === -1 ? 'font-family:' + font[1] : ''
        });
      });
      return {
        type: 'listbox',
        text: 'Font Family',
        tooltip: 'Font Family',
        values: items,
        fixedWidth: true,
        onPostRender: function () {
          var self = this;
          editor.on('NodeChange', function () {
            var fontElm;
            fontElm = editor.dom.getParent(editor.selection.getNode(), 'font');
            if (fontElm) {
              self.value(fontElm.face);
            } else {
              self.value('');
            }
          });
        },
        onselect: function (e) {
          if (e.control.settings.value) {
            editor.execCommand('FontName', false, e.control.settings.value);
          }
        }
      };
    });
  };
  var $_3yhahqfpjkmcwp7u = { register: register };
  global.add('legacyoutput', function (editor) {
    $_34p1gyfnjkmcwp7q.setup(editor);
    $_3yhahqfpjkmcwp7u.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var lists = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var global$4 = tinymce.util.Tools.resolve('tinymce.dom.BookmarkManager');
  var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$6 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var isTextNode = function (node) {
    return node && node.nodeType === 3;
  };
  var isListNode = function (node) {
    return node && /^(OL|UL|DL)$/.test(node.nodeName);
  };
  var isListItemNode = function (node) {
    return node && /^(LI|DT|DD)$/.test(node.nodeName);
  };
  var isTableCellNode = function (node) {
    return node && /^(TH|TD)$/.test(node.nodeName);
  };
  var isBr = function (node) {
    return node && node.nodeName === 'BR';
  };
  var isFirstChild = function (node) {
    return node.parentNode.firstChild === node;
  };
  var isLastChild = function (node) {
    return node.parentNode.lastChild === node;
  };
  var isTextBlock = function (editor, node) {
    return node && !!editor.schema.getTextBlockElements()[node.nodeName];
  };
  var isBlock = function (node, blockElements) {
    return node && node.nodeName in blockElements;
  };
  var isBogusBr = function (dom, node) {
    if (!isBr(node)) {
      return false;
    }
    if (dom.isBlock(node.nextSibling) && !isBr(node.previousSibling)) {
      return true;
    }
    return false;
  };
  var isEmpty = function (dom, elm, keepBookmarks) {
    var empty = dom.isEmpty(elm);
    if (keepBookmarks && dom.select('span[data-mce-type=bookmark]', elm).length > 0) {
      return false;
    }
    return empty;
  };
  var isChildOfBody = function (dom, elm) {
    return dom.isChildOf(elm, dom.getRoot());
  };
  var $_eyfb4cgljkmcwpc0 = {
    isTextNode: isTextNode,
    isListNode: isListNode,
    isListItemNode: isListItemNode,
    isTableCellNode: isTableCellNode,
    isBr: isBr,
    isFirstChild: isFirstChild,
    isLastChild: isLastChild,
    isTextBlock: isTextBlock,
    isBlock: isBlock,
    isBogusBr: isBogusBr,
    isEmpty: isEmpty,
    isChildOfBody: isChildOfBody
  };
  var getNormalizedEndPoint = function (container, offset) {
    var node = global$1.getNode(container, offset);
    if ($_eyfb4cgljkmcwpc0.isListItemNode(container) && $_eyfb4cgljkmcwpc0.isTextNode(node)) {
      var textNodeOffset = offset >= container.childNodes.length ? node.data.length : 0;
      return {
        container: node,
        offset: textNodeOffset
      };
    }
    return {
      container: container,
      offset: offset
    };
  };
  var normalizeRange = function (rng) {
    var outRng = rng.cloneRange();
    var rangeStart = getNormalizedEndPoint(rng.startContainer, rng.startOffset);
    outRng.setStart(rangeStart.container, rangeStart.offset);
    var rangeEnd = getNormalizedEndPoint(rng.endContainer, rng.endOffset);
    outRng.setEnd(rangeEnd.container, rangeEnd.offset);
    return outRng;
  };
  var $_8n62cfgkjkmcwpbw = {
    getNormalizedEndPoint: getNormalizedEndPoint,
    normalizeRange: normalizeRange
  };
  var DOM = global$6.DOM;
  var createBookmark = function (rng) {
    var bookmark = {};
    var setupEndPoint = function (start) {
      var offsetNode, container, offset;
      container = rng[start ? 'startContainer' : 'endContainer'];
      offset = rng[start ? 'startOffset' : 'endOffset'];
      if (container.nodeType === 1) {
        offsetNode = DOM.create('span', { 'data-mce-type': 'bookmark' });
        if (container.hasChildNodes()) {
          offset = Math.min(offset, container.childNodes.length - 1);
          if (start) {
            container.insertBefore(offsetNode, container.childNodes[offset]);
          } else {
            DOM.insertAfter(offsetNode, container.childNodes[offset]);
          }
        } else {
          container.appendChild(offsetNode);
        }
        container = offsetNode;
        offset = 0;
      }
      bookmark[start ? 'startContainer' : 'endContainer'] = container;
      bookmark[start ? 'startOffset' : 'endOffset'] = offset;
    };
    setupEndPoint(true);
    if (!rng.collapsed) {
      setupEndPoint();
    }
    return bookmark;
  };
  var resolveBookmark = function (bookmark) {
    function restoreEndPoint(start) {
      var container, offset, node;
      var nodeIndex = function (container) {
        var node = container.parentNode.firstChild, idx = 0;
        while (node) {
          if (node === container) {
            return idx;
          }
          if (node.nodeType !== 1 || node.getAttribute('data-mce-type') !== 'bookmark') {
            idx++;
          }
          node = node.nextSibling;
        }
        return -1;
      };
      container = node = bookmark[start ? 'startContainer' : 'endContainer'];
      offset = bookmark[start ? 'startOffset' : 'endOffset'];
      if (!container) {
        return;
      }
      if (container.nodeType === 1) {
        offset = nodeIndex(container);
        container = container.parentNode;
        DOM.remove(node);
        if (!container.hasChildNodes() && DOM.isBlock(container)) {
          container.appendChild(DOM.create('br'));
        }
      }
      bookmark[start ? 'startContainer' : 'endContainer'] = container;
      bookmark[start ? 'startOffset' : 'endOffset'] = offset;
    }
    restoreEndPoint(true);
    restoreEndPoint();
    var rng = DOM.createRng();
    rng.setStart(bookmark.startContainer, bookmark.startOffset);
    if (bookmark.endContainer) {
      rng.setEnd(bookmark.endContainer, bookmark.endOffset);
    }
    return $_8n62cfgkjkmcwpbw.normalizeRange(rng);
  };
  var $_aredwjgjjkmcwpbt = {
    createBookmark: createBookmark,
    resolveBookmark: resolveBookmark
  };
  var DOM$1 = global$6.DOM;
  var normalizeList = function (dom, ul) {
    var sibling;
    var parentNode = ul.parentNode;
    if (parentNode.nodeName === 'LI' && parentNode.firstChild === ul) {
      sibling = parentNode.previousSibling;
      if (sibling && sibling.nodeName === 'LI') {
        sibling.appendChild(ul);
        if ($_eyfb4cgljkmcwpc0.isEmpty(dom, parentNode)) {
          DOM$1.remove(parentNode);
        }
      } else {
        DOM$1.setStyle(parentNode, 'listStyleType', 'none');
      }
    }
    if ($_eyfb4cgljkmcwpc0.isListNode(parentNode)) {
      sibling = parentNode.previousSibling;
      if (sibling && sibling.nodeName === 'LI') {
        sibling.appendChild(ul);
      }
    }
  };
  var normalizeLists = function (dom, element) {
    global$5.each(global$5.grep(dom.select('ol,ul', element)), function (ul) {
      normalizeList(dom, ul);
    });
  };
  var $_f0sxyjgmjkmcwpc3 = {
    normalizeList: normalizeList,
    normalizeLists: normalizeLists
  };
  var global$7 = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');
  var getParentList = function (editor) {
    var selectionStart = editor.selection.getStart(true);
    return editor.dom.getParent(selectionStart, 'OL,UL,DL', getClosestListRootElm(editor, selectionStart));
  };
  var isParentListSelected = function (parentList, selectedBlocks) {
    return parentList && selectedBlocks.length === 1 && selectedBlocks[0] === parentList;
  };
  var findSubLists = function (parentList) {
    return global$5.grep(parentList.querySelectorAll('ol,ul,dl'), function (elm) {
      return $_eyfb4cgljkmcwpc0.isListNode(elm);
    });
  };
  var getSelectedSubLists = function (editor) {
    var parentList = getParentList(editor);
    var selectedBlocks = editor.selection.getSelectedBlocks();
    if (isParentListSelected(parentList, selectedBlocks)) {
      return findSubLists(parentList);
    } else {
      return global$5.grep(selectedBlocks, function (elm) {
        return $_eyfb4cgljkmcwpc0.isListNode(elm) && parentList !== elm;
      });
    }
  };
  var findParentListItemsNodes = function (editor, elms) {
    var listItemsElms = global$5.map(elms, function (elm) {
      var parentLi = editor.dom.getParent(elm, 'li,dd,dt', getClosestListRootElm(editor, elm));
      return parentLi ? parentLi : elm;
    });
    return global$7.unique(listItemsElms);
  };
  var getSelectedListItems = function (editor) {
    var selectedBlocks = editor.selection.getSelectedBlocks();
    return global$5.grep(findParentListItemsNodes(editor, selectedBlocks), function (block) {
      return $_eyfb4cgljkmcwpc0.isListItemNode(block);
    });
  };
  var getClosestListRootElm = function (editor, elm) {
    var parentTableCell = editor.dom.getParents(elm, 'TD,TH');
    var root = parentTableCell.length > 0 ? parentTableCell[0] : editor.getBody();
    return root;
  };
  var $_g5359xgnjkmcwpc5 = {
    getParentList: getParentList,
    getSelectedSubLists: getSelectedSubLists,
    getSelectedListItems: getSelectedListItems,
    getClosestListRootElm: getClosestListRootElm
  };
  var global$8 = tinymce.util.Tools.resolve('tinymce.Env');
  var DOM$2 = global$6.DOM;
  var createNewTextBlock = function (editor, contentNode, blockName) {
    var node, textBlock;
    var fragment = DOM$2.createFragment();
    var hasContentNode;
    var blockElements = editor.schema.getBlockElements();
    if (editor.settings.forced_root_block) {
      blockName = blockName || editor.settings.forced_root_block;
    }
    if (blockName) {
      textBlock = DOM$2.create(blockName);
      if (textBlock.tagName === editor.settings.forced_root_block) {
        DOM$2.setAttribs(textBlock, editor.settings.forced_root_block_attrs);
      }
      if (!$_eyfb4cgljkmcwpc0.isBlock(contentNode.firstChild, blockElements)) {
        fragment.appendChild(textBlock);
      }
    }
    if (contentNode) {
      while (node = contentNode.firstChild) {
        var nodeName = node.nodeName;
        if (!hasContentNode && (nodeName !== 'SPAN' || node.getAttribute('data-mce-type') !== 'bookmark')) {
          hasContentNode = true;
        }
        if ($_eyfb4cgljkmcwpc0.isBlock(node, blockElements)) {
          fragment.appendChild(node);
          textBlock = null;
        } else {
          if (blockName) {
            if (!textBlock) {
              textBlock = DOM$2.create(blockName);
              fragment.appendChild(textBlock);
            }
            textBlock.appendChild(node);
          } else {
            fragment.appendChild(node);
          }
        }
      }
    }
    if (!editor.settings.forced_root_block) {
      fragment.appendChild(DOM$2.create('br'));
    } else {
      if (!hasContentNode && (!global$8.ie || global$8.ie > 10)) {
        textBlock.appendChild(DOM$2.create('br', { 'data-mce-bogus': '1' }));
      }
    }
    return fragment;
  };
  var $_givla1gqjkmcwpcb = { createNewTextBlock: createNewTextBlock };
  var DOM$3 = global$6.DOM;
  var splitList = function (editor, ul, li, newBlock) {
    var tmpRng, fragment, bookmarks, node;
    var removeAndKeepBookmarks = function (targetNode) {
      global$5.each(bookmarks, function (node) {
        targetNode.parentNode.insertBefore(node, li.parentNode);
      });
      DOM$3.remove(targetNode);
    };
    bookmarks = DOM$3.select('span[data-mce-type="bookmark"]', ul);
    newBlock = newBlock || $_givla1gqjkmcwpcb.createNewTextBlock(editor, li);
    tmpRng = DOM$3.createRng();
    tmpRng.setStartAfter(li);
    tmpRng.setEndAfter(ul);
    fragment = tmpRng.extractContents();
    for (node = fragment.firstChild; node; node = node.firstChild) {
      if (node.nodeName === 'LI' && editor.dom.isEmpty(node)) {
        DOM$3.remove(node);
        break;
      }
    }
    if (!editor.dom.isEmpty(fragment)) {
      DOM$3.insertAfter(fragment, ul);
    }
    DOM$3.insertAfter(newBlock, ul);
    if ($_eyfb4cgljkmcwpc0.isEmpty(editor.dom, li.parentNode)) {
      removeAndKeepBookmarks(li.parentNode);
    }
    DOM$3.remove(li);
    if ($_eyfb4cgljkmcwpc0.isEmpty(editor.dom, ul)) {
      DOM$3.remove(ul);
    }
  };
  var $_3aykwpgpjkmcwpc8 = { splitList: splitList };
  var DOM$4 = global$6.DOM;
  var removeEmptyLi = function (dom, li) {
    if ($_eyfb4cgljkmcwpc0.isEmpty(dom, li)) {
      DOM$4.remove(li);
    }
  };
  var outdent = function (editor, li) {
    var ul = li.parentNode;
    var ulParent, newBlock;
    if (ul) {
      ulParent = ul.parentNode;
    } else {
      removeEmptyLi(editor.dom, li);
      return true;
    }
    if (ul === editor.getBody()) {
      return true;
    }
    if (li.nodeName === 'DD') {
      DOM$4.rename(li, 'DT');
      return true;
    }
    if ($_eyfb4cgljkmcwpc0.isFirstChild(li) && $_eyfb4cgljkmcwpc0.isLastChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM$4.insertAfter(li, ulParent);
        removeEmptyLi(editor.dom, ulParent);
        DOM$4.remove(ul);
      } else if ($_eyfb4cgljkmcwpc0.isListNode(ulParent)) {
        DOM$4.remove(ul, true);
      } else {
        ulParent.insertBefore($_givla1gqjkmcwpcb.createNewTextBlock(editor, li), ul);
        DOM$4.remove(ul);
      }
      return true;
    } else if ($_eyfb4cgljkmcwpc0.isFirstChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM$4.insertAfter(li, ulParent);
        li.appendChild(ul);
        removeEmptyLi(editor.dom, ulParent);
      } else if ($_eyfb4cgljkmcwpc0.isListNode(ulParent)) {
        ulParent.insertBefore(li, ul);
      } else {
        ulParent.insertBefore($_givla1gqjkmcwpcb.createNewTextBlock(editor, li), ul);
        DOM$4.remove(li);
      }
      return true;
    } else if ($_eyfb4cgljkmcwpc0.isLastChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM$4.insertAfter(li, ulParent);
      } else if ($_eyfb4cgljkmcwpc0.isListNode(ulParent)) {
        DOM$4.insertAfter(li, ul);
      } else {
        DOM$4.insertAfter($_givla1gqjkmcwpcb.createNewTextBlock(editor, li), ul);
        DOM$4.remove(li);
      }
      return true;
    }
    if (ulParent.nodeName === 'LI') {
      ul = ulParent;
      newBlock = $_givla1gqjkmcwpcb.createNewTextBlock(editor, li, 'LI');
    } else if ($_eyfb4cgljkmcwpc0.isListNode(ulParent)) {
      newBlock = $_givla1gqjkmcwpcb.createNewTextBlock(editor, li, 'LI');
    } else {
      newBlock = $_givla1gqjkmcwpcb.createNewTextBlock(editor, li);
    }
    $_3aykwpgpjkmcwpc8.splitList(editor, ul, li, newBlock);
    $_f0sxyjgmjkmcwpc3.normalizeLists(editor.dom, ul.parentNode);
    return true;
  };
  var outdentSelection = function (editor) {
    var listElements = $_g5359xgnjkmcwpc5.getSelectedListItems(editor);
    if (listElements.length) {
      var bookmark = $_aredwjgjjkmcwpbt.createBookmark(editor.selection.getRng());
      var i = void 0, y = void 0;
      var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, editor.selection.getStart(true));
      i = listElements.length;
      while (i--) {
        var node = listElements[i].parentNode;
        while (node && node !== root) {
          y = listElements.length;
          while (y--) {
            if (listElements[y] === node) {
              listElements.splice(i, 1);
              break;
            }
          }
          node = node.parentNode;
        }
      }
      for (i = 0; i < listElements.length; i++) {
        if (!outdent(editor, listElements[i]) && i === 0) {
          break;
        }
      }
      editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
      editor.nodeChanged();
      return true;
    }
  };
  var $_80fi2gghjkmcwpbq = {
    outdent: outdent,
    outdentSelection: outdentSelection
  };
  var updateListStyle = function (dom, el, detail) {
    var type = detail['list-style-type'] ? detail['list-style-type'] : null;
    dom.setStyle(el, 'list-style-type', type);
  };
  var setAttribs = function (elm, attrs) {
    global$5.each(attrs, function (value, key) {
      elm.setAttribute(key, value);
    });
  };
  var updateListAttrs = function (dom, el, detail) {
    setAttribs(el, detail['list-attributes']);
    global$5.each(dom.select('li', el), function (li) {
      setAttribs(li, detail['list-item-attributes']);
    });
  };
  var updateListWithDetails = function (dom, el, detail) {
    updateListStyle(dom, el, detail);
    updateListAttrs(dom, el, detail);
  };
  var removeStyles = function (dom, element, styles) {
    global$5.each(styles, function (style) {
      var _a;
      return dom.setStyle(element, (_a = {}, _a[style] = '', _a));
    });
  };
  var getEndPointNode = function (editor, rng, start, root) {
    var container, offset;
    container = rng[start ? 'startContainer' : 'endContainer'];
    offset = rng[start ? 'startOffset' : 'endOffset'];
    if (container.nodeType === 1) {
      container = container.childNodes[Math.min(offset, container.childNodes.length - 1)] || container;
    }
    if (!start && $_eyfb4cgljkmcwpc0.isBr(container.nextSibling)) {
      container = container.nextSibling;
    }
    while (container.parentNode !== root) {
      if ($_eyfb4cgljkmcwpc0.isTextBlock(editor, container)) {
        return container;
      }
      if (/^(TD|TH)$/.test(container.parentNode.nodeName)) {
        return container;
      }
      container = container.parentNode;
    }
    return container;
  };
  var getSelectedTextBlocks = function (editor, rng, root) {
    var textBlocks = [], dom = editor.dom;
    var startNode = getEndPointNode(editor, rng, true, root);
    var endNode = getEndPointNode(editor, rng, false, root);
    var block;
    var siblings = [];
    for (var node = startNode; node; node = node.nextSibling) {
      siblings.push(node);
      if (node === endNode) {
        break;
      }
    }
    global$5.each(siblings, function (node) {
      if ($_eyfb4cgljkmcwpc0.isTextBlock(editor, node)) {
        textBlocks.push(node);
        block = null;
        return;
      }
      if (dom.isBlock(node) || $_eyfb4cgljkmcwpc0.isBr(node)) {
        if ($_eyfb4cgljkmcwpc0.isBr(node)) {
          dom.remove(node);
        }
        block = null;
        return;
      }
      var nextSibling = node.nextSibling;
      if (global$4.isBookmarkNode(node)) {
        if ($_eyfb4cgljkmcwpc0.isTextBlock(editor, nextSibling) || !nextSibling && node.parentNode === root) {
          block = null;
          return;
        }
      }
      if (!block) {
        block = dom.create('p');
        node.parentNode.insertBefore(block, node);
        textBlocks.push(block);
      }
      block.appendChild(node);
    });
    return textBlocks;
  };
  var hasCompatibleStyle = function (dom, sib, detail) {
    var sibStyle = dom.getStyle(sib, 'list-style-type');
    var detailStyle = detail ? detail['list-style-type'] : '';
    detailStyle = detailStyle === null ? '' : detailStyle;
    return sibStyle === detailStyle;
  };
  var applyList = function (editor, listName, detail) {
    if (detail === void 0) {
      detail = {};
    }
    var rng = editor.selection.getRng(true);
    var bookmark;
    var listItemName = 'LI';
    var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, editor.selection.getStart(true));
    var dom = editor.dom;
    if (dom.getContentEditable(editor.selection.getNode()) === 'false') {
      return;
    }
    listName = listName.toUpperCase();
    if (listName === 'DL') {
      listItemName = 'DT';
    }
    bookmark = $_aredwjgjjkmcwpbt.createBookmark(rng);
    global$5.each(getSelectedTextBlocks(editor, rng, root), function (block) {
      var listBlock, sibling;
      sibling = block.previousSibling;
      if (sibling && $_eyfb4cgljkmcwpc0.isListNode(sibling) && sibling.nodeName === listName && hasCompatibleStyle(dom, sibling, detail)) {
        listBlock = sibling;
        block = dom.rename(block, listItemName);
        sibling.appendChild(block);
      } else {
        listBlock = dom.create(listName);
        block.parentNode.insertBefore(listBlock, block);
        listBlock.appendChild(block);
        block = dom.rename(block, listItemName);
      }
      removeStyles(dom, block, [
        'margin',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'margin-top',
        'padding',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'padding-top'
      ]);
      updateListWithDetails(dom, listBlock, detail);
      mergeWithAdjacentLists(editor.dom, listBlock);
    });
    editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
  };
  var removeList = function (editor) {
    var bookmark = $_aredwjgjjkmcwpbt.createBookmark(editor.selection.getRng(true));
    var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, editor.selection.getStart(true));
    var listItems = $_g5359xgnjkmcwpc5.getSelectedListItems(editor);
    var emptyListItems = global$5.grep(listItems, function (li) {
      return editor.dom.isEmpty(li);
    });
    listItems = global$5.grep(listItems, function (li) {
      return !editor.dom.isEmpty(li);
    });
    global$5.each(emptyListItems, function (li) {
      if ($_eyfb4cgljkmcwpc0.isEmpty(editor.dom, li)) {
        $_80fi2gghjkmcwpbq.outdent(editor, li);
        return;
      }
    });
    global$5.each(listItems, function (li) {
      var node, rootList;
      if (li.parentNode === editor.getBody()) {
        return;
      }
      for (node = li; node && node !== root; node = node.parentNode) {
        if ($_eyfb4cgljkmcwpc0.isListNode(node)) {
          rootList = node;
        }
      }
      $_3aykwpgpjkmcwpc8.splitList(editor, rootList, li);
      $_f0sxyjgmjkmcwpc3.normalizeLists(editor.dom, rootList.parentNode);
    });
    editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
  };
  var isValidLists = function (list1, list2) {
    return list1 && list2 && $_eyfb4cgljkmcwpc0.isListNode(list1) && list1.nodeName === list2.nodeName;
  };
  var hasSameListStyle = function (dom, list1, list2) {
    var targetStyle = dom.getStyle(list1, 'list-style-type', true);
    var style = dom.getStyle(list2, 'list-style-type', true);
    return targetStyle === style;
  };
  var hasSameClasses = function (elm1, elm2) {
    return elm1.className === elm2.className;
  };
  var shouldMerge = function (dom, list1, list2) {
    return isValidLists(list1, list2) && hasSameListStyle(dom, list1, list2) && hasSameClasses(list1, list2);
  };
  var mergeWithAdjacentLists = function (dom, listBlock) {
    var sibling, node;
    sibling = listBlock.nextSibling;
    if (shouldMerge(dom, listBlock, sibling)) {
      while (node = sibling.firstChild) {
        listBlock.appendChild(node);
      }
      dom.remove(sibling);
    }
    sibling = listBlock.previousSibling;
    if (shouldMerge(dom, listBlock, sibling)) {
      while (node = sibling.lastChild) {
        listBlock.insertBefore(node, listBlock.firstChild);
      }
      dom.remove(sibling);
    }
  };
  var updateList = function (dom, list, listName, detail) {
    if (list.nodeName !== listName) {
      var newList = dom.rename(list, listName);
      updateListWithDetails(dom, newList, detail);
    } else {
      updateListWithDetails(dom, list, detail);
    }
  };
  var toggleMultipleLists = function (editor, parentList, lists, listName, detail) {
    if (parentList.nodeName === listName && !hasListStyleDetail(detail)) {
      removeList(editor);
    } else {
      var bookmark = $_aredwjgjjkmcwpbt.createBookmark(editor.selection.getRng(true));
      global$5.each([parentList].concat(lists), function (elm) {
        updateList(editor.dom, elm, listName, detail);
      });
      editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
    }
  };
  var hasListStyleDetail = function (detail) {
    return 'list-style-type' in detail;
  };
  var toggleSingleList = function (editor, parentList, listName, detail) {
    if (parentList === editor.getBody()) {
      return;
    }
    if (parentList) {
      if (parentList.nodeName === listName && !hasListStyleDetail(detail)) {
        removeList(editor);
      } else {
        var bookmark = $_aredwjgjjkmcwpbt.createBookmark(editor.selection.getRng(true));
        updateListWithDetails(editor.dom, parentList, detail);
        mergeWithAdjacentLists(editor.dom, editor.dom.rename(parentList, listName));
        editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
      }
    } else {
      applyList(editor, listName, detail);
    }
  };
  var toggleList = function (editor, listName, detail) {
    var parentList = $_g5359xgnjkmcwpc5.getParentList(editor);
    var selectedSubLists = $_g5359xgnjkmcwpc5.getSelectedSubLists(editor);
    detail = detail ? detail : {};
    if (parentList && selectedSubLists.length > 0) {
      toggleMultipleLists(editor, parentList, selectedSubLists, listName, detail);
    } else {
      toggleSingleList(editor, parentList, listName, detail);
    }
  };
  var $_8bvl87gejkmcwpbi = {
    toggleList: toggleList,
    removeList: removeList,
    mergeWithAdjacentLists: mergeWithAdjacentLists
  };
  var findNextCaretContainer = function (editor, rng, isForward, root) {
    var node = rng.startContainer;
    var offset = rng.startOffset;
    var nonEmptyBlocks, walker;
    if (node.nodeType === 3 && (isForward ? offset < node.data.length : offset > 0)) {
      return node;
    }
    nonEmptyBlocks = editor.schema.getNonEmptyElements();
    if (node.nodeType === 1) {
      node = global$1.getNode(node, offset);
    }
    walker = new global$2(node, root);
    if (isForward) {
      if ($_eyfb4cgljkmcwpc0.isBogusBr(editor.dom, node)) {
        walker.next();
      }
    }
    while (node = walker[isForward ? 'next' : 'prev2']()) {
      if (node.nodeName === 'LI' && !node.hasChildNodes()) {
        return node;
      }
      if (nonEmptyBlocks[node.nodeName]) {
        return node;
      }
      if (node.nodeType === 3 && node.data.length > 0) {
        return node;
      }
    }
  };
  var hasOnlyOneBlockChild = function (dom, elm) {
    var childNodes = elm.childNodes;
    return childNodes.length === 1 && !$_eyfb4cgljkmcwpc0.isListNode(childNodes[0]) && dom.isBlock(childNodes[0]);
  };
  var unwrapSingleBlockChild = function (dom, elm) {
    if (hasOnlyOneBlockChild(dom, elm)) {
      dom.remove(elm.firstChild, true);
    }
  };
  var moveChildren = function (dom, fromElm, toElm) {
    var node, targetElm;
    targetElm = hasOnlyOneBlockChild(dom, toElm) ? toElm.firstChild : toElm;
    unwrapSingleBlockChild(dom, fromElm);
    if (!$_eyfb4cgljkmcwpc0.isEmpty(dom, fromElm, true)) {
      while (node = fromElm.firstChild) {
        targetElm.appendChild(node);
      }
    }
  };
  var mergeLiElements = function (dom, fromElm, toElm) {
    var node, listNode;
    var ul = fromElm.parentNode;
    if (!$_eyfb4cgljkmcwpc0.isChildOfBody(dom, fromElm) || !$_eyfb4cgljkmcwpc0.isChildOfBody(dom, toElm)) {
      return;
    }
    if ($_eyfb4cgljkmcwpc0.isListNode(toElm.lastChild)) {
      listNode = toElm.lastChild;
    }
    if (ul === toElm.lastChild) {
      if ($_eyfb4cgljkmcwpc0.isBr(ul.previousSibling)) {
        dom.remove(ul.previousSibling);
      }
    }
    node = toElm.lastChild;
    if (node && $_eyfb4cgljkmcwpc0.isBr(node) && fromElm.hasChildNodes()) {
      dom.remove(node);
    }
    if ($_eyfb4cgljkmcwpc0.isEmpty(dom, toElm, true)) {
      dom.$(toElm).empty();
    }
    moveChildren(dom, fromElm, toElm);
    if (listNode) {
      toElm.appendChild(listNode);
    }
    dom.remove(fromElm);
    if ($_eyfb4cgljkmcwpc0.isEmpty(dom, ul) && ul !== dom.getRoot()) {
      dom.remove(ul);
    }
  };
  var mergeIntoEmptyLi = function (editor, fromLi, toLi) {
    editor.dom.$(toLi).empty();
    mergeLiElements(editor.dom, fromLi, toLi);
    editor.selection.setCursorLocation(toLi);
  };
  var mergeForward = function (editor, rng, fromLi, toLi) {
    var dom = editor.dom;
    if (dom.isEmpty(toLi)) {
      mergeIntoEmptyLi(editor, fromLi, toLi);
    } else {
      var bookmark = $_aredwjgjjkmcwpbt.createBookmark(rng);
      mergeLiElements(dom, fromLi, toLi);
      editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
    }
  };
  var mergeBackward = function (editor, rng, fromLi, toLi) {
    var bookmark = $_aredwjgjjkmcwpbt.createBookmark(rng);
    mergeLiElements(editor.dom, fromLi, toLi);
    var resolvedBookmark = $_aredwjgjjkmcwpbt.resolveBookmark(bookmark);
    editor.selection.setRng(resolvedBookmark);
  };
  var backspaceDeleteFromListToListCaret = function (editor, isForward) {
    var dom = editor.dom, selection = editor.selection;
    var selectionStartElm = selection.getStart();
    var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, selectionStartElm);
    var li = dom.getParent(selection.getStart(), 'LI', root);
    var ul, rng, otherLi;
    if (li) {
      ul = li.parentNode;
      if (ul === editor.getBody() && $_eyfb4cgljkmcwpc0.isEmpty(dom, ul)) {
        return true;
      }
      rng = $_8n62cfgkjkmcwpbw.normalizeRange(selection.getRng(true));
      otherLi = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
      if (otherLi && otherLi !== li) {
        if (isForward) {
          mergeForward(editor, rng, otherLi, li);
        } else {
          mergeBackward(editor, rng, li, otherLi);
        }
        return true;
      } else if (!otherLi) {
        if (!isForward && $_8bvl87gejkmcwpbi.removeList(editor)) {
          return true;
        }
      }
    }
    return false;
  };
  var removeBlock = function (dom, block, root) {
    var parentBlock = dom.getParent(block.parentNode, dom.isBlock, root);
    dom.remove(block);
    if (parentBlock && dom.isEmpty(parentBlock)) {
      dom.remove(parentBlock);
    }
  };
  var backspaceDeleteIntoListCaret = function (editor, isForward) {
    var dom = editor.dom;
    var selectionStartElm = editor.selection.getStart();
    var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, selectionStartElm);
    var block = dom.getParent(selectionStartElm, dom.isBlock, root);
    if (block && dom.isEmpty(block)) {
      var rng = $_8n62cfgkjkmcwpbw.normalizeRange(editor.selection.getRng(true));
      var otherLi_1 = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
      if (otherLi_1) {
        editor.undoManager.transact(function () {
          removeBlock(dom, block, root);
          $_8bvl87gejkmcwpbi.mergeWithAdjacentLists(dom, otherLi_1.parentNode);
          editor.selection.select(otherLi_1, true);
          editor.selection.collapse(isForward);
        });
        return true;
      }
    }
    return false;
  };
  var backspaceDeleteCaret = function (editor, isForward) {
    return backspaceDeleteFromListToListCaret(editor, isForward) || backspaceDeleteIntoListCaret(editor, isForward);
  };
  var backspaceDeleteRange = function (editor) {
    var selectionStartElm = editor.selection.getStart();
    var root = $_g5359xgnjkmcwpc5.getClosestListRootElm(editor, selectionStartElm);
    var startListParent = editor.dom.getParent(selectionStartElm, 'LI,DT,DD', root);
    if (startListParent || $_g5359xgnjkmcwpc5.getSelectedListItems(editor).length > 0) {
      editor.undoManager.transact(function () {
        editor.execCommand('Delete');
        $_f0sxyjgmjkmcwpc3.normalizeLists(editor.dom, editor.getBody());
      });
      return true;
    }
    return false;
  };
  var backspaceDelete = function (editor, isForward) {
    return editor.selection.isCollapsed() ? backspaceDeleteCaret(editor, isForward) : backspaceDeleteRange(editor);
  };
  var setup = function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode === global$3.BACKSPACE) {
        if (backspaceDelete(editor, false)) {
          e.preventDefault();
        }
      } else if (e.keyCode === global$3.DELETE) {
        if (backspaceDelete(editor, true)) {
          e.preventDefault();
        }
      }
    });
  };
  var $_17li1sgajkmcwpb9 = {
    setup: setup,
    backspaceDelete: backspaceDelete
  };
  var get = function (editor) {
    return {
      backspaceDelete: function (isForward) {
        $_17li1sgajkmcwpb9.backspaceDelete(editor, isForward);
      }
    };
  };
  var $_4wrbe2g9jkmcwpb7 = { get: get };
  var DOM$5 = global$6.DOM;
  var mergeLists = function (from, to) {
    var node;
    if ($_eyfb4cgljkmcwpc0.isListNode(from)) {
      while (node = from.firstChild) {
        to.appendChild(node);
      }
      DOM$5.remove(from);
    }
  };
  var indent = function (li) {
    var sibling, newList, listStyle;
    if (li.nodeName === 'DT') {
      DOM$5.rename(li, 'DD');
      return true;
    }
    sibling = li.previousSibling;
    if (sibling && $_eyfb4cgljkmcwpc0.isListNode(sibling)) {
      sibling.appendChild(li);
      return true;
    }
    if (sibling && sibling.nodeName === 'LI' && $_eyfb4cgljkmcwpc0.isListNode(sibling.lastChild)) {
      sibling.lastChild.appendChild(li);
      mergeLists(li.lastChild, sibling.lastChild);
      return true;
    }
    sibling = li.nextSibling;
    if (sibling && $_eyfb4cgljkmcwpc0.isListNode(sibling)) {
      sibling.insertBefore(li, sibling.firstChild);
      return true;
    }
    sibling = li.previousSibling;
    if (sibling && sibling.nodeName === 'LI') {
      newList = DOM$5.create(li.parentNode.nodeName);
      listStyle = DOM$5.getStyle(li.parentNode, 'listStyleType');
      if (listStyle) {
        DOM$5.setStyle(newList, 'listStyleType', listStyle);
      }
      sibling.appendChild(newList);
      newList.appendChild(li);
      mergeLists(li.lastChild, newList);
      return true;
    }
    return false;
  };
  var indentSelection = function (editor) {
    var listElements = $_g5359xgnjkmcwpc5.getSelectedListItems(editor);
    if (listElements.length) {
      var bookmark = $_aredwjgjjkmcwpbt.createBookmark(editor.selection.getRng(true));
      for (var i = 0; i < listElements.length; i++) {
        if (!indent(listElements[i]) && i === 0) {
          break;
        }
      }
      editor.selection.setRng($_aredwjgjjkmcwpbt.resolveBookmark(bookmark));
      editor.nodeChanged();
      return true;
    }
  };
  var $_fhzwh2gtjkmcwpco = { indentSelection: indentSelection };
  var queryListCommandState = function (editor, listName) {
    return function () {
      var parentList = editor.dom.getParent(editor.selection.getStart(), 'UL,OL,DL');
      return parentList && parentList.nodeName === listName;
    };
  };
  var register = function (editor) {
    editor.on('BeforeExecCommand', function (e) {
      var cmd = e.command.toLowerCase();
      var isHandled;
      if (cmd === 'indent') {
        if ($_fhzwh2gtjkmcwpco.indentSelection(editor)) {
          isHandled = true;
        }
      } else if (cmd === 'outdent') {
        if ($_80fi2gghjkmcwpbq.outdentSelection(editor)) {
          isHandled = true;
        }
      }
      if (isHandled) {
        editor.fire('ExecCommand', { command: e.command });
        e.preventDefault();
        return true;
      }
    });
    editor.addCommand('InsertUnorderedList', function (ui, detail) {
      $_8bvl87gejkmcwpbi.toggleList(editor, 'UL', detail);
    });
    editor.addCommand('InsertOrderedList', function (ui, detail) {
      $_8bvl87gejkmcwpbi.toggleList(editor, 'OL', detail);
    });
    editor.addCommand('InsertDefinitionList', function (ui, detail) {
      $_8bvl87gejkmcwpbi.toggleList(editor, 'DL', detail);
    });
    editor.addQueryStateHandler('InsertUnorderedList', queryListCommandState(editor, 'UL'));
    editor.addQueryStateHandler('InsertOrderedList', queryListCommandState(editor, 'OL'));
    editor.addQueryStateHandler('InsertDefinitionList', queryListCommandState(editor, 'DL'));
  };
  var $_7snno4gsjkmcwpcf = { register: register };
  var shouldIndentOnTab = function (editor) {
    return editor.getParam('lists_indent_on_tab', true);
  };
  var $_7hi6itgvjkmcwpcr = { shouldIndentOnTab: shouldIndentOnTab };
  var setupTabKey = function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode !== global$3.TAB || global$3.metaKeyPressed(e)) {
        return;
      }
      if (editor.dom.getParent(editor.selection.getStart(), 'LI,DT,DD')) {
        e.preventDefault();
        if (e.shiftKey) {
          $_80fi2gghjkmcwpbq.outdentSelection(editor);
        } else {
          $_fhzwh2gtjkmcwpco.indentSelection(editor);
        }
      }
    });
  };
  var setup$1 = function (editor) {
    if ($_7hi6itgvjkmcwpcr.shouldIndentOnTab(editor)) {
      setupTabKey(editor);
    }
    $_17li1sgajkmcwpb9.setup(editor);
  };
  var $_fv3b7wgujkmcwpcq = { setup: setup$1 };
  var findIndex = function (list, predicate) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if (predicate(element)) {
        return index;
      }
    }
    return -1;
  };
  var listState = function (editor, listName) {
    return function (e) {
      var ctrl = e.control;
      editor.on('NodeChange', function (e) {
        var tableCellIndex = findIndex(e.parents, $_eyfb4cgljkmcwpc0.isTableCellNode);
        var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
        var lists = global$5.grep(parents, $_eyfb4cgljkmcwpc0.isListNode);
        ctrl.active(lists.length > 0 && lists[0].nodeName === listName);
      });
    };
  };
  var indentPostRender = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('nodechange', function () {
        var listItemBlocks = $_g5359xgnjkmcwpc5.getSelectedListItems(editor);
        var disable = listItemBlocks.length > 0 && $_eyfb4cgljkmcwpc0.isFirstChild(listItemBlocks[0]);
        ctrl.disabled(disable);
      });
    };
  };
  var register$1 = function (editor) {
    var hasPlugin = function (editor, plugin) {
      var plugins = editor.settings.plugins ? editor.settings.plugins : '';
      return global$5.inArray(plugins.split(/[ ,]/), plugin) !== -1;
    };
    if (!hasPlugin(editor, 'advlist')) {
      editor.addButton('numlist', {
        active: false,
        title: 'Numbered list',
        cmd: 'InsertOrderedList',
        onPostRender: listState(editor, 'OL')
      });
      editor.addButton('bullist', {
        active: false,
        title: 'Bullet list',
        cmd: 'InsertUnorderedList',
        onPostRender: listState(editor, 'UL')
      });
    }
    editor.addButton('indent', {
      icon: 'indent',
      title: 'Increase indent',
      cmd: 'Indent',
      onPostRender: indentPostRender(editor)
    });
  };
  var $_e09q6ogwjkmcwpct = { register: register$1 };
  global.add('lists', function (editor) {
    $_fv3b7wgujkmcwpcq.setup(editor);
    $_e09q6ogwjkmcwpct.register(editor);
    $_7snno4gsjkmcwpcf.register(editor);
    return $_4wrbe2g9jkmcwpb7.get(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var nonbreaking = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var stringRepeat = function (string, repeats) {
    var str = '';
    for (var index = 0; index < repeats; index++) {
      str += string;
    }
    return str;
  };
  var isVisualCharsEnabled = function (editor) {
    return editor.plugins.visualchars ? editor.plugins.visualchars.isEnabled() : false;
  };
  var insertNbsp = function (editor, times) {
    var nbsp = isVisualCharsEnabled(editor) ? '<span class="mce-nbsp">&nbsp;</span>' : '&nbsp;';
    editor.insertContent(stringRepeat(nbsp, times));
    editor.dom.setAttrib(editor.dom.select('span.mce-nbsp'), 'data-mce-bogus', '1');
  };
  var $_7trhbvhtjkmcwpiv = { insertNbsp: insertNbsp };
  var register = function (editor) {
    editor.addCommand('mceNonBreaking', function () {
      $_7trhbvhtjkmcwpiv.insertNbsp(editor, 1);
    });
  };
  var $_5ig86ghsjkmcwpiu = { register: register };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var getKeyboardSpaces = function (editor) {
    var spaces = editor.getParam('nonbreaking_force_tab', 0);
    if (typeof spaces === 'boolean') {
      return spaces === true ? 3 : 0;
    } else {
      return spaces;
    }
  };
  var $_3yn1oxhwjkmcwpix = { getKeyboardSpaces: getKeyboardSpaces };
  var setup = function (editor) {
    var spaces = $_3yn1oxhwjkmcwpix.getKeyboardSpaces(editor);
    if (spaces > 0) {
      editor.on('keydown', function (e) {
        if (e.keyCode === global$1.TAB && !e.isDefaultPrevented()) {
          if (e.shiftKey) {
            return;
          }
          e.preventDefault();
          e.stopImmediatePropagation();
          $_7trhbvhtjkmcwpiv.insertNbsp(editor, spaces);
        }
      });
    }
  };
  var $_evh9pjhujkmcwpiw = { setup: setup };
  var register$1 = function (editor) {
    editor.addButton('nonbreaking', {
      title: 'Nonbreaking space',
      cmd: 'mceNonBreaking'
    });
    editor.addMenuItem('nonbreaking', {
      icon: 'nonbreaking',
      text: 'Nonbreaking space',
      cmd: 'mceNonBreaking',
      context: 'insert'
    });
  };
  var $_4xbhqnhxjkmcwpiz = { register: register$1 };
  global.add('nonbreaking', function (editor) {
    $_5ig86ghsjkmcwpiu.register(editor);
    $_4xbhqnhxjkmcwpiz.register(editor);
    $_evh9pjhujkmcwpiw.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var pagebreak = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var getSeparatorHtml = function (editor) {
    return editor.getParam('pagebreak_separator', '<!-- pagebreak -->');
  };
  var shouldSplitBlock = function (editor) {
    return editor.getParam('pagebreak_split_block', false);
  };
  var $_2s05hqi8jkmcwpjr = {
    getSeparatorHtml: getSeparatorHtml,
    shouldSplitBlock: shouldSplitBlock
  };
  var getPageBreakClass = function () {
    return 'mce-pagebreak';
  };
  var getPlaceholderHtml = function () {
    return '<img src="' + global$1.transparentSrc + '" class="' + getPageBreakClass() + '" data-mce-resize="false" data-mce-placeholder />';
  };
  var setup = function (editor) {
    var separatorHtml = $_2s05hqi8jkmcwpjr.getSeparatorHtml(editor);
    var pageBreakSeparatorRegExp = new RegExp(separatorHtml.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g, function (a) {
      return '\\' + a;
    }), 'gi');
    editor.on('BeforeSetContent', function (e) {
      e.content = e.content.replace(pageBreakSeparatorRegExp, getPlaceholderHtml());
    });
    editor.on('PreInit', function () {
      editor.serializer.addNodeFilter('img', function (nodes) {
        var i = nodes.length, node, className;
        while (i--) {
          node = nodes[i];
          className = node.attr('class');
          if (className && className.indexOf('mce-pagebreak') !== -1) {
            var parentNode = node.parent;
            if (editor.schema.getBlockElements()[parentNode.name] && $_2s05hqi8jkmcwpjr.shouldSplitBlock(editor)) {
              parentNode.type = 3;
              parentNode.value = separatorHtml;
              parentNode.raw = true;
              node.remove();
              continue;
            }
            node.type = 3;
            node.value = separatorHtml;
            node.raw = true;
          }
        }
      });
    });
  };
  var $_2m63szi6jkmcwpjp = {
    setup: setup,
    getPlaceholderHtml: getPlaceholderHtml,
    getPageBreakClass: getPageBreakClass
  };
  var register = function (editor) {
    editor.addCommand('mcePageBreak', function () {
      if (editor.settings.pagebreak_split_block) {
        editor.insertContent('<p>' + $_2m63szi6jkmcwpjp.getPlaceholderHtml() + '</p>');
      } else {
        editor.insertContent($_2m63szi6jkmcwpjp.getPlaceholderHtml());
      }
    });
  };
  var $_etjj54i5jkmcwpjn = { register: register };
  var setup$1 = function (editor) {
    editor.on('ResolveName', function (e) {
      if (e.target.nodeName === 'IMG' && editor.dom.hasClass(e.target, $_2m63szi6jkmcwpjp.getPageBreakClass())) {
        e.name = 'pagebreak';
      }
    });
  };
  var $_nmecti9jkmcwpjs = { setup: setup$1 };
  var register$1 = function (editor) {
    editor.addButton('pagebreak', {
      title: 'Page break',
      cmd: 'mcePageBreak'
    });
    editor.addMenuItem('pagebreak', {
      text: 'Page break',
      icon: 'pagebreak',
      cmd: 'mcePageBreak',
      context: 'insert'
    });
  };
  var $_f2tm10iajkmcwpjt = { register: register$1 };
  global.add('pagebreak', function (editor) {
    $_etjj54i5jkmcwpjn.register(editor);
    $_f2tm10iajkmcwpjt.register(editor);
    $_2m63szi6jkmcwpjp.setup(editor);
    $_nmecti9jkmcwpjs.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var preview = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.Env');
  var getPreviewDialogWidth = function (editor) {
    return parseInt(editor.getParam('plugin_preview_width', '650'), 10);
  };
  var getPreviewDialogHeight = function (editor) {
    return parseInt(editor.getParam('plugin_preview_height', '500'), 10);
  };
  var getContentStyle = function (editor) {
    return editor.getParam('content_style', '');
  };
  var $_6hy26xjfjkmcwppy = {
    getPreviewDialogWidth: getPreviewDialogWidth,
    getPreviewDialogHeight: getPreviewDialogHeight,
    getContentStyle: getContentStyle
  };
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getPreviewHtml = function (editor) {
    var previewHtml;
    var headHtml = '';
    var encode = editor.dom.encode;
    var contentStyle = $_6hy26xjfjkmcwppy.getContentStyle(editor);
    headHtml += '<base href="' + encode(editor.documentBaseURI.getURI()) + '">';
    if (contentStyle) {
      headHtml += '<style type="text/css">' + contentStyle + '</style>';
    }
    global$2.each(editor.contentCSS, function (url) {
      headHtml += '<link type="text/css" rel="stylesheet" href="' + encode(editor.documentBaseURI.toAbsolute(url)) + '">';
    });
    var bodyId = editor.settings.body_id || 'tinymce';
    if (bodyId.indexOf('=') !== -1) {
      bodyId = editor.getParam('body_id', '', 'hash');
      bodyId = bodyId[editor.id] || bodyId;
    }
    var bodyClass = editor.settings.body_class || '';
    if (bodyClass.indexOf('=') !== -1) {
      bodyClass = editor.getParam('body_class', '', 'hash');
      bodyClass = bodyClass[editor.id] || '';
    }
    var preventClicksOnLinksScript = '<script>' + 'document.addEventListener && document.addEventListener("click", function(e) {' + 'for (var elm = e.target; elm; elm = elm.parentNode) {' + 'if (elm.nodeName === "A") {' + 'e.preventDefault();' + '}' + '}' + '}, false);' + '</script> ';
    var dirAttr = editor.settings.directionality ? ' dir="' + editor.settings.directionality + '"' : '';
    previewHtml = '<!DOCTYPE html>' + '<html>' + '<head>' + headHtml + '</head>' + '<body id="' + encode(bodyId) + '" class="mce-content-body ' + encode(bodyClass) + '"' + encode(dirAttr) + '>' + editor.getContent() + preventClicksOnLinksScript + '</body>' + '</html>';
    return previewHtml;
  };
  var injectIframeContent = function (editor, iframe, sandbox) {
    var previewHtml = getPreviewHtml(editor);
    if (!sandbox) {
      var doc = iframe.contentWindow.document;
      doc.open();
      doc.write(previewHtml);
      doc.close();
    } else {
      iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewHtml);
    }
  };
  var $_5s7etcjgjkmcwppz = {
    getPreviewHtml: getPreviewHtml,
    injectIframeContent: injectIframeContent
  };
  var open = function (editor) {
    var sandbox = !global$1.ie;
    var dialogHtml = '<iframe src="" frameborder="0"' + (sandbox ? ' sandbox="allow-scripts"' : '') + '></iframe>';
    var dialogWidth = $_6hy26xjfjkmcwppy.getPreviewDialogWidth(editor);
    var dialogHeight = $_6hy26xjfjkmcwppy.getPreviewDialogHeight(editor);
    editor.windowManager.open({
      title: 'Preview',
      width: dialogWidth,
      height: dialogHeight,
      html: dialogHtml,
      buttons: {
        text: 'Close',
        onclick: function (e) {
          e.control.parent().parent().close();
        }
      },
      onPostRender: function (e) {
        var iframeElm = e.control.getEl('body').firstChild;
        $_5s7etcjgjkmcwppz.injectIframeContent(editor, iframeElm, sandbox);
      }
    });
  };
  var $_4mmnpbjdjkmcwppw = { open: open };
  var register = function (editor) {
    editor.addCommand('mcePreview', function () {
      $_4mmnpbjdjkmcwppw.open(editor);
    });
  };
  var $_c197icjcjkmcwppv = { register: register };
  var register$1 = function (editor) {
    editor.addButton('preview', {
      title: 'Preview',
      cmd: 'mcePreview'
    });
    editor.addMenuItem('preview', {
      text: 'Preview',
      cmd: 'mcePreview',
      context: 'view'
    });
  };
  var $_eluyd4jijkmcwpq6 = { register: register$1 };
  global.add('preview', function (editor) {
    $_c197icjcjkmcwppv.register(editor);
    $_eluyd4jijkmcwpq6.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var save = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var enableWhenDirty = function (editor) {
    return editor.getParam('save_enablewhendirty', true);
  };
  var hasOnSaveCallback = function (editor) {
    return !!editor.getParam('save_onsavecallback');
  };
  var hasOnCancelCallback = function (editor) {
    return !!editor.getParam('save_oncancelcallback');
  };
  var $_45silwjtjkmcwpqv = {
    enableWhenDirty: enableWhenDirty,
    hasOnSaveCallback: hasOnSaveCallback,
    hasOnCancelCallback: hasOnCancelCallback
  };
  var displayErrorMessage = function (editor, message) {
    editor.notificationManager.open({
      text: editor.translate(message),
      type: 'error'
    });
  };
  var save = function (editor) {
    var formObj;
    formObj = global$1.DOM.getParent(editor.id, 'form');
    if ($_45silwjtjkmcwpqv.enableWhenDirty(editor) && !editor.isDirty()) {
      return;
    }
    editor.save();
    if ($_45silwjtjkmcwpqv.hasOnSaveCallback(editor)) {
      editor.execCallback('save_onsavecallback', editor);
      editor.nodeChanged();
      return;
    }
    if (formObj) {
      editor.setDirty(false);
      if (!formObj.onsubmit || formObj.onsubmit()) {
        if (typeof formObj.submit === 'function') {
          formObj.submit();
        } else {
          displayErrorMessage(editor, 'Error: Form submit field collision.');
        }
      }
      editor.nodeChanged();
    } else {
      displayErrorMessage(editor, 'Error: No form element found.');
    }
  };
  var cancel = function (editor) {
    var h = global$2.trim(editor.startContent);
    if ($_45silwjtjkmcwpqv.hasOnCancelCallback(editor)) {
      editor.execCallback('save_oncancelcallback', editor);
      return;
    }
    editor.setContent(h);
    editor.undoManager.clear();
    editor.nodeChanged();
  };
  var $_2e4vhvjqjkmcwpqs = {
    save: save,
    cancel: cancel
  };
  var register = function (editor) {
    editor.addCommand('mceSave', function () {
      $_2e4vhvjqjkmcwpqs.save(editor);
    });
    editor.addCommand('mceCancel', function () {
      $_2e4vhvjqjkmcwpqs.cancel(editor);
    });
  };
  var $_29807ijpjkmcwpqr = { register: register };
  var stateToggle = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('nodeChange dirty', function () {
        ctrl.disabled($_45silwjtjkmcwpqv.enableWhenDirty(editor) && !editor.isDirty());
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('save', {
      icon: 'save',
      text: 'Save',
      cmd: 'mceSave',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addButton('cancel', {
      text: 'Cancel',
      icon: false,
      cmd: 'mceCancel',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addShortcut('Meta+S', '', 'mceSave');
  };
  var $_amuz3ojujkmcwpqw = { register: register$1 };
  global.add('save', function (editor) {
    $_amuz3ojujkmcwpqw.register(editor);
    $_29807ijpjkmcwpqr.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var spellchecker = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var hasProPlugin = function (editor) {
    if (/(^|[ ,])tinymcespellchecker([, ]|$)/.test(editor.settings.plugins) && global.get('tinymcespellchecker')) {
      if (typeof window.console !== 'undefined' && window.console.log) {
        window.console.log('Spell Checker Pro is incompatible with Spell Checker plugin! ' + 'Remove \'spellchecker\' from the \'plugins\' option.');
      }
      return true;
    } else {
      return false;
    }
  };
  var $_b5sfxqk8jkmcwpsw = { hasProPlugin: hasProPlugin };
  var getLanguages = function (editor) {
    var defaultLanguages = 'English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,German=de,Italian=it,Polish=pl,Portuguese=pt_BR,Spanish=es,Swedish=sv';
    return editor.getParam('spellchecker_languages', defaultLanguages);
  };
  var getLanguage = function (editor) {
    var defaultLanguage = editor.getParam('language', 'en');
    return editor.getParam('spellchecker_language', defaultLanguage);
  };
  var getRpcUrl = function (editor) {
    return editor.getParam('spellchecker_rpc_url');
  };
  var getSpellcheckerCallback = function (editor) {
    return editor.getParam('spellchecker_callback');
  };
  var getSpellcheckerWordcharPattern = function (editor) {
    var defaultPattern = new RegExp('[^' + '\\s!"#$%&()*+,-./:;<=>?@[\\]^_{|}`' + '\xA7\xA9\xAB\xAE\xB1\xB6\xB7\xB8\xBB' + '\xBC\xBD\xBE\xBF\xD7\xF7\xA4\u201D\u201C\u201E\xA0\u2002\u2003\u2009' + ']+', 'g');
    return editor.getParam('spellchecker_wordchar_pattern', defaultPattern);
  };
  var $_g9difkkbjkmcwpti = {
    getLanguages: getLanguages,
    getLanguage: getLanguage,
    getRpcUrl: getRpcUrl,
    getSpellcheckerCallback: getSpellcheckerCallback,
    getSpellcheckerWordcharPattern: getSpellcheckerWordcharPattern
  };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.URI');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');
  var fireSpellcheckStart = function (editor) {
    return editor.fire('SpellcheckStart');
  };
  var fireSpellcheckEnd = function (editor) {
    return editor.fire('SpellcheckEnd');
  };
  var $_po62fkgjkmcwptt = {
    fireSpellcheckStart: fireSpellcheckStart,
    fireSpellcheckEnd: fireSpellcheckEnd
  };
  function isContentEditableFalse(node) {
    return node && node.nodeType === 1 && node.contentEditable === 'false';
  }
  var DomTextMatcher = function (node, editor) {
    var m, matches = [], text;
    var dom = editor.dom;
    var blockElementsMap, hiddenTextElementsMap, shortEndedElementsMap;
    blockElementsMap = editor.schema.getBlockElements();
    hiddenTextElementsMap = editor.schema.getWhiteSpaceElements();
    shortEndedElementsMap = editor.schema.getShortEndedElements();
    function createMatch(m, data) {
      if (!m[0]) {
        throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
      }
      return {
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        data: data
      };
    }
    function getText(node) {
      var txt;
      if (node.nodeType === 3) {
        return node.data;
      }
      if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
        return '';
      }
      if (isContentEditableFalse(node)) {
        return '\n';
      }
      txt = '';
      if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
        txt += '\n';
      }
      if (node = node.firstChild) {
        do {
          txt += getText(node);
        } while (node = node.nextSibling);
      }
      return txt;
    }
    function stepThroughMatches(node, matches, replaceFn) {
      var startNode, endNode, startNodeIndex, endNodeIndex, innerNodes = [], atIndex = 0, curNode = node, matchLocation, matchIndex = 0;
      matches = matches.slice(0);
      matches.sort(function (a, b) {
        return a.start - b.start;
      });
      matchLocation = matches.shift();
      out:
        while (true) {
          if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName] || isContentEditableFalse(curNode)) {
            atIndex++;
          }
          if (curNode.nodeType === 3) {
            if (!endNode && curNode.length + atIndex >= matchLocation.end) {
              endNode = curNode;
              endNodeIndex = matchLocation.end - atIndex;
            } else if (startNode) {
              innerNodes.push(curNode);
            }
            if (!startNode && curNode.length + atIndex > matchLocation.start) {
              startNode = curNode;
              startNodeIndex = matchLocation.start - atIndex;
            }
            atIndex += curNode.length;
          }
          if (startNode && endNode) {
            curNode = replaceFn({
              startNode: startNode,
              startNodeIndex: startNodeIndex,
              endNode: endNode,
              endNodeIndex: endNodeIndex,
              innerNodes: innerNodes,
              match: matchLocation.text,
              matchIndex: matchIndex
            });
            atIndex -= endNode.length - endNodeIndex;
            startNode = null;
            endNode = null;
            innerNodes = [];
            matchLocation = matches.shift();
            matchIndex++;
            if (!matchLocation) {
              break;
            }
          } else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
            if (!isContentEditableFalse(curNode)) {
              curNode = curNode.firstChild;
              continue;
            }
          } else if (curNode.nextSibling) {
            curNode = curNode.nextSibling;
            continue;
          }
          while (true) {
            if (curNode.nextSibling) {
              curNode = curNode.nextSibling;
              break;
            } else if (curNode.parentNode !== node) {
              curNode = curNode.parentNode;
            } else {
              break out;
            }
          }
        }
    }
    function genReplacer(callback) {
      function makeReplacementNode(fill, matchIndex) {
        var match = matches[matchIndex];
        if (!match.stencil) {
          match.stencil = callback(match);
        }
        var clone = match.stencil.cloneNode(false);
        clone.setAttribute('data-mce-index', matchIndex);
        if (fill) {
          clone.appendChild(dom.doc.createTextNode(fill));
        }
        return clone;
      }
      return function (range) {
        var before;
        var after;
        var parentNode;
        var startNode = range.startNode;
        var endNode = range.endNode;
        var matchIndex = range.matchIndex;
        var doc = dom.doc;
        if (startNode === endNode) {
          var node_1 = startNode;
          parentNode = node_1.parentNode;
          if (range.startNodeIndex > 0) {
            before = doc.createTextNode(node_1.data.substring(0, range.startNodeIndex));
            parentNode.insertBefore(before, node_1);
          }
          var el = makeReplacementNode(range.match, matchIndex);
          parentNode.insertBefore(el, node_1);
          if (range.endNodeIndex < node_1.length) {
            after = doc.createTextNode(node_1.data.substring(range.endNodeIndex));
            parentNode.insertBefore(after, node_1);
          }
          node_1.parentNode.removeChild(node_1);
          return el;
        }
        before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
        after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
        var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
        var innerEls = [];
        for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
          var innerNode = range.innerNodes[i];
          var innerEl = makeReplacementNode(innerNode.data, matchIndex);
          innerNode.parentNode.replaceChild(innerEl, innerNode);
          innerEls.push(innerEl);
        }
        var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
        parentNode = startNode.parentNode;
        parentNode.insertBefore(before, startNode);
        parentNode.insertBefore(elA, startNode);
        parentNode.removeChild(startNode);
        parentNode = endNode.parentNode;
        parentNode.insertBefore(elB, endNode);
        parentNode.insertBefore(after, endNode);
        parentNode.removeChild(endNode);
        return elB;
      };
    }
    function unwrapElement(element) {
      var parentNode = element.parentNode;
      parentNode.insertBefore(element.firstChild, element);
      element.parentNode.removeChild(element);
    }
    function hasClass(elm) {
      return elm.className.indexOf('mce-spellchecker-word') !== -1;
    }
    function getWrappersByIndex(index) {
      var elements = node.getElementsByTagName('*'), wrappers = [];
      index = typeof index === 'number' ? '' + index : null;
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i], dataIndex = element.getAttribute('data-mce-index');
        if (dataIndex !== null && dataIndex.length && hasClass(element)) {
          if (dataIndex === index || index === null) {
            wrappers.push(element);
          }
        }
      }
      return wrappers;
    }
    function indexOf(match) {
      var i = matches.length;
      while (i--) {
        if (matches[i] === match) {
          return i;
        }
      }
      return -1;
    }
    function filter(callback) {
      var filteredMatches = [];
      each(function (match, i) {
        if (callback(match, i)) {
          filteredMatches.push(match);
        }
      });
      matches = filteredMatches;
      return this;
    }
    function each(callback) {
      for (var i = 0, l = matches.length; i < l; i++) {
        if (callback(matches[i], i) === false) {
          break;
        }
      }
      return this;
    }
    function wrap(callback) {
      if (matches.length) {
        stepThroughMatches(node, matches, genReplacer(callback));
      }
      return this;
    }
    function find(regex, data) {
      if (text && regex.global) {
        while (m = regex.exec(text)) {
          matches.push(createMatch(m, data));
        }
      }
      return this;
    }
    function unwrap(match) {
      var i;
      var elements = getWrappersByIndex(match ? indexOf(match) : null);
      i = elements.length;
      while (i--) {
        unwrapElement(elements[i]);
      }
      return this;
    }
    function matchFromElement(element) {
      return matches[element.getAttribute('data-mce-index')];
    }
    function elementFromMatch(match) {
      return getWrappersByIndex(indexOf(match))[0];
    }
    function add(start, length, data) {
      matches.push({
        start: start,
        end: start + length,
        text: text.substr(start, length),
        data: data
      });
      return this;
    }
    function rangeFromMatch(match) {
      var wrappers = getWrappersByIndex(indexOf(match));
      var rng = editor.dom.createRng();
      rng.setStartBefore(wrappers[0]);
      rng.setEndAfter(wrappers[wrappers.length - 1]);
      return rng;
    }
    function replace(match, text) {
      var rng = rangeFromMatch(match);
      rng.deleteContents();
      if (text.length > 0) {
        rng.insertNode(editor.dom.doc.createTextNode(text));
      }
      return rng;
    }
    function reset() {
      matches.splice(0, matches.length);
      unwrap();
      return this;
    }
    text = getText(node);
    return {
      text: text,
      matches: matches,
      each: each,
      filter: filter,
      reset: reset,
      matchFromElement: matchFromElement,
      elementFromMatch: elementFromMatch,
      find: find,
      add: add,
      wrap: wrap,
      unwrap: unwrap,
      replace: replace,
      rangeFromMatch: rangeFromMatch,
      indexOf: indexOf
    };
  };
  var getTextMatcher = function (editor, textMatcherState) {
    if (!textMatcherState.get()) {
      var textMatcher = DomTextMatcher(editor.getBody(), editor);
      textMatcherState.set(textMatcher);
    }
    return textMatcherState.get();
  };
  var isEmpty = function (obj) {
    for (var _ in obj) {
      return false;
    }
    return true;
  };
  var defaultSpellcheckCallback = function (editor, pluginUrl, currentLanguageState) {
    return function (method, text, doneCallback, errorCallback) {
      var data = {
        method: method,
        lang: currentLanguageState.get()
      };
      var postData = '';
      data[method === 'addToDictionary' ? 'word' : 'text'] = text;
      global$1.each(data, function (value, key) {
        if (postData) {
          postData += '&';
        }
        postData += key + '=' + encodeURIComponent(value);
      });
      global$3.send({
        url: new global$2(pluginUrl).toAbsolute($_g9difkkbjkmcwpti.getRpcUrl(editor)),
        type: 'post',
        content_type: 'application/x-www-form-urlencoded',
        data: postData,
        success: function (result) {
          result = JSON.parse(result);
          if (!result) {
            var message = editor.translate('Server response wasn\'t proper JSON.');
            errorCallback(message);
          } else if (result.error) {
            errorCallback(result.error);
          } else {
            doneCallback(result);
          }
        },
        error: function () {
          var message = editor.translate('The spelling service was not found: (') + $_g9difkkbjkmcwpti.getRpcUrl(editor) + editor.translate(')');
          errorCallback(message);
        }
      });
    };
  };
  var sendRpcCall = function (editor, pluginUrl, currentLanguageState, name, data, successCallback, errorCallback) {
    var userSpellcheckCallback = $_g9difkkbjkmcwpti.getSpellcheckerCallback(editor);
    var spellCheckCallback = userSpellcheckCallback ? userSpellcheckCallback : defaultSpellcheckCallback(editor, pluginUrl, currentLanguageState);
    spellCheckCallback.call(editor.plugins.spellchecker, name, data, successCallback, errorCallback);
  };
  var spellcheck = function (editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState) {
    if (finish(editor, startedState, textMatcherState)) {
      return;
    }
    var errorCallback = function (message) {
      editor.notificationManager.open({
        text: message,
        type: 'error'
      });
      editor.setProgressState(false);
      finish(editor, startedState, textMatcherState);
    };
    var successCallback = function (data) {
      markErrors(editor, startedState, textMatcherState, lastSuggestionsState, data);
    };
    editor.setProgressState(true);
    sendRpcCall(editor, pluginUrl, currentLanguageState, 'spellcheck', getTextMatcher(editor, textMatcherState).text, successCallback, errorCallback);
    editor.focus();
  };
  var checkIfFinished = function (editor, startedState, textMatcherState) {
    if (!editor.dom.select('span.mce-spellchecker-word').length) {
      finish(editor, startedState, textMatcherState);
    }
  };
  var addToDictionary = function (editor, pluginUrl, startedState, textMatcherState, currentLanguageState, word, spans) {
    editor.setProgressState(true);
    sendRpcCall(editor, pluginUrl, currentLanguageState, 'addToDictionary', word, function () {
      editor.setProgressState(false);
      editor.dom.remove(spans, true);
      checkIfFinished(editor, startedState, textMatcherState);
    }, function (message) {
      editor.notificationManager.open({
        text: message,
        type: 'error'
      });
      editor.setProgressState(false);
    });
  };
  var ignoreWord = function (editor, startedState, textMatcherState, word, spans, all) {
    editor.selection.collapse();
    if (all) {
      global$1.each(editor.dom.select('span.mce-spellchecker-word'), function (span) {
        if (span.getAttribute('data-mce-word') === word) {
          editor.dom.remove(span, true);
        }
      });
    } else {
      editor.dom.remove(spans, true);
    }
    checkIfFinished(editor, startedState, textMatcherState);
  };
  var finish = function (editor, startedState, textMatcherState) {
    getTextMatcher(editor, textMatcherState).reset();
    textMatcherState.set(null);
    if (startedState.get()) {
      startedState.set(false);
      $_po62fkgjkmcwptt.fireSpellcheckEnd(editor);
      return true;
    }
  };
  var getElmIndex = function (elm) {
    var value = elm.getAttribute('data-mce-index');
    if (typeof value === 'number') {
      return '' + value;
    }
    return value;
  };
  var findSpansByIndex = function (editor, index) {
    var nodes;
    var spans = [];
    nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
    if (nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        if (nodeIndex === null || !nodeIndex.length) {
          continue;
        }
        if (nodeIndex === index.toString()) {
          spans.push(nodes[i]);
        }
      }
    }
    return spans;
  };
  var markErrors = function (editor, startedState, textMatcherState, lastSuggestionsState, data) {
    var suggestions, hasDictionarySupport;
    if (typeof data !== 'string' && data.words) {
      hasDictionarySupport = !!data.dictionary;
      suggestions = data.words;
    } else {
      suggestions = data;
    }
    editor.setProgressState(false);
    if (isEmpty(suggestions)) {
      var message = editor.translate('No misspellings found.');
      editor.notificationManager.open({
        text: message,
        type: 'info'
      });
      startedState.set(false);
      return;
    }
    lastSuggestionsState.set({
      suggestions: suggestions,
      hasDictionarySupport: hasDictionarySupport
    });
    getTextMatcher(editor, textMatcherState).find($_g9difkkbjkmcwpti.getSpellcheckerWordcharPattern(editor)).filter(function (match) {
      return !!suggestions[match.text];
    }).wrap(function (match) {
      return editor.dom.create('span', {
        'class': 'mce-spellchecker-word',
        'data-mce-bogus': 1,
        'data-mce-word': match.text
      });
    });
    startedState.set(true);
    $_po62fkgjkmcwptt.fireSpellcheckStart(editor);
  };
  var $_d7tz2skcjkmcwptn = {
    spellcheck: spellcheck,
    checkIfFinished: checkIfFinished,
    addToDictionary: addToDictionary,
    ignoreWord: ignoreWord,
    findSpansByIndex: findSpansByIndex,
    getElmIndex: getElmIndex,
    markErrors: markErrors
  };
  var get = function (editor, startedState, lastSuggestionsState, textMatcherState, currentLanguageState, url) {
    var getLanguage = function () {
      return currentLanguageState.get();
    };
    var getWordCharPattern = function () {
      return $_g9difkkbjkmcwpti.getSpellcheckerWordcharPattern(editor);
    };
    var markErrors = function (data) {
      $_d7tz2skcjkmcwptn.markErrors(editor, startedState, textMatcherState, lastSuggestionsState, data);
    };
    var getTextMatcher = function () {
      return textMatcherState.get();
    };
    return {
      getTextMatcher: getTextMatcher,
      getWordCharPattern: getWordCharPattern,
      markErrors: markErrors,
      getLanguage: getLanguage
    };
  };
  var $_fph7t6kajkmcwpth = { get: get };
  var register = function (editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState) {
    editor.addCommand('mceSpellCheck', function () {
      $_d7tz2skcjkmcwptn.spellcheck(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
    });
  };
  var $_3jlzdtkijkmcwpu2 = { register: register };
  var buildMenuItems = function (listName, languageValues) {
    var items = [];
    global$1.each(languageValues, function (languageValue) {
      items.push({
        selectable: true,
        text: languageValue.name,
        data: languageValue.value
      });
    });
    return items;
  };
  var updateSelection = function (editor, currentLanguageState) {
    return function (e) {
      var selectedLanguage = currentLanguageState.get();
      e.control.items().each(function (ctrl) {
        ctrl.active(ctrl.settings.data === selectedLanguage);
      });
    };
  };
  var getItems = function (editor) {
    return global$1.map($_g9difkkbjkmcwpti.getLanguages(editor).split(','), function (langPair) {
      langPair = langPair.split('=');
      return {
        name: langPair[0],
        value: langPair[1]
      };
    });
  };
  var register$1 = function (editor, pluginUrl, startedState, textMatcherState, currentLanguageState, lastSuggestionsState) {
    var languageMenuItems = buildMenuItems('Language', getItems(editor));
    var startSpellchecking = function () {
      $_d7tz2skcjkmcwptn.spellcheck(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
    };
    var buttonArgs = {
      tooltip: 'Spellcheck',
      onclick: startSpellchecking,
      onPostRender: function (e) {
        var ctrl = e.control;
        editor.on('SpellcheckStart SpellcheckEnd', function () {
          ctrl.active(startedState.get());
        });
      }
    };
    if (languageMenuItems.length > 1) {
      buttonArgs.type = 'splitbutton';
      buttonArgs.menu = languageMenuItems;
      buttonArgs.onshow = updateSelection(editor, currentLanguageState);
      buttonArgs.onselect = function (e) {
        currentLanguageState.set(e.control.settings.data);
      };
    }
    editor.addButton('spellchecker', buttonArgs);
    editor.addMenuItem('spellchecker', {
      text: 'Spellcheck',
      context: 'tools',
      onclick: startSpellchecking,
      selectable: true,
      onPostRender: function () {
        var self = this;
        self.active(startedState.get());
        editor.on('SpellcheckStart SpellcheckEnd', function () {
          self.active(startedState.get());
        });
      }
    });
  };
  var $_f9nm8ykjjkmcwpu4 = { register: register$1 };
  var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$5 = tinymce.util.Tools.resolve('tinymce.ui.Factory');
  var suggestionsMenu;
  var showSuggestions = function (editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState, word, spans) {
    var items = [], suggestions = lastSuggestionsState.get().suggestions[word];
    global$1.each(suggestions, function (suggestion) {
      items.push({
        text: suggestion,
        onclick: function () {
          editor.insertContent(editor.dom.encode(suggestion));
          editor.dom.remove(spans);
          $_d7tz2skcjkmcwptn.checkIfFinished(editor, startedState, textMatcherState);
        }
      });
    });
    items.push({ text: '-' });
    var hasDictionarySupport = lastSuggestionsState.get().hasDictionarySupport;
    if (hasDictionarySupport) {
      items.push({
        text: 'Add to Dictionary',
        onclick: function () {
          $_d7tz2skcjkmcwptn.addToDictionary(editor, pluginUrl, startedState, textMatcherState, currentLanguageState, word, spans);
        }
      });
    }
    items.push.apply(items, [
      {
        text: 'Ignore',
        onclick: function () {
          $_d7tz2skcjkmcwptn.ignoreWord(editor, startedState, textMatcherState, word, spans);
        }
      },
      {
        text: 'Ignore all',
        onclick: function () {
          $_d7tz2skcjkmcwptn.ignoreWord(editor, startedState, textMatcherState, word, spans, true);
        }
      }
    ]);
    suggestionsMenu = global$5.create('menu', {
      items: items,
      context: 'contextmenu',
      onautohide: function (e) {
        if (e.target.className.indexOf('spellchecker') !== -1) {
          e.preventDefault();
        }
      },
      onhide: function () {
        suggestionsMenu.remove();
        suggestionsMenu = null;
      }
    });
    suggestionsMenu.renderTo(document.body);
    var pos = global$4.DOM.getPos(editor.getContentAreaContainer());
    var targetPos = editor.dom.getPos(spans[0]);
    var root = editor.dom.getRoot();
    if (root.nodeName === 'BODY') {
      targetPos.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
      targetPos.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop;
    } else {
      targetPos.x -= root.scrollLeft;
      targetPos.y -= root.scrollTop;
    }
    pos.x += targetPos.x;
    pos.y += targetPos.y;
    suggestionsMenu.moveTo(pos.x, pos.y + spans[0].offsetHeight);
  };
  var setup = function (editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState) {
    editor.on('click', function (e) {
      var target = e.target;
      if (target.className === 'mce-spellchecker-word') {
        e.preventDefault();
        var spans = $_d7tz2skcjkmcwptn.findSpansByIndex(editor, $_d7tz2skcjkmcwptn.getElmIndex(target));
        if (spans.length > 0) {
          var rng = editor.dom.createRng();
          rng.setStartBefore(spans[0]);
          rng.setEndAfter(spans[spans.length - 1]);
          editor.selection.setRng(rng);
          showSuggestions(editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState, target.getAttribute('data-mce-word'), spans);
        }
      }
    });
  };
  var $_ce7bfkkjkmcwpu7 = { setup: setup };
  global.add('spellchecker', function (editor, pluginUrl) {
    if ($_b5sfxqk8jkmcwpsw.hasProPlugin(editor) === false) {
      var startedState = Cell(false);
      var currentLanguageState = Cell($_g9difkkbjkmcwpti.getLanguage(editor));
      var textMatcherState = Cell(null);
      var lastSuggestionsState = Cell(null);
      $_f9nm8ykjjkmcwpu4.register(editor, pluginUrl, startedState, textMatcherState, currentLanguageState, lastSuggestionsState);
      $_ce7bfkkjkmcwpu7.setup(editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState);
      $_3jlzdtkijkmcwpu2.register(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
      return $_fph7t6kajkmcwpth.get(editor, startedState, lastSuggestionsState, textMatcherState, currentLanguageState, pluginUrl);
    }
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var table = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var noop = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      x[_i] = arguments[_i];
    }
  };
  var compose = function (fa, fb) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var never = constant(false);
  var always = constant(true);
  var never$1 = never;
  var always$1 = always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call$$1 = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop$$1 = function () {
    };
    var nul = function () {
      return null;
    };
    var undef = function () {
      return undefined;
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call$$1,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      getOrNull: nul,
      getOrUndefined: undef,
      or: id,
      orThunk: call$$1,
      map: none,
      ap: none,
      each: noop$$1,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };
  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var isString = isType('string');
  var isArray = isType('array');
  var isBoolean = isType('boolean');
  var isFunction = isType('function');
  var isNumber = isType('number');
  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(i);
      }
    }
    return Option.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var last = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
  };
  var from$1 = isFunction(Array.from) ? Array.from : function (x) {
    return slice.call(x);
  };
  var keys = Object.keys;
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var map$1 = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var Immutable = function () {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fields[_i] = arguments[_i];
    }
    return function () {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      if (fields.length !== values.length) {
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      }
      var struct = {};
      each(fields, function (name, i) {
        struct[name] = constant(values[i]);
      });
      return struct;
    };
  };
  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    each(array, function (a) {
      if (!isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var MixedBag = function (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    validateStrArr('required', required);
    validateStrArr('optional', optional);
    checkDupes(everything);
    return function (obj) {
      var keys$$1 = keys(obj);
      var allReqd = forall(required, function (req) {
        return contains(keys$$1, req);
      });
      if (!allReqd)
        reqMessage(required, keys$$1);
      var unsupported = filter(keys$$1, function (key) {
        return !contains(everything, key);
      });
      if (unsupported.length > 0)
        unsuppMessage(unsupported);
      var r = {};
      each(required, function (req) {
        r[req] = constant(obj[req]);
      });
      each(optional, function (opt) {
        r[opt] = constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  };
  var dimensions = Immutable('width', 'height');
  var grid = Immutable('rows', 'columns');
  var address = Immutable('row', 'column');
  var coords = Immutable('x', 'y');
  var detail = Immutable('element', 'rowspan', 'colspan');
  var detailnew = Immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = Immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = Immutable('element', 'cells', 'section');
  var elementnew = Immutable('element', 'isNew');
  var rowdatanew = Immutable('element', 'cells', 'section', 'isNew');
  var rowcells = Immutable('cells', 'section');
  var rowdetails = Immutable('details', 'section');
  var bounds = Immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_7jwbndlcjkmcwpzk = {
    dimensions: dimensions,
    grid: grid,
    address: address,
    coords: coords,
    extended: extended,
    detail: detail,
    detailnew: detailnew,
    rowdata: rowdata,
    elementnew: elementnew,
    rowdatanew: rowdatanew,
    rowcells: rowcells,
    rowdetails: rowdetails,
    bounds: bounds
  };
  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: constant(node) };
  };
  var fromPoint = function (docElm, x, y) {
    var doc = docElm.dom();
    return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
  };
  var Element$$1 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };
  var $_3d1bcmlijkmcwq1d = {
    ATTRIBUTE: Node.ATTRIBUTE_NODE,
    CDATA_SECTION: Node.CDATA_SECTION_NODE,
    COMMENT: Node.COMMENT_NODE,
    DOCUMENT: Node.DOCUMENT_NODE,
    DOCUMENT_TYPE: Node.DOCUMENT_TYPE_NODE,
    DOCUMENT_FRAGMENT: Node.DOCUMENT_FRAGMENT_NODE,
    ELEMENT: Node.ELEMENT_NODE,
    TEXT: Node.TEXT_NODE,
    PROCESSING_INSTRUCTION: Node.PROCESSING_INSTRUCTION_NODE,
    ENTITY_REFERENCE: Node.ENTITY_REFERENCE_NODE,
    ENTITY: Node.ENTITY_NODE,
    NOTATION: Node.NOTATION_NODE
  };
  var ELEMENT = $_3d1bcmlijkmcwq1d.ELEMENT;
  var DOCUMENT = $_3d1bcmlijkmcwq1d.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element$$1.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map(Element$$1.fromDom);
  };
  var $_dvr0jtlfjkmcwq0n = {
    all: all,
    is: is,
    one: one
  };
  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_43v24vlkjkmcwq1z = { toArray: toArray };
  var Global = typeof window !== 'undefined' ? window : Function('return this;')();
  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : Global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var unsafe = function (name, scope) {
    return resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_bznr0lnjkmcwq2b = { getOrDie: getOrDie };
  var node = function () {
    var f = $_bznr0lnjkmcwq2b.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_eppdkllmjkmcwq2a = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };
  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (!called) {
        called = true;
        r = f.apply(null, args);
      }
      return r;
    };
  };
  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$2 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu(group(1), group(2));
  };
  var detect = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown();
    return find$2(versionRegexes, cleanedAgent);
  };
  var unknown = function () {
    return nu(0, 0);
  };
  var nu = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_976zrilujkmcwq2p = {
    nu: nu,
    detect: detect,
    unknown: unknown
  };
  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$1 = function () {
    return nu$1({
      current: undefined,
      version: $_976zrilujkmcwq2p.unknown()
    });
  };
  var nu$1 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_dz7zrfltjkmcwq2m = {
    unknown: unknown$1,
    nu: nu$1,
    edge: constant(edge),
    chrome: constant(chrome),
    ie: constant(ie),
    opera: constant(opera),
    firefox: constant(firefox),
    safari: constant(safari)
  };
  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_976zrilujkmcwq2p.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_g7j7j5lvjkmcwq2r = {
    unknown: unknown$2,
    nu: nu$2,
    windows: constant(windows),
    ios: constant(ios),
    android: constant(android),
    linux: constant(linux),
    osx: constant(osx),
    solaris: constant(solaris),
    freebsd: constant(freebsd)
  };
  function DeviceType (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: constant(isiPad),
      isiPhone: constant(isiPhone),
      isTablet: constant(isTablet),
      isPhone: constant(isPhone),
      isTouch: constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: constant(iOSwebview)
    };
  }
  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_976zrilujkmcwq2p.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_976zrilujkmcwq2p.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_cg17vxlxjkmcwq2y = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };
  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return contains$1(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_8czqe0lyjkmcwq32 = {
    browsers: constant(browsers),
    oses: constant(oses)
  };
  var detect$2 = function (userAgent) {
    var browsers = $_8czqe0lyjkmcwq32.browsers();
    var oses = $_8czqe0lyjkmcwq32.oses();
    var browser = $_cg17vxlxjkmcwq2y.detectBrowser(browsers, userAgent).fold($_dz7zrfltjkmcwq2m.unknown, $_dz7zrfltjkmcwq2m.nu);
    var os = $_cg17vxlxjkmcwq2y.detectOs(oses, userAgent).fold($_g7j7j5lvjkmcwq2r.unknown, $_g7j7j5lvjkmcwq2r.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_74d2rylsjkmcwq2k = { detect: detect$2 };
  var detect$3 = cached(function () {
    var userAgent = navigator.userAgent;
    return $_74d2rylsjkmcwq2k.detect(userAgent);
  });
  var $_8sm9ublqjkmcwq2h = { detect: detect$3 };
  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return exists(elements, curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_eppdkllmjkmcwq2a.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_8sm9ublqjkmcwq2h.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_3jfu9slljkmcwq20 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_dvr0jtlfjkmcwq0n.is
  };
  var owner = function (element) {
    return Element$$1.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    return Element$$1.fromDom(element.dom().ownerDocument.documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return Element$$1.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map(Element$$1.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return findIndex(kin, function (elem) {
        return $_3jfu9slljkmcwq20.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = isFunction(isRoot) ? isRoot : constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = Element$$1.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return filter(elements, function (x) {
        return !$_3jfu9slljkmcwq20.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map(Element$$1.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map(Element$$1.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map(Element$$1.fromDom);
  };
  var prevSiblings = function (element) {
    return reverse($_43v24vlkjkmcwq1z.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_43v24vlkjkmcwq1z.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return map(dom.childNodes, Element$$1.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map(Element$$1.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = Immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_9z5e1kljjkmcwq1g = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };
  var firstLayer = function (scope, selector) {
    return filterFirstLayer(scope, selector, constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return bind($_9z5e1kljjkmcwq1g.children(scope), function (x) {
      return $_dvr0jtlfjkmcwq0n.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_a7t945lejkmcwq0d = {
    firstLayer: firstLayer,
    filterFirstLayer: filterFirstLayer
  };
  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_3d1bcmlijkmcwq1d.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_3d1bcmlijkmcwq1d.ELEMENT);
  var isText = isType$1($_3d1bcmlijkmcwq1d.TEXT);
  var isDocument = isType$1($_3d1bcmlijkmcwq1d.DOCUMENT);
  var $_5hranzm3jkmcwq3l = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };
  var rawSet = function (dom, key, value) {
    if (isString(value) || isBoolean(value) || isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    each$1(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_5hranzm3jkmcwq3l.isElement(source) || !$_5hranzm3jkmcwq3l.isElement(destination))
      return;
    each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_98tfuqm2jkmcwq3d = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };
  var inBody = function (element) {
    var dom = $_5hranzm3jkmcwq3l.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = cached(function () {
    return getBody(Element$$1.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return Element$$1.fromDom(body);
  };
  var $_d3qhw3m6jkmcwq3s = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };
  var all$1 = function (predicate) {
    return descendants($_d3qhw3m6jkmcwq3s.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return filter($_9z5e1kljjkmcwq1g.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return filter($_9z5e1kljjkmcwq1g.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return filter($_9z5e1kljjkmcwq1g.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    each($_9z5e1kljjkmcwq1g.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_dk5vi4m5jkmcwq3p = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };
  var all$2 = function (selector) {
    return $_dvr0jtlfjkmcwq0n.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_dk5vi4m5jkmcwq3p.ancestors(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_dk5vi4m5jkmcwq3p.siblings(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_dk5vi4m5jkmcwq3p.children(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_dvr0jtlfjkmcwq0n.all(selector, scope);
  };
  var $_6ib2l3m4jkmcwq3n = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };
  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? Option.some(scope) : isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }
  var first$1 = function (predicate) {
    return descendant($_d3qhw3m6jkmcwq3s.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = isFunction(isRoot) ? isRoot : constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = Element$$1.fromDom(element);
      if (predicate(el))
        return Option.some(el);
      else if (stop(el))
        break;
    }
    return Option.none();
  };
  var closest = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
  };
  var sibling = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return Option.none();
    return child$1(Element$$1.fromDom(element.parentNode), function (x) {
      return !$_3jfu9slljkmcwq20.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = find(scope.dom().childNodes, compose(predicate, Element$$1.fromDom));
    return result.map(Element$$1.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (node) {
      for (var i = 0; i < node.childNodes.length; i++) {
        if (predicate(Element$$1.fromDom(node.childNodes[i])))
          return Option.some(Element$$1.fromDom(node.childNodes[i]));
        var res = descend(node.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_8rq19vm8jkmcwq44 = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };
  var first$2 = function (selector) {
    return $_dvr0jtlfjkmcwq0n.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_8rq19vm8jkmcwq44.ancestor(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_8rq19vm8jkmcwq44.sibling(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_8rq19vm8jkmcwq44.child(scope, function (e) {
      return $_dvr0jtlfjkmcwq0n.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_dvr0jtlfjkmcwq0n.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_dvr0jtlfjkmcwq0n.is, ancestor$1, scope, selector, isRoot);
  };
  var $_87tdfem7jkmcwq42 = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };
  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : constant(false);
    if (isRoot(element))
      return Option.none();
    if (contains(tags, $_5hranzm3jkmcwq3l.name(element)))
      return Option.some(element);
    var isRootOrUpperTable = function (element) {
      return $_dvr0jtlfjkmcwq0n.is(element, 'table') || isRoot(element);
    };
    return $_87tdfem7jkmcwq42.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_a7t945lejkmcwq0d.firstLayer(ancestor, 'th,td');
  };
  var notCell = function (element, isRoot) {
    return lookup([
      'caption',
      'tr',
      'tbody',
      'tfoot',
      'thead'
    ], element, isRoot);
  };
  var neighbours = function (selector, element) {
    return $_9z5e1kljjkmcwq1g.parent(element).map(function (parent) {
      return $_6ib2l3m4jkmcwq3n.children(parent, selector);
    });
  };
  var neighbourCells = curry(neighbours, 'th,td');
  var neighbourRows = curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_87tdfem7jkmcwq42.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_87tdfem7jkmcwq42.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_a7t945lejkmcwq0d.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_98tfuqm2jkmcwq3d.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_7jwbndlcjkmcwpzk.grid(rows, cols);
  };
  var $_66sys5ldjkmcwpzo = {
    cell: cell,
    firstCell: firstCell,
    cells: cells,
    neighbourCells: neighbourCells,
    table: table,
    row: row,
    rows: rows,
    notCell: notCell,
    neighbourRows: neighbourRows,
    attr: attr,
    grid: grid$1
  };
  var fromTable = function (table) {
    var rows = $_66sys5ldjkmcwpzo.rows(table);
    return map(rows, function (row) {
      var element = row;
      var parent = $_9z5e1kljjkmcwq1g.parent(element);
      var parentSection = parent.map(function (parent) {
        var parentName = $_5hranzm3jkmcwq3l.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      }).getOr('tbody');
      var cells = map($_66sys5ldjkmcwpzo.cells(row), function (cell) {
        var rowspan = $_98tfuqm2jkmcwq3d.has(cell, 'rowspan') ? parseInt($_98tfuqm2jkmcwq3d.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_98tfuqm2jkmcwq3d.has(cell, 'colspan') ? parseInt($_98tfuqm2jkmcwq3d.get(cell, 'colspan'), 10) : 1;
        return $_7jwbndlcjkmcwpzk.detail(cell, rowspan, colspan);
      });
      return $_7jwbndlcjkmcwpzk.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return map(rows, function (row) {
      var cells = map($_66sys5ldjkmcwpzo.cells(row), function (cell) {
        var rowspan = $_98tfuqm2jkmcwq3d.has(cell, 'rowspan') ? parseInt($_98tfuqm2jkmcwq3d.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_98tfuqm2jkmcwq3d.has(cell, 'colspan') ? parseInt($_98tfuqm2jkmcwq3d.get(cell, 'colspan'), 10) : 1;
        return $_7jwbndlcjkmcwpzk.detail(cell, rowspan, colspan);
      });
      return $_7jwbndlcjkmcwpzk.rowdata(row, cells, example.section());
    });
  };
  var $_dtpn05lbjkmcwpzb = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };
  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? Option.some(raw) : Option.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? Option.some(filtered[0]) : Option.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    each(list, function (details, r) {
      var currentRow = [];
      each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_7jwbndlcjkmcwpzk.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
        for (var i = 0; i < detail.colspan(); i++) {
          for (var j = 0; j < detail.rowspan(); j++) {
            var cr = r + j;
            var cc = start + i;
            var newpos = key(cr, cc);
            access[newpos] = current;
            maxColumns = Math.max(maxColumns, cc + 1);
          }
        }
        currentRow.push(current);
      });
      cells.push($_7jwbndlcjkmcwpzk.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_7jwbndlcjkmcwpzk.grid(maxRows, maxColumns);
    return {
      grid: constant(grid),
      access: constant(access),
      all: constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = map(warehouse.all(), function (w) {
      return w.cells();
    });
    return flatten(rows);
  };
  var $_8t4rmkmajkmcwq4k = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };
  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_893sammcjkmcwq58 = { isSupported: isSupported };
  var internalSet = function (dom, property, value) {
    if (!isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_893sammcjkmcwq58.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_893sammcjkmcwq58.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    each$1(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    each$1(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$1 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_d3qhw3m6jkmcwq3s.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_893sammcjkmcwq58.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return Option.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_893sammcjkmcwq58.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = Element$$1.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_98tfuqm2jkmcwq3d.has(element, 'style') && trim($_98tfuqm2jkmcwq3d.get(element, 'style')) === '') {
      $_98tfuqm2jkmcwq3d.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_98tfuqm2jkmcwq3d.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_98tfuqm2jkmcwq3d.remove : $_98tfuqm2jkmcwq3d.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_893sammcjkmcwq58.isSupported(sourceDom) && $_893sammcjkmcwq58.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$1(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_5hranzm3jkmcwq3l.isElement(source) || !$_5hranzm3jkmcwq3l.isElement(destination))
      return;
    each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_b9b72cmbjkmcwq4u = {
    copy: copy,
    set: set$1,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$1,
    get: get$1,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };
  var before = function (marker, element) {
    var parent = $_9z5e1kljjkmcwq1g.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_9z5e1kljjkmcwq1g.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_9z5e1kljjkmcwq1g.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_9z5e1kljjkmcwq1g.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_9z5e1kljjkmcwq1g.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_504takmdjkmcwq59 = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };
  var before$1 = function (marker, elements) {
    each(elements, function (x) {
      $_504takmdjkmcwq59.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_504takmdjkmcwq59.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    each(elements.slice().reverse(), function (x) {
      $_504takmdjkmcwq59.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    each(elements, function (x) {
      $_504takmdjkmcwq59.append(parent, x);
    });
  };
  var $_32y69amfjkmcwq5e = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };
  var empty = function (element) {
    element.dom().textContent = '';
    each($_9z5e1kljjkmcwq1g.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_9z5e1kljjkmcwq1g.children(wrapper);
    if (children.length > 0)
      $_32y69amfjkmcwq5e.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_af3mfpmejkmcwq5b = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };
  var stats = Immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    each$1(house.access(), function (detail) {
      if (isSelected(detail)) {
        var startRow = detail.row();
        var endRow = startRow + detail.rowspan() - 1;
        var startCol = detail.column();
        var endCol = startCol + detail.colspan() - 1;
        if (startRow < minRow)
          minRow = startRow;
        else if (endRow > maxRow)
          maxRow = endRow;
        if (startCol < minCol)
          minCol = startCol;
        else if (endCol > maxCol)
          maxCol = endCol;
      }
    });
    return stats(minRow, minCol, maxRow, maxCol);
  };
  var makeCell = function (list, seenSelected, rowIndex) {
    var row = list[rowIndex].element();
    var td = Element$$1.fromTag('td');
    $_504takmdjkmcwq59.append(td, Element$$1.fromTag('br'));
    var f = seenSelected ? $_504takmdjkmcwq59.append : $_504takmdjkmcwq59.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_8t4rmkmajkmcwq4k.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = filter($_a7t945lejkmcwq0d.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    each(emptyRows, $_af3mfpmejkmcwq5b.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      each($_a7t945lejkmcwq0d.firstLayer(table, 'th,td'), function (cell) {
        $_98tfuqm2jkmcwq3d.remove(cell, 'rowspan');
        $_98tfuqm2jkmcwq3d.remove(cell, 'colspan');
      });
    }
    $_98tfuqm2jkmcwq3d.remove(table, 'width');
    $_98tfuqm2jkmcwq3d.remove(table, 'height');
    $_b9b72cmbjkmcwq4u.remove(table, 'width');
    $_b9b72cmbjkmcwq4u.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_dvr0jtlfjkmcwq0n.is(detail.element(), selectedSelector);
    };
    var list = $_dtpn05lbjkmcwpzb.fromTable(table);
    var house = $_8t4rmkmajkmcwq4k.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_a7t945lejkmcwq0d.filterFirstLayer(table, 'th,td', function (cell) {
      return $_dvr0jtlfjkmcwq0n.is(cell, selector);
    });
    each(unselectedCells, $_af3mfpmejkmcwq5b.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_fye74ll5jkmcwpyg = { extract: extract };
  var clone$1 = function (original, deep) {
    return Element$$1.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = Element$$1.fromTag(tag);
    var attributes = $_98tfuqm2jkmcwq3d.clone(original);
    $_98tfuqm2jkmcwq3d.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_9z5e1kljjkmcwq1g.children(deep(original));
    $_32y69amfjkmcwq5e.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_504takmdjkmcwq59.before(original, nu);
    var children = $_9z5e1kljjkmcwq1g.children(original);
    $_32y69amfjkmcwq5e.append(nu, children);
    $_af3mfpmejkmcwq5b.remove(original);
    return nu;
  };
  var $_fd9y5qmhjkmcwq6d = {
    shallow: shallow,
    shallowAs: shallowAs,
    deep: deep,
    copy: copy$1,
    mutate: mutate
  };
  function NodeValue (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return Option.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
    };
    var browser = $_8sm9ublqjkmcwq2h.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  }
  var api = NodeValue($_5hranzm3jkmcwq3l.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_gelocgmkjkmcwq6n = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };
  var getEnd = function (element) {
    return $_5hranzm3jkmcwq3l.name(element) === 'img' ? 1 : $_gelocgmkjkmcwq6n.getOption(element).fold(function () {
      return $_9z5e1kljjkmcwq1g.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_gelocgmkjkmcwq6n.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || contains(elementsWithCursorPosition, $_5hranzm3jkmcwq3l.name(elem));
  };
  var $_8b7hivmjjkmcwq6j = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };
  var first$3 = function (element) {
    return $_8rq19vm8jkmcwq44.descendant(element, $_8b7hivmjjkmcwq6j.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_8b7hivmjjkmcwq6j.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_9z5e1kljjkmcwq1g.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return Option.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope);
  };
  var $_9rdh12mijkmcwq6g = {
    first: first$3,
    last: last$2
  };
  var cell$1 = function () {
    var td = Element$$1.fromTag('td');
    $_504takmdjkmcwq59.append(td, Element$$1.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_fd9y5qmhjkmcwq6d.copy(cell, tag);
    each$1(attrs, function (v, k) {
      if (v === null)
        $_98tfuqm2jkmcwq3d.remove(replica, k);
      else
        $_98tfuqm2jkmcwq3d.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return Element$$1.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_9rdh12mijkmcwq6g.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_6ib2l3m4jkmcwq3n.ancestors(firstText, formatSelector, function (element) {
        return $_3jfu9slljkmcwq20.eq(element, oldCell);
      });
      return foldr(parents, function (last$$1, parent) {
        var clonedFormat = $_fd9y5qmhjkmcwq6d.shallow(parent);
        $_98tfuqm2jkmcwq3d.remove(clonedFormat, 'contenteditable');
        $_504takmdjkmcwq59.append(last$$1, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_9z5e1kljjkmcwq1g.owner(prev.element());
      var td = Element$$1.fromTag($_5hranzm3jkmcwq3l.name(prev.element()), doc.dom());
      var formats = formatsToClone.getOr([
        'strong',
        'em',
        'b',
        'i',
        'span',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'div'
      ]);
      var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
      $_504takmdjkmcwq59.append(lastNode, Element$$1.fromTag('br'));
      $_b9b72cmbjkmcwq4u.copy(prev.element(), td);
      $_b9b72cmbjkmcwq4u.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_b9b72cmbjkmcwq4u.remove(prev.element(), 'width');
      mutate(prev.element(), td);
      return td;
    };
    return {
      row: newRow(doc),
      cell: newCell,
      replace: replace,
      gap: cell$1
    };
  };
  var paste = function (doc) {
    return {
      row: newRow(doc),
      cell: cell$1,
      replace: pasteReplace,
      gap: cell$1
    };
  };
  var $_8pf0kgmgjkmcwq5j = {
    cellOperations: cellOperations,
    paste: paste
  };
  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_9z5e1kljjkmcwq1g.children(Element$$1.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return map(tags, function (x) {
      return Element$$1.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return map(texts, function (x) {
      return Element$$1.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return map(nodes, Element$$1.fromDom);
  };
  var $_1rltvxmmjkmcwq6u = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };
  var TagBoundaries = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];
  function DomUniverse () {
    var clone = function (element) {
      return Element$$1.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_5hranzm3jkmcwq3l.isElement(element))
        return false;
      if ($_5hranzm3jkmcwq3l.name(element) === 'body')
        return true;
      return contains(TagBoundaries, $_5hranzm3jkmcwq3l.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_5hranzm3jkmcwq3l.isElement(element))
        return false;
      return contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_5hranzm3jkmcwq3l.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_98tfuqm2jkmcwq3d.clone(source);
      $_98tfuqm2jkmcwq3d.setAll(destination, as);
    };
    return {
      up: constant({
        selector: $_87tdfem7jkmcwq42.ancestor,
        closest: $_87tdfem7jkmcwq42.closest,
        predicate: $_8rq19vm8jkmcwq44.ancestor,
        all: $_9z5e1kljjkmcwq1g.parents
      }),
      down: constant({
        selector: $_6ib2l3m4jkmcwq3n.descendants,
        predicate: $_dk5vi4m5jkmcwq3p.descendants
      }),
      styles: constant({
        get: $_b9b72cmbjkmcwq4u.get,
        getRaw: $_b9b72cmbjkmcwq4u.getRaw,
        set: $_b9b72cmbjkmcwq4u.set,
        remove: $_b9b72cmbjkmcwq4u.remove
      }),
      attrs: constant({
        get: $_98tfuqm2jkmcwq3d.get,
        set: $_98tfuqm2jkmcwq3d.set,
        remove: $_98tfuqm2jkmcwq3d.remove,
        copyTo: copyAttributesTo
      }),
      insert: constant({
        before: $_504takmdjkmcwq59.before,
        after: $_504takmdjkmcwq59.after,
        afterAll: $_32y69amfjkmcwq5e.after,
        append: $_504takmdjkmcwq59.append,
        appendAll: $_32y69amfjkmcwq5e.append,
        prepend: $_504takmdjkmcwq59.prepend,
        wrap: $_504takmdjkmcwq59.wrap
      }),
      remove: constant({
        unwrap: $_af3mfpmejkmcwq5b.unwrap,
        remove: $_af3mfpmejkmcwq5b.remove
      }),
      create: constant({
        nu: Element$$1.fromTag,
        clone: clone,
        text: Element$$1.fromText
      }),
      query: constant({
        comparePosition: comparePosition,
        prevSibling: $_9z5e1kljjkmcwq1g.prevSibling,
        nextSibling: $_9z5e1kljjkmcwq1g.nextSibling
      }),
      property: constant({
        children: $_9z5e1kljjkmcwq1g.children,
        name: $_5hranzm3jkmcwq3l.name,
        parent: $_9z5e1kljjkmcwq1g.parent,
        isText: $_5hranzm3jkmcwq3l.isText,
        isComment: $_5hranzm3jkmcwq3l.isComment,
        isElement: $_5hranzm3jkmcwq3l.isElement,
        getText: $_gelocgmkjkmcwq6n.get,
        setText: $_gelocgmkjkmcwq6n.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_3jfu9slljkmcwq20.eq,
      is: $_3jfu9slljkmcwq20.is
    };
  }
  var leftRight = Immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = findIndex(children, curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: constant(children.slice(0, ind)),
        after: constant(children.slice(ind + 1))
      };
    });
  };
  var breakToRight = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var second = universe.create().clone(parent);
      universe.insert().appendAll(second, parts.after());
      universe.insert().after(parent, second);
      return leftRight(parent, second);
    });
  };
  var breakToLeft = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var prior = universe.create().clone(parent);
      universe.insert().appendAll(prior, parts.before().concat([child]));
      universe.insert().appendAll(parent, parts.after());
      universe.insert().before(parent, prior);
      return leftRight(prior, parent);
    });
  };
  var breakPath = function (universe, item, isTop, breaker) {
    var result = Immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, Option.none(), splits);
      if (isTop(child))
        return result(child, group, splits);
      else {
        return universe.property().parent(child).bind(function (parent) {
          return breaker(universe, parent, child).map(function (breakage) {
            var extra = [{
                first: breakage.left,
                second: breakage.right
              }];
            var nextChild = isTop(parent) ? parent : breakage.left();
            return next(nextChild, Option.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, Option.none(), []);
  };
  var $_e4cavmvjkmcwq9s = {
    breakToLeft: breakToLeft,
    breakToRight: breakToRight,
    breakPath: breakPath
  };
  var all$3 = function (universe, look, elements, f) {
    var head$$1 = elements[0];
    var tail = elements.slice(1);
    return f(universe, look, head$$1, tail);
  };
  var oneAll = function (universe, look, elements) {
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : Option.none();
  };
  var unsafeOne = function (universe, look, head$$1, tail) {
    var start = look(universe, head$$1);
    return foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter(curry(universe.eq, s));
    });
  };
  var $_1jx8somwjkmcwqa3 = { oneAll: oneAll };
  var eq$1 = function (universe, item) {
    return curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return Option.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return Option.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = reverse(ps);
      var index = findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return findIndex(children, eq$1(universe, item));
    };
    var startIndex = finder(ps1);
    var endIndex = finder(ps2);
    return startIndex.bind(function (sIndex) {
      return endIndex.map(function (eIndex) {
        var first = Math.min(sIndex, eIndex);
        var last$$1 = Math.max(sIndex, eIndex);
        return children.slice(first, last$$1 + 1);
      });
    });
  };
  var ancestors$2 = function (universe, start, end, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = find(pruned1, function (x) {
      return exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: constant(pruned1),
      secondpath: constant(pruned2),
      shared: constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_eohsxbmxjkmcwqac = {
    subset: subset,
    ancestors: ancestors$2
  };
  var sharedOne = function (universe, look, elements) {
    return $_1jx8somwjkmcwqa3.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_eohsxbmxjkmcwqac.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_eohsxbmxjkmcwqac.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_e4cavmvjkmcwq9s.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_e4cavmvjkmcwq9s.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_e4cavmvjkmcwq9s.breakPath(universe, child, isTop, breaker);
  };
  var $_8jftilmujkmcwq9r = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };
  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_8jftilmujkmcwq9r.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_8jftilmujkmcwq9r.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_8jftilmujkmcwq9r.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_8jftilmujkmcwq9r.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_8jftilmujkmcwq9r.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_8jftilmujkmcwq9r.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_cqkw3imrjkmcwq8k = {
    sharedOne: sharedOne$1,
    subset: subset$2,
    ancestors: ancestors$4,
    breakToLeft: breakToLeft$2,
    breakToRight: breakToRight$2,
    breakPath: breakPath$2
  };
  var inSelection = function (bounds, detail) {
    var leftEdge = detail.column();
    var rightEdge = detail.column() + detail.colspan() - 1;
    var topEdge = detail.row();
    var bottomEdge = detail.row() + detail.rowspan() - 1;
    return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
  };
  var isWithin = function (bounds, detail) {
    return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
  };
  var isRectangular = function (warehouse, bounds) {
    var isRect = true;
    var detailIsWithin = curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_8t4rmkmajkmcwq4k.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? Option.some(bounds) : Option.none();
  };
  var $_fos321n0jkmcwqaw = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };
  var getBounds = function (detailA, detailB) {
    return $_7jwbndlcjkmcwpzk.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_8t4rmkmajkmcwq4k.findItem(warehouse, startCell, $_3jfu9slljkmcwq20.eq);
    var finishCoords = $_8t4rmkmajkmcwq4k.findItem(warehouse, finishCell, $_3jfu9slljkmcwq20.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_fos321n0jkmcwqaw.isRectangular(warehouse, bounds);
    });
  };
  var $_3ejnqmn1jkmcwqb2 = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };
  var moveBy = function (warehouse, cell, row, column) {
    return $_8t4rmkmajkmcwq4k.findItem(warehouse, cell, $_3jfu9slljkmcwq20.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_8t4rmkmajkmcwq4k.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_3ejnqmn1jkmcwqb2.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_8t4rmkmajkmcwq4k.filterItems(warehouse, curry($_fos321n0jkmcwqaw.inSelection, bounds));
      return map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_3jfu9slljkmcwq20.contains(c2, c1);
    };
    return $_8t4rmkmajkmcwq4k.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_bm7aoxmzjkmcwqao = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };
  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_66sys5ldjkmcwpzo.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_bm7aoxmzjkmcwqao.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_bm7aoxmzjkmcwqao.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_3jfu9slljkmcwq20.eq(table, firstTable) ? first : $_bm7aoxmzjkmcwqao.parentCell(warehouse, first);
    var lastCell = $_3jfu9slljkmcwq20.eq(table, lastTable) ? last : $_bm7aoxmzjkmcwqao.parentCell(warehouse, last);
    return $_bm7aoxmzjkmcwqao.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_3ejnqmn1jkmcwqb2.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_dtpn05lbjkmcwpzb.fromTable(table);
    return $_8t4rmkmajkmcwq4k.generate(list);
  };
  var $_6bo0kumyjkmcwqak = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };
  var lookupTable = function (container, isRoot) {
    return $_87tdfem7jkmcwq42.ancestor(container, 'table');
  };
  var identified = MixedBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_3jfu9slljkmcwq20.eq(element, rootTable);
      };
    };
    if ($_3jfu9slljkmcwq20.eq(start, finish)) {
      return Option.some(identified({
        boxes: Option.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_3jfu9slljkmcwq20.eq(startTable, finishTable)) {
            return Option.some(identified({
              boxes: $_6bo0kumyjkmcwqak.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_3jfu9slljkmcwq20.contains(startTable, finishTable)) {
            var ancestorCells = $_6ib2l3m4jkmcwq3n.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return Option.some(identified({
              boxes: $_6bo0kumyjkmcwqak.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_3jfu9slljkmcwq20.contains(finishTable, startTable)) {
            var ancestorCells = $_6ib2l3m4jkmcwq3n.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return Option.some(identified({
              boxes: $_6bo0kumyjkmcwqak.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_cqkw3imrjkmcwq8k.ancestors(start, finish).shared().bind(function (lca) {
              return $_87tdfem7jkmcwq42.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_6ib2l3m4jkmcwq3n.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_6ib2l3m4jkmcwq3n.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return Option.some(identified({
                  boxes: $_6bo0kumyjkmcwqak.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                  start: startCell,
                  finish: finishCell
                }));
              });
            });
          }
        });
      });
    }
  };
  var retrieve = function (container, selector) {
    var sels = $_6ib2l3m4jkmcwq3n.descendants(container, selector);
    return sels.length > 0 ? Option.some(sels) : Option.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return find(boxes, function (box) {
      return $_dvr0jtlfjkmcwq0n.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_87tdfem7jkmcwq42.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_87tdfem7jkmcwq42.descendant(container, lastSelectedSelector).bind(function (last$$1) {
        return $_cqkw3imrjkmcwq8k.sharedOne(lookupTable, [
          first,
          last$$1
        ]).map(function (tbl) {
          return {
            first: constant(first),
            last: constant(last$$1),
            table: constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_87tdfem7jkmcwq42.ancestor(finish, 'table').bind(function (table) {
      return $_87tdfem7jkmcwq42.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: constant(boxes),
              start: constant(identified.start()),
              finish: constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last$$1) {
      return $_6bo0kumyjkmcwqak.moveBy(last$$1, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_ae41j1mqjkmcwq7w = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };
  var retrieve$1 = function (container, selector) {
    return $_ae41j1mqjkmcwq7w.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_ae41j1mqjkmcwq7w.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_3jfu9slljkmcwq20.eq(container, ancestor);
      };
      var firstAncestor = $_87tdfem7jkmcwq42.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_87tdfem7jkmcwq42.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_3jfu9slljkmcwq20.eq(fA, lA) ? $_6bo0kumyjkmcwqak.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
        });
      });
    });
  };
  var $_btnclampjkmcwq7i = {
    retrieve: retrieve$1,
    retrieveBox: retrieveBox
  };
  var selected = 'data-mce-selected';
  var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
  var attributeSelector = '[' + selected + ']';
  var firstSelected = 'data-mce-first-selected';
  var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
  var lastSelected = 'data-mce-last-selected';
  var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
  var $_44m387n2jkmcwqb8 = {
    selected: constant(selected),
    selectedSelector: constant(selectedSelector),
    attributeSelector: constant(attributeSelector),
    firstSelected: constant(firstSelected),
    firstSelectedSelector: constant(firstSelectedSelector),
    lastSelected: constant(lastSelected),
    lastSelectedSelector: constant(lastSelectedSelector)
  };
  var generate$1 = function (cases) {
    if (!isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    each(cases, function (acase, count) {
      var keys$$1 = keys(acase);
      if (keys$$1.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys$$1[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = forall(constructors, function (reqKey) {
            return contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var Adt = { generate: generate$1 };
  var type$1 = Adt.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_62kqdcn3jkmcwqba = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };
  var selection = function (cell, selections) {
    return $_62kqdcn3jkmcwqba.cata(selections.get(), constant([]), identity, constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_98tfuqm2jkmcwq3d.has(elem, 'rowspan') && parseInt($_98tfuqm2jkmcwq3d.get(elem, 'rowspan'), 10) > 1 || $_98tfuqm2jkmcwq3d.has(elem, 'colspan') && parseInt($_98tfuqm2jkmcwq3d.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
  };
  var mergable = function (table, selections) {
    return $_62kqdcn3jkmcwqba.cata(selections.get(), Option.none, function (cells, _env) {
      if (cells.length === 0) {
        return Option.none();
      }
      return $_btnclampjkmcwq7i.retrieveBox(table, $_44m387n2jkmcwqb8.firstSelectedSelector(), $_44m387n2jkmcwqb8.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? Option.some({
          bounds: constant(bounds),
          cells: constant(cells)
        }) : Option.none();
      });
    }, Option.none);
  };
  var $_aj06mymojkmcwq74 = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };
  var noMenu = function (cell) {
    return {
      element: constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: constant(cell),
      mergable: constant($_aj06mymojkmcwq74.mergable(table, selections)),
      unmergable: constant($_aj06mymojkmcwq74.unmergable(cell, selections)),
      selection: constant($_aj06mymojkmcwq74.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = Immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: constant($_aj06mymojkmcwq74.selection(cell, selections)),
      clipboard: constant(clipboard),
      generators: constant(generators)
    };
  };
  var $_6606lumnjkmcwq6y = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };
  var extractSelected = function (cells) {
    return $_66sys5ldjkmcwpzo.table(cells[0]).map($_fd9y5qmhjkmcwq6d.deep).map(function (replica) {
      return [$_fye74ll5jkmcwpyg.extract(replica, $_44m387n2jkmcwqb8.attributeSelector())];
    });
  };
  var serializeElement = function (editor, elm) {
    return editor.selection.serializer.serialize(elm.dom(), {});
  };
  var registerEvents = function (editor, selections, actions, cellSelection) {
    editor.on('BeforeGetContent', function (e) {
      var multiCellContext = function (cells) {
        e.preventDefault();
        extractSelected(cells).each(function (elements) {
          e.content = map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_62kqdcn3jkmcwqba.cata(selections.get(), noop, multiCellContext, noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = Element$$1.fromDom(domCell);
          var table = $_66sys5ldjkmcwpzo.table(cell);
          table.bind(function (table) {
            var elements = filter($_1rltvxmmjkmcwq6u.fromHtml(e.content), function (content) {
              return $_5hranzm3jkmcwq3l.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_5hranzm3jkmcwq3l.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = Element$$1.fromDom(editor.getDoc());
              var generators = $_8pf0kgmgjkmcwq5j.paste(doc);
              var targets = $_6606lumnjkmcwq6y.paste(cell, elements[0], generators);
              actions.pasteCells(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            }
          });
        });
      }
    });
  };
  var $_7y3gnul0jkmcwpxc = { registerEvents: registerEvents };
  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_893sammcjkmcwq58.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_b9b72cmbjkmcwq4u.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return foldl(properties, function (acc, property) {
        var val = $_b9b72cmbjkmcwq4u.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  }
  var api$1 = Dimension('height', function (element) {
    var dom = element.dom();
    return $_d3qhw3m6jkmcwq3s.inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
  });
  var set$3 = function (element, h) {
    api$1.set(element, h);
  };
  var get$3 = function (element) {
    return api$1.get(element);
  };
  var getOuter = function (element) {
    return api$1.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_b9b72cmbjkmcwq4u.set(element, 'max-height', absMax + 'px');
  };
  var $_ebklwon9jkmcwqcu = {
    set: set$3,
    get: get$3,
    getOuter: getOuter,
    setMax: setMax
  };
  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$2.set(element, h);
  };
  var get$4 = function (element) {
    return api$2.get(element);
  };
  var getOuter$1 = function (element) {
    return api$2.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$2.max(element, value, inclusions);
    $_b9b72cmbjkmcwq4u.set(element, 'max-width', absMax + 'px');
  };
  var $_7r37ipnbjkmcwqd1 = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax$1
  };
  var platform = $_8sm9ublqjkmcwq2h.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_b9b72cmbjkmcwq4u.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_b9b72cmbjkmcwq4u.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_7r37ipnbjkmcwqd1.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_ebklwon9jkmcwqcu.get(cell));
  };
  var $_2n6uc6n8jkmcwqcl = {
    getWidth: getWidth,
    getHeight: getHeight
  };
  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_b9b72cmbjkmcwq4u.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_b9b72cmbjkmcwq4u.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_b9b72cmbjkmcwq4u.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_b9b72cmbjkmcwq4u.getRaw(cell, 'height').getOrThunk(function () {
      return $_2n6uc6n8jkmcwqcl.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_66sys5ldjkmcwpzo.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return endsWith(value, '%') && $_5hranzm3jkmcwq3l.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_ebklwon9jkmcwqcu.get(cell);
    return normalizePixelSize(value, cell, $_ebklwon9jkmcwqcu.get, setHeight);
  };
  var get$5 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_98tfuqm2jkmcwq3d.has(cell, type) ? parseInt($_98tfuqm2jkmcwq3d.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_b9b72cmbjkmcwq4u.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return Option.from($_98tfuqm2jkmcwq3d.get(element, 'width'));
    }, function (width) {
      return Option.some(width);
    });
  };
  var normalizePercentageWidth = function (cellWidth, tableSize) {
    return cellWidth / tableSize.pixelWidth() * 100;
  };
  var choosePercentageSize = function (element, width, tableSize) {
    if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      return parseFloat(percentMatch[1]);
    } else {
      var intWidth = $_7r37ipnbjkmcwqd1.get(element);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var intWidth = $_7r37ipnbjkmcwqd1.get(cell);
      return normalizePercentageWidth(intWidth, tableSize);
    }, function (width) {
      return choosePercentageSize(cell, width, tableSize);
    });
  };
  var normalizePixelWidth = function (cellWidth, tableSize) {
    return cellWidth / 100 * tableSize.pixelWidth();
  };
  var choosePixelSize = function (element, width, tableSize) {
    if (pixelBasedSizeRegex.test(width)) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      return parseInt(pixelMatch[1], 10);
    } else if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      var floatWidth = parseFloat(percentMatch[1]);
      return normalizePixelWidth(floatWidth, tableSize);
    } else {
      return $_7r37ipnbjkmcwqd1.get(element);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      return $_7r37ipnbjkmcwqd1.get(cell);
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight$1 = function (cell) {
    return get$5(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return Option.some({
          width: constant(match[1]),
          unit: constant(match[3])
        });
      } else {
        return Option.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_b9b72cmbjkmcwq4u.set(cell, 'width', amount + unit);
  };
  var $_expxtvn7jkmcwqc2 = {
    percentageBasedSizeRegex: constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: constant(pixelBasedSizeRegex),
    setPixelWidth: setPixelWidth,
    setPercentageWidth: setPercentageWidth,
    setHeight: setHeight,
    getPixelWidth: getPixelWidth,
    getPercentageWidth: getPercentageWidth,
    getGenericWidth: getGenericWidth,
    setGenericWidth: setGenericWidth,
    getHeight: getHeight$1,
    getRawWidth: getRawWidth
  };
  var halve = function (main, other) {
    var width = $_expxtvn7jkmcwqc2.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_expxtvn7jkmcwqc2.setGenericWidth(main, newWidth, width.unit());
      $_expxtvn7jkmcwqc2.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_c5cuhwn6jkmcwqc0 = { halve: halve };
  var attached = function (element, scope) {
    var doc = scope || Element$$1.fromDom(document.documentElement);
    return $_8rq19vm8jkmcwq44.ancestor(element, curry($_3jfu9slljkmcwq20.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window && element instanceof Window)
      return element;
    return $_5hranzm3jkmcwq3l.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_5qen7lngjkmcwqdq = {
    attached: attached,
    windowOf: windowOf
  };
  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: constant(left),
      top: constant(top),
      translate: translate
    };
  };
  var Position = r;
  var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return Position(box.left, box.top);
  };
  var firstDefinedOrZero = function (a, b) {
    return a !== undefined ? a : b !== undefined ? b : 0;
  };
  var absolute = function (element) {
    var doc = element.dom().ownerDocument;
    var body = doc.body;
    var win = $_5qen7lngjkmcwqdq.windowOf(Element$$1.fromDom(doc));
    var html = doc.documentElement;
    var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
  };
  var relative = function (element) {
    var dom = element.dom();
    return Position(dom.offsetLeft, dom.offsetTop);
  };
  var viewport = function (element) {
    var dom = element.dom();
    var doc = dom.ownerDocument;
    var body = doc.body;
    var html = Element$$1.fromDom(doc.documentElement);
    if (body === dom)
      return Position(body.offsetLeft, body.offsetTop);
    if (!$_5qen7lngjkmcwqdq.attached(element, html))
      return Position(0, 0);
    return boxPosition(dom);
  };
  var $_c80mfqnfjkmcwqdo = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };
  var rowInfo = Immutable('row', 'y');
  var colInfo = Immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_c80mfqnfjkmcwqdo.absolute(cell);
    return pos.left() + $_7r37ipnbjkmcwqd1.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_c80mfqnfjkmcwqdo.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_c80mfqnfjkmcwqdo.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_ebklwon9jkmcwqcu.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = map(array.slice(1), function (cellOption, index) {
      return cellOption.map(function (cell) {
        return getInnerEdge(index, cell);
      });
    });
    var lastLine = array[array.length - 1].map(function (cell) {
      return getOuterEdge(array.length - 1, cell);
    });
    return lines.concat([lastLine]);
  };
  var negate = function (step, _table) {
    return -step;
  };
  var height = {
    delta: identity,
    positions: curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: identity,
    edge: ltrEdge,
    positions: curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_1daexhnejkmcwqd5 = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };
  var $_90vywdndjkmcwqd4 = {
    ltr: $_1daexhnejkmcwqd5.ltr,
    rtl: $_1daexhnejkmcwqd5.rtl
  };
  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_90vywdndjkmcwqd4.rtl : $_90vywdndjkmcwqd4.ltr;
    };
    var delta = function (amount, table) {
      return auto(table).delta(amount, table);
    };
    var positions = function (cols, table) {
      return auto(table).positions(cols, table);
    };
    var edge = function (cell) {
      return auto(cell).edge(cell);
    };
    return {
      delta: delta,
      edge: edge,
      positions: positions
    };
  }
  var getGridSize = function (table) {
    var input = $_dtpn05lbjkmcwpzb.fromTable(table);
    var warehouse = $_8t4rmkmajkmcwq4k.generate(input);
    return warehouse.grid();
  };
  var $_dmon09nijkmcwqdy = { getGridSize: getGridSize };
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    validateStrArr('required', required);
    checkDupes(required);
    return function (obj) {
      var keys$$1 = keys(obj);
      var allReqd = forall(required, function (req) {
        return contains(keys$$1, req);
      });
      if (!allReqd)
        reqMessage(required, keys$$1);
      handleUnsupported(required, keys$$1);
      var invalidKeys = filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys$$1) {
    var unsupported = filter(keys$$1, function (key) {
      return !contains(required, key);
    });
    if (unsupported.length > 0)
      unsuppMessage(unsupported);
  };
  var exactly = function (required) {
    return base(handleExact, required);
  };
  var elementToData = function (element) {
    var colspan = $_98tfuqm2jkmcwq3d.has(element, 'colspan') ? parseInt($_98tfuqm2jkmcwq3d.get(element, 'colspan'), 10) : 1;
    var rowspan = $_98tfuqm2jkmcwq3d.has(element, 'rowspan') ? parseInt($_98tfuqm2jkmcwq3d.get(element, 'rowspan'), 10) : 1;
    return {
      element: constant(element),
      colspan: constant(colspan),
      rowspan: constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell(Option.none());
    var toData = _toData !== undefined ? _toData : elementToData;
    var nu = function (data) {
      return generators.cell(data);
    };
    var nuFrom = function (element) {
      var data = toData(element);
      return nu(data);
    };
    var add = function (element) {
      var replacement = nuFrom(element);
      if (position.get().isNone())
        position.set(Option.some(replacement));
      recent = Option.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = Option.none();
    var getOrInit = function (element, comparator) {
      return recent.fold(function () {
        return add(element);
      }, function (p) {
        return comparator(element, p.item) ? p.replacement : add(element);
      });
    };
    return {
      getOrInit: getOrInit,
      cursor: position.get
    };
  };
  var transform = function (scope, tag) {
    return function (generators) {
      var position = Cell(Option.none());
      contract(generators);
      var list = [];
      var find$$1 = function (element, comparator) {
        return find(list, function (x) {
          return comparator(x.item, element);
        });
      };
      var makeNew = function (element) {
        var cell = generators.replace(element, tag, { scope: scope });
        list.push({
          item: element,
          sub: cell
        });
        if (position.get().isNone())
          position.set(Option.some(cell));
        return cell;
      };
      var replaceOrInit = function (element, comparator) {
        return find$$1(element, comparator).fold(function () {
          return makeNew(element);
        }, function (p) {
          return comparator(element, p.item) ? p.sub : makeNew(element);
        });
      };
      return {
        replaceOrInit: replaceOrInit,
        cursor: position.get
      };
    };
  };
  var merging = function (generators) {
    contract(generators);
    var position = Cell(Option.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set(Option.some(cell));
      return function () {
        var raw = generators.cell({
          element: constant(cell),
          colspan: constant(1),
          rowspan: constant(1)
        });
        $_b9b72cmbjkmcwq4u.remove(raw, 'width');
        $_b9b72cmbjkmcwq4u.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_alg1u9nkjkmcwqej = {
    modification: modification,
    transform: transform,
    merging: merging
  };
  var blockList = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'table',
    'thead',
    'tfoot',
    'tbody',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];
  var isList = function (universe, item) {
    var tagName = universe.property().name(item);
    return contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return contains([
      'address',
      'pre',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isHeading = function (universe, item) {
    var tagName = universe.property().name(item);
    return contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return contains([
      'div',
      'li',
      'td',
      'th',
      'blockquote',
      'body',
      'caption'
    ], universe.property().name(item));
  };
  var isEmptyTag = function (universe, item) {
    return contains([
      'br',
      'img',
      'hr',
      'input'
    ], universe.property().name(item));
  };
  var isFrame = function (universe, item) {
    return universe.property().name(item) === 'iframe';
  };
  var isInline = function (universe, item) {
    return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
  };
  var $_6mqqysnpjkmcwqg3 = {
    isBlock: isBlock,
    isList: isList,
    isFormatting: isFormatting,
    isHeading: isHeading,
    isContainer: isContainer,
    isEmptyTag: isEmptyTag,
    isFrame: isFrame,
    isInline: isInline
  };
  var universe$1 = DomUniverse();
  var isBlock$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_6mqqysnpjkmcwqg3.isInline(universe$1, element);
  };
  var $_fm83ehnojkmcwqfz = {
    isBlock: isBlock$1,
    isList: isList$1,
    isFormatting: isFormatting$1,
    isHeading: isHeading$1,
    isContainer: isContainer$1,
    isEmptyTag: isEmptyTag$1,
    isFrame: isFrame$1,
    isInline: isInline$1
  };
  var merge = function (cells) {
    var isBr = function (el) {
      return $_5hranzm3jkmcwq3l.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return forall(children, function (c) {
        return isBr(c) || $_5hranzm3jkmcwq3l.isText(c) && $_gelocgmkjkmcwq6n.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_5hranzm3jkmcwq3l.name(el) === 'li' || $_8rq19vm8jkmcwq44.ancestor(el, $_fm83ehnojkmcwqfz.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_9z5e1kljjkmcwq1g.nextSibling(el).map(function (rightSibling) {
        if ($_fm83ehnojkmcwqfz.isBlock(rightSibling))
          return true;
        if ($_fm83ehnojkmcwqfz.isEmptyTag(rightSibling)) {
          return $_5hranzm3jkmcwq3l.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_9rdh12mijkmcwq6g.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_9z5e1kljjkmcwq1g.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_fm83ehnojkmcwqfz.isBlock(parent) && !$_3jfu9slljkmcwq20.eq(cell, parent) ? [] : [Element$$1.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = bind(cells, function (cell) {
        var children = $_9z5e1kljjkmcwq1g.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [Element$$1.fromTag('br')] : content;
    };
    var contents = markContent();
    $_af3mfpmejkmcwq5b.empty(cells[0]);
    $_32y69amfjkmcwq5e.append(cells[0], contents);
  };
  var $_7usmkpnnjkmcwqf8 = { merge: merge };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var shallow$1 = function (old, nu) {
    return nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (hasOwnProperty.call(curObject, key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var merge$1 = baseMerge(shallow$1);
  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return Option.none();
  };
  var addCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    var before = cells.slice(0, index);
    var after = cells.slice(index);
    var newCells = before.concat([cell]).concat(after);
    return setCells(gridRow, newCells);
  };
  var mutateCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    cells[index] = cell;
  };
  var setCells = function (gridRow, cells) {
    return $_7jwbndlcjkmcwpzk.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = map(cells, f);
    return $_7jwbndlcjkmcwpzk.rowcells(r, gridRow.section());
  };
  var getCell = function (gridRow, index) {
    return gridRow.cells()[index];
  };
  var getCellElement = function (gridRow, index) {
    return getCell(gridRow, index).element();
  };
  var cellLength = function (gridRow) {
    return gridRow.cells().length;
  };
  var $_gdbsl0nvjkmcwqh8 = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };
  var getColumn = function (grid, index) {
    return map(grid, function (row) {
      return $_gdbsl0nvjkmcwqh8.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = findIndex(xs, function (x) {
      return !comp(first.element(), x.element());
    });
    return index.fold(function () {
      return xs.length;
    }, function (ind) {
      return ind;
    });
  };
  var subgrid = function (grid, row, column, comparator) {
    var restOfRow = getRow(grid, row).cells().slice(column);
    var endColIndex = findDiff(restOfRow, comparator);
    var restOfColumn = getColumn(grid, column).slice(row);
    var endRowIndex = findDiff(restOfColumn, comparator);
    return {
      colspan: constant(endColIndex),
      rowspan: constant(endRowIndex)
    };
  };
  var $_bfptp2nujkmcwqh2 = { subgrid: subgrid };
  var toDetails = function (grid, comparator) {
    var seen = map(grid, function (row, ri) {
      return map(row.cells(), function (col, ci) {
        return false;
      });
    });
    var updateSeen = function (ri, ci, rowspan, colspan) {
      for (var r = ri; r < ri + rowspan; r++) {
        for (var c = ci; c < ci + colspan; c++) {
          seen[r][c] = true;
        }
      }
    };
    return map(grid, function (row, ri) {
      var details = bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_bfptp2nujkmcwqh2.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_7jwbndlcjkmcwpzk.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_7jwbndlcjkmcwpzk.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_8t4rmkmajkmcwq4k.getAt(warehouse, i, j).map(function (item) {
          return $_7jwbndlcjkmcwpzk.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_7jwbndlcjkmcwpzk.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_7jwbndlcjkmcwpzk.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_13owsxntjkmcwqgt = {
    toDetails: toDetails,
    toGrid: toGrid
  };
  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_98tfuqm2jkmcwq3d.remove(element, property);
    else
      $_98tfuqm2jkmcwq3d.set(element, property, value);
  };
  var render = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_87tdfem7jkmcwq42.child(table, sectionName).getOrThunk(function () {
        var tb = Element$$1.fromTag(sectionName, $_9z5e1kljjkmcwq1g.owner(table).dom());
        $_504takmdjkmcwq59.append(table, tb);
        return tb;
      });
      $_af3mfpmejkmcwq5b.empty(section);
      var rows = map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_af3mfpmejkmcwq5b.empty(tr);
        each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_504takmdjkmcwq59.append(tr, cell.element());
        });
        return tr;
      });
      $_32y69amfjkmcwq5e.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_87tdfem7jkmcwq42.child(table, sectionName).each($_af3mfpmejkmcwq5b.remove);
    };
    var renderOrRemoveSection = function (gridSection, sectionName) {
      if (gridSection.length > 0) {
        renderSection(gridSection, sectionName);
      } else {
        removeSection(sectionName);
      }
    };
    var headSection = [];
    var bodySection = [];
    var footSection = [];
    each(grid, function (row) {
      switch (row.section()) {
      case 'thead':
        headSection.push(row);
        break;
      case 'tbody':
        bodySection.push(row);
        break;
      case 'tfoot':
        footSection.push(row);
        break;
      }
    });
    renderOrRemoveSection(headSection, 'thead');
    renderOrRemoveSection(bodySection, 'tbody');
    renderOrRemoveSection(footSection, 'tfoot');
    return {
      newRows: constant(newRows),
      newCells: constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = map(grid, function (row) {
      var tr = $_fd9y5qmhjkmcwq6d.shallow(row.element());
      each(row.cells(), function (cell) {
        var clonedCell = $_fd9y5qmhjkmcwq6d.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_504takmdjkmcwq59.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_4g8n7enwjkmcwqhc = {
    render: render,
    copy: copy$2
  };
  var repeat = function (repititions, f) {
    var r = [];
    for (var i = 0; i < repititions; i++) {
      r.push(f(i));
    }
    return r;
  };
  var range$1 = function (start, end) {
    var r = [];
    for (var i = start; i < end; i++) {
      r.push(i);
    }
    return r;
  };
  var unique = function (xs, comparator) {
    var result = [];
    each(xs, function (x, i) {
      if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
        result.push(x);
      } else if (i === xs.length - 1) {
        result.push(x);
      }
    });
    return result;
  };
  var deduce = function (xs, index) {
    if (index < 0 || index >= xs.length - 1)
      return Option.none();
    var current = xs[index].fold(function () {
      var rest = reverse(xs.slice(0, index));
      return findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return Option.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return Option.some({
        value: n,
        delta: 1
      });
    });
    return current.bind(function (c) {
      return next.map(function (n) {
        var extras = n.delta + c.delta;
        return Math.abs(n.value - c.value) / extras;
      });
    });
  };
  var $_cmkixrnzjkmcwqiw = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };
  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_cmkixrnzjkmcwqiw.range(0, grid.columns());
    var rows = $_cmkixrnzjkmcwqiw.range(0, grid.rows());
    return map(cols, function (col) {
      var getBlock = function () {
        return bind(rows, function (r) {
          return $_8t4rmkmajkmcwq4k.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold(constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_8t4rmkmajkmcwq4k.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return Option.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_cmkixrnzjkmcwqiw.range(0, grid.rows());
    var cols = $_cmkixrnzjkmcwqiw.range(0, grid.columns());
    return map(rows, function (row) {
      var getBlock = function () {
        return bind(cols, function (c) {
          return $_8t4rmkmajkmcwq4k.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold(constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_8t4rmkmajkmcwq4k.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_8ynjhvnyjkmcwqik = {
    columns: columns,
    rows: rows$1
  };
  var col = function (column, x, y, w, h) {
    var blocker = Element$$1.fromTag('div');
    $_b9b72cmbjkmcwq4u.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_98tfuqm2jkmcwq3d.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = Element$$1.fromTag('div');
    $_b9b72cmbjkmcwq4u.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_98tfuqm2jkmcwq3d.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_bii7beo0jkmcwqj4 = {
    col: col,
    row: row$1
  };
  var css = function (namespace) {
    var dashNamespace = namespace.replace(/\./g, '-');
    var resolve = function (str) {
      return dashNamespace + '-' + str;
    };
    return { resolve: resolve };
  };
  var styles = css('ephox-snooker');
  var $_10r949o1jkmcwqjc = { resolve: styles.resolve };
  function Toggler (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  }
  var read = function (element, attr) {
    var value = $_98tfuqm2jkmcwq3d.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_98tfuqm2jkmcwq3d.set(element, attr, nu.join(' '));
    return true;
  };
  var remove$3 = function (element, attr, id) {
    var nu = filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_98tfuqm2jkmcwq3d.set(element, attr, nu.join(' '));
    else
      $_98tfuqm2jkmcwq3d.remove(element, attr);
    return false;
  };
  var $_kdr27o6jkmcwqjm = {
    read: read,
    add: add,
    remove: remove$3
  };
  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$6 = function (element) {
    return $_kdr27o6jkmcwqjm.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_kdr27o6jkmcwqjm.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_kdr27o6jkmcwqjm.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if (contains(get$6(element), clazz)) {
      return remove$4(element, clazz);
    } else {
      return add$1(element, clazz);
    }
  };
  var $_4hy5b1o5jkmcwqji = {
    get: get$6,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };
  var add$2 = function (element, clazz) {
    if ($_4hy5b1o5jkmcwqji.supports(element))
      element.dom().classList.add(clazz);
    else
      $_4hy5b1o5jkmcwqji.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_4hy5b1o5jkmcwqji.supports(element) ? element.dom().classList : $_4hy5b1o5jkmcwqji.get(element);
    if (classList.length === 0) {
      $_98tfuqm2jkmcwq3d.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_4hy5b1o5jkmcwqji.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_4hy5b1o5jkmcwqji.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_4hy5b1o5jkmcwqji.supports(element) ? element.dom().classList.toggle(clazz) : $_4hy5b1o5jkmcwqji.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_4hy5b1o5jkmcwqji.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_4hy5b1o5jkmcwqji.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_4hy5b1o5jkmcwqji.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_4hy5b1o5jkmcwqji.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_fk0u2o3jkmcwqjg = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };
  var resizeBar = $_10r949o1jkmcwqjc.resolve('resizer-bar');
  var resizeRowBar = $_10r949o1jkmcwqjc.resolve('resizer-rows');
  var resizeColBar = $_10r949o1jkmcwqjc.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_6ib2l3m4jkmcwq3n.descendants(wire.parent(), '.' + resizeBar);
    each(previous, $_af3mfpmejkmcwq5b.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_fk0u2o3jkmcwqjg.add(bar, resizeBar);
        $_504takmdjkmcwq59.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_bii7beo0jkmcwqj4.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_fk0u2o3jkmcwqjg.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_bii7beo0jkmcwqj4.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_fk0u2o3jkmcwqjg.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_c80mfqnfjkmcwqdo.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_7r37ipnbjkmcwqd1.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_ebklwon9jkmcwqcu.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_dtpn05lbjkmcwpzb.fromTable(table);
    var warehouse = $_8t4rmkmajkmcwq4k.generate(list);
    var rows = $_8ynjhvnyjkmcwqik.rows(warehouse);
    var cols = $_8ynjhvnyjkmcwqik.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_6ib2l3m4jkmcwq3n.descendants(wire.parent(), '.' + resizeBar);
    each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_b9b72cmbjkmcwq4u.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_b9b72cmbjkmcwq4u.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_fk0u2o3jkmcwqjg.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_fk0u2o3jkmcwqjg.has(element, resizeColBar);
  };
  var $_ax6148nxjkmcwqi0 = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };
  var fromWarehouse = function (warehouse, generators) {
    return $_13owsxntjkmcwqgt.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = findMap(details, function (detail) {
        return $_9z5e1kljjkmcwq1g.parent(detail.element()).map(function (row) {
          var isNew = $_9z5e1kljjkmcwq1g.parent(row).isNone();
          return $_7jwbndlcjkmcwpzk.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_7jwbndlcjkmcwpzk.elementnew(generators.row(), true);
      });
    };
    return map(rendered, function (details) {
      var row = findRow(details.details());
      return $_7jwbndlcjkmcwpzk.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_13owsxntjkmcwqgt.toDetails(grid, $_3jfu9slljkmcwq20.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = flatten(map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return find(all, function (e) {
      return $_3jfu9slljkmcwq20.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_dtpn05lbjkmcwpzb.fromTable(table);
      var warehouse = $_8t4rmkmajkmcwq4k.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_3jfu9slljkmcwq20.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return Option.none();
      }, function (out) {
        var newElements = $_4g8n7enwjkmcwqhc.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_ax6148nxjkmcwqi0.refresh(wire, table, $_1daexhnejkmcwqd5.height, direction);
        return Option.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_66sys5ldjkmcwpzo.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_66sys5ldjkmcwpzo.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return merge$1(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = map(target.selection(), function (cell) {
      return $_66sys5ldjkmcwpzo.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = cat(details);
    return cells.length > 0 ? Option.some(merge$1({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : Option.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = map(target.selection(), function (cell) {
      return $_66sys5ldjkmcwpzo.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = cat(details);
    return cells.length > 0 ? Option.some(cells) : Option.none();
  };
  var $_2sk7xunqjkmcwqg9 = {
    run: run,
    toDetailList: toDetailList,
    onCell: onCell,
    onCells: onCells,
    onPaste: onPaste,
    onPasteRows: onPasteRows,
    onMergable: onMergable,
    onUnmergable: onUnmergable
  };
  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return Option.some(o);
    };
    return {
      is: is,
      isValue: always,
      isError: never,
      getOr: constant(o),
      getOrThunk: constant(o),
      getOrDie: constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return die(String(message))();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: never,
      isValue: never,
      isError: always,
      getOr: identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: noop,
      bind: bind,
      exists: never,
      forall: always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };
  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_gdbsl0nvjkmcwqh8.cellLength(gridA[0]))
      return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_gdbsl0nvjkmcwqh8.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return Result.value({
      rowDelta: constant(rowRemainder.length - rowRequired),
      colDelta: constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_gdbsl0nvjkmcwqh8.cellLength(gridA[0]);
    var colLengthB = $_gdbsl0nvjkmcwqh8.cellLength(gridB[0]);
    return {
      rowDelta: constant(0),
      colDelta: constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return map(cells, function () {
      return $_7jwbndlcjkmcwpzk.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_cmkixrnzjkmcwqiw.repeat(amount, function (_row) {
      return $_gdbsl0nvjkmcwqh8.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return map(grid, function (row) {
      return $_gdbsl0nvjkmcwqh8.setCells(row, row.cells().concat(fill($_cmkixrnzjkmcwqiw.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_9oir64o8jkmcwqk0 = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };
  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_gdbsl0nvjkmcwqh8.mutateCell(grid[i], j, $_7jwbndlcjkmcwpzk.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_gdbsl0nvjkmcwqh8.cellLength(grid[0]); j++) {
        var current = $_gdbsl0nvjkmcwqh8.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_gdbsl0nvjkmcwqh8.mutateCell(grid[i], j, $_7jwbndlcjkmcwpzk.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return foldl(row, function (rest, cell) {
      return exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      each(cells, function (cell) {
        var replacement = Option.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_gdbsl0nvjkmcwqh8.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = Option.some(substitution());
              }
              replacement.each(function (sub) {
                $_gdbsl0nvjkmcwqh8.mutateCell(grid[i], j, $_7jwbndlcjkmcwpzk.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_1kx5x1oajkmcwqkb = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };
  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_gdbsl0nvjkmcwqh8.getCell(grid[row], col);
    var matching = curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_gdbsl0nvjkmcwqh8.cellLength(currentRow) > 1 && (col > 0 && matching($_gdbsl0nvjkmcwqh8.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_gdbsl0nvjkmcwqh8.getCellElement(currentRow, col + 1)) || row > 0 && matching($_gdbsl0nvjkmcwqh8.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_gdbsl0nvjkmcwqh8.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_gdbsl0nvjkmcwqh8.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_1kx5x1oajkmcwqkb.unmerge(gridA, $_gdbsl0nvjkmcwqh8.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_gdbsl0nvjkmcwqh8.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_gdbsl0nvjkmcwqh8.mutateCell(gridA[r], c, $_7jwbndlcjkmcwpzk.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_9oir64o8jkmcwqk0.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_9oir64o8jkmcwqk0.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert = function (index, gridA, gridB, generator, comparator) {
    $_1kx5x1oajkmcwqkb.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_9oir64o8jkmcwqk0.measureWidth(gridB, gridA);
    var fittedNewGrid = $_9oir64o8jkmcwqk0.tailor(gridB, delta, generator);
    var secondDelta = $_9oir64o8jkmcwqk0.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_9oir64o8jkmcwqk0.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_a7znhho7jkmcwqjv = {
    merge: merge$3,
    insert: insert
  };
  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_gdbsl0nvjkmcwqh8.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_gdbsl0nvjkmcwqh8.getCellElement(grid[index - 1], c), $_gdbsl0nvjkmcwqh8.getCellElement(grid[index], c));
      var ret = withinSpan ? $_gdbsl0nvjkmcwqh8.getCell(grid[index], c) : $_7jwbndlcjkmcwpzk.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return map(grid, function (row) {
      var withinSpan = index > 0 && index < $_gdbsl0nvjkmcwqh8.cellLength(row) && comparator($_gdbsl0nvjkmcwqh8.getCellElement(row, index - 1), $_gdbsl0nvjkmcwqh8.getCellElement(row, index));
      var sub = withinSpan ? $_gdbsl0nvjkmcwqh8.getCell(row, index) : $_7jwbndlcjkmcwpzk.elementnew(substitution($_gdbsl0nvjkmcwqh8.getCellElement(row, example), comparator), true);
      return $_gdbsl0nvjkmcwqh8.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_7jwbndlcjkmcwpzk.elementnew(substitution($_gdbsl0nvjkmcwqh8.getCellElement(row, exampleCol), comparator), true) : $_gdbsl0nvjkmcwqh8.getCell(row, exampleCol);
      return $_gdbsl0nvjkmcwqh8.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_gdbsl0nvjkmcwqh8.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_7jwbndlcjkmcwpzk.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_7jwbndlcjkmcwpzk.rowcells(cells, row.section());
    });
    return filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_acaqnobjkmcwqki = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };
  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return map(grid, function (row) {
      return $_gdbsl0nvjkmcwqh8.mapCells(row, function (cell) {
        return isTarget(cell) ? $_7jwbndlcjkmcwpzk.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_gdbsl0nvjkmcwqh8.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_gdbsl0nvjkmcwqh8.getCellElement(grid[rowIndex - 1], colIndex), $_gdbsl0nvjkmcwqh8.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_gdbsl0nvjkmcwqh8.getCellElement(row, index - 1), $_gdbsl0nvjkmcwqh8.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_gdbsl0nvjkmcwqh8.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_87xjc2ocjkmcwqkn = {
    replaceColumn: replaceColumn,
    replaceRow: replaceRow
  };
  var none$1 = function () {
    return folder(function (n, o, l, m, r) {
      return n();
    });
  };
  var only = function (index) {
    return folder(function (n, o, l, m, r) {
      return o(index);
    });
  };
  var left = function (index, next) {
    return folder(function (n, o, l, m, r) {
      return l(index, next);
    });
  };
  var middle = function (prev, index, next) {
    return folder(function (n, o, l, m, r) {
      return m(prev, index, next);
    });
  };
  var right = function (prev, index) {
    return folder(function (n, o, l, m, r) {
      return r(prev, index);
    });
  };
  var folder = function (fold) {
    return { fold: fold };
  };
  var $_4st45oofjkmcwql8 = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };
  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_4st45oofjkmcwql8.none();
    if (input.length === 1)
      return $_4st45oofjkmcwql8.only(0);
    if (index === 0)
      return $_4st45oofjkmcwql8.left(0, 1);
    if (index === input.length - 1)
      return $_4st45oofjkmcwql8.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_4st45oofjkmcwql8.middle(index - 1, index, index + 1);
    return $_4st45oofjkmcwql8.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return map(array, constant(0));
    };
    var onNone = constant(zero(result));
    var onOnly = function (index) {
      return tableSize.singleColumnWidth(result[index], step);
    };
    var onChange = function (index, next) {
      if (step >= 0) {
        var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
        return zero(result.slice(0, index)).concat([
          step,
          newNext - result[next]
        ]).concat(zero(result.slice(next + 1)));
      } else {
        var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
        var diffx = result[index] - newThis;
        return zero(result.slice(0, index)).concat([
          newThis - result[index],
          diffx
        ]).concat(zero(result.slice(next + 1)));
      }
    };
    var onLeft = onChange;
    var onMiddle = function (prev, index, next) {
      return onChange(index, next);
    };
    var onRight = function (prev, index) {
      if (step >= 0) {
        return zero(result.slice(0, index)).concat([step]);
      } else {
        var size = Math.max(tableSize.minCellWidth(), result[index] + step);
        return zero(result.slice(0, index)).concat([size - result[index]]);
      }
    };
    return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
  };
  var $_9pnpssoejkmcwql2 = { determine: determine };
  var getSpan$1 = function (cell, type) {
    return $_98tfuqm2jkmcwq3d.has(cell, type) && parseInt($_98tfuqm2jkmcwq3d.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_b9b72cmbjkmcwq4u.get(element, property), 10);
  };
  var $_67wb16ohjkmcwqlj = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: constant(10),
    minHeight: constant(10),
    getInt: getInt
  };
  var getRaw$1 = function (cell, property, getter) {
    return $_b9b72cmbjkmcwq4u.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_expxtvn7jkmcwqc2.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_expxtvn7jkmcwqc2.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_8ynjhvnyjkmcwqik.columns(warehouse);
    var backups = map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter(not($_67wb16ohjkmcwqlj.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_cmkixrnzjkmcwqiw.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getWidth(cell, tableSize);
      });
    });
  };
  var getDeduced = function (deduced) {
    return deduced.map(function (d) {
      return d + 'px';
    }).getOr('');
  };
  var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
  };
  var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_expxtvn7jkmcwqc2.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_expxtvn7jkmcwqc2.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_8ynjhvnyjkmcwqik.rows(warehouse);
    var backups = map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter(not($_67wb16ohjkmcwqlj.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_cmkixrnzjkmcwqiw.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_expxtvn7jkmcwqc2.getHeight, function (deduced) {
      return deduced.getOrThunk($_67wb16ohjkmcwqlj.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_1uws4ogjkmcwqla = {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
  };
  var total = function (start, end, measures) {
    var r = 0;
    for (var i = start; i < end; i++) {
      r += measures[i] !== undefined ? measures[i] : 0;
    }
    return r;
  };
  var recalculateWidth = function (warehouse, widths) {
    var all = $_8t4rmkmajkmcwq4k.justCells(warehouse);
    return map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_8t4rmkmajkmcwq4k.justCells(warehouse);
    return map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: constant(heights[i])
      };
    });
  };
  var $_3gmpy8oijkmcwqlr = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };
  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_7r37ipnbjkmcwqd1.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_67wb16ohjkmcwqlj.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_expxtvn7jkmcwqc2.setPercentageWidth(table, total);
    };
    return {
      width: constant(floatWidth),
      pixelWidth: constant(pixelWidth),
      getWidths: $_1uws4ogjkmcwqla.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_expxtvn7jkmcwqc2.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_67wb16ohjkmcwqlj.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_expxtvn7jkmcwqc2.setPixelWidth(table, total);
    };
    return {
      width: constant(intWidth),
      pixelWidth: constant(intWidth),
      getWidths: $_1uws4ogjkmcwqla.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_67wb16ohjkmcwqlj.minWidth,
      setElementWidth: $_expxtvn7jkmcwqc2.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_expxtvn7jkmcwqc2.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_expxtvn7jkmcwqc2.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_expxtvn7jkmcwqc2.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_expxtvn7jkmcwqc2.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_7r37ipnbjkmcwqd1.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_expxtvn7jkmcwqc2.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_7r37ipnbjkmcwqd1.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_74bad5ojjkmcwqly = { getTableSize: getTableSize };
  var getWarehouse$1 = function (list) {
    return $_8t4rmkmajkmcwq4k.generate(list);
  };
  var sumUp = function (newSize) {
    return foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_dtpn05lbjkmcwpzb.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_74bad5ojjkmcwqly.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_9pnpssoejkmcwql2.determine(widths, index, step, tableSize);
    var newWidths = map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_3gmpy8oijkmcwqlr.recalculateWidth(warehouse, newWidths);
    each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_1uws4ogjkmcwqla.getPixelHeights(warehouse, direction);
    var newHeights = map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_67wb16ohjkmcwqlj.minHeight()) : dy;
    });
    var newCellSizes = $_3gmpy8oijkmcwqlr.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_3gmpy8oijkmcwqlr.matchRowHeight(warehouse, newHeights);
    each(newRowSizes, function (row) {
      $_expxtvn7jkmcwqc2.setHeight(row.element(), row.height());
    });
    each(newCellSizes, function (cell) {
      $_expxtvn7jkmcwqc2.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_expxtvn7jkmcwqc2.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_74bad5ojjkmcwqly.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_3gmpy8oijkmcwqlr.recalculateWidth(warehouse, widths);
    each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_c1phphodjkmcwqkx = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };
  var prune = function (table) {
    var cells = $_66sys5ldjkmcwpzo.cells(table);
    if (cells.length === 0)
      $_af3mfpmejkmcwq5b.remove(table);
  };
  var outcome = Immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return Option.from(grid[row]).bind(function (r) {
      return Option.from(r.cells()[column]).bind(function (c) {
        return Option.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return foldl(details, function (rest, detail) {
      return exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return foldl(details, function (rest, detail) {
      return exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_acaqnobjkmcwqki.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = foldl(rows, function (newGrid, _row) {
      return $_acaqnobjkmcwqki.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_acaqnobjkmcwqki.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = foldl(rows, function (newGrid, _row) {
      return $_acaqnobjkmcwqki.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_acaqnobjkmcwqki.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = foldl(columns, function (newGrid, _row) {
      return $_acaqnobjkmcwqki.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_acaqnobjkmcwqki.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = foldl(columns, function (newGrid, _row) {
      return $_acaqnobjkmcwqki.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_87xjc2ocjkmcwqkn.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_87xjc2ocjkmcwqkn.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_87xjc2ocjkmcwqkn.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_87xjc2ocjkmcwqkn.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_acaqnobjkmcwqki.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_acaqnobjkmcwqki.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_acaqnobjkmcwqki.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_acaqnobjkmcwqki.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_7usmkpnnjkmcwqf8.merge(cells);
    var newGrid = $_1kx5x1oajkmcwqkb.merge(grid, mergable.bounds(), comparator, constant(cells[0]));
    return outcome(newGrid, Option.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = foldr(unmergable, function (b, cell) {
      return $_1kx5x1oajkmcwqkb.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, Option.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_dtpn05lbjkmcwpzb.fromTable(table);
      var wh = $_8t4rmkmajkmcwq4k.generate(list);
      return $_13owsxntjkmcwqgt.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_7jwbndlcjkmcwpzk.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_a7znhho7jkmcwqjv.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, Option.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_dtpn05lbjkmcwpzb.fromPastedRows(rows, example);
    var wh = $_8t4rmkmajkmcwq4k.generate(pasteDetails);
    return $_13owsxntjkmcwqgt.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_a7znhho7jkmcwqjv.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_a7znhho7jkmcwqjv.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_c1phphodjkmcwqkx.adjustWidthTo;
  var $_dyoy2enjjkmcwqe1 = {
    insertRowBefore: $_2sk7xunqjkmcwqg9.run(insertRowBefore, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.modification),
    insertRowsBefore: $_2sk7xunqjkmcwqg9.run(insertRowsBefore, $_2sk7xunqjkmcwqg9.onCells, noop, noop, $_alg1u9nkjkmcwqej.modification),
    insertRowAfter: $_2sk7xunqjkmcwqg9.run(insertRowAfter, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.modification),
    insertRowsAfter: $_2sk7xunqjkmcwqg9.run(insertRowsAfter, $_2sk7xunqjkmcwqg9.onCells, noop, noop, $_alg1u9nkjkmcwqej.modification),
    insertColumnBefore: $_2sk7xunqjkmcwqg9.run(insertColumnBefore, $_2sk7xunqjkmcwqg9.onCell, resize, noop, $_alg1u9nkjkmcwqej.modification),
    insertColumnsBefore: $_2sk7xunqjkmcwqg9.run(insertColumnsBefore, $_2sk7xunqjkmcwqg9.onCells, resize, noop, $_alg1u9nkjkmcwqej.modification),
    insertColumnAfter: $_2sk7xunqjkmcwqg9.run(insertColumnAfter, $_2sk7xunqjkmcwqg9.onCell, resize, noop, $_alg1u9nkjkmcwqej.modification),
    insertColumnsAfter: $_2sk7xunqjkmcwqg9.run(insertColumnsAfter, $_2sk7xunqjkmcwqg9.onCells, resize, noop, $_alg1u9nkjkmcwqej.modification),
    splitCellIntoColumns: $_2sk7xunqjkmcwqg9.run(splitCellIntoColumns$1, $_2sk7xunqjkmcwqg9.onCell, resize, noop, $_alg1u9nkjkmcwqej.modification),
    splitCellIntoRows: $_2sk7xunqjkmcwqg9.run(splitCellIntoRows$1, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.modification),
    eraseColumns: $_2sk7xunqjkmcwqg9.run(eraseColumns, $_2sk7xunqjkmcwqg9.onCells, resize, prune, $_alg1u9nkjkmcwqej.modification),
    eraseRows: $_2sk7xunqjkmcwqg9.run(eraseRows, $_2sk7xunqjkmcwqg9.onCells, noop, prune, $_alg1u9nkjkmcwqej.modification),
    makeColumnHeader: $_2sk7xunqjkmcwqg9.run(makeColumnHeader, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.transform('row', 'th')),
    unmakeColumnHeader: $_2sk7xunqjkmcwqg9.run(unmakeColumnHeader, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.transform(null, 'td')),
    makeRowHeader: $_2sk7xunqjkmcwqg9.run(makeRowHeader, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.transform('col', 'th')),
    unmakeRowHeader: $_2sk7xunqjkmcwqg9.run(unmakeRowHeader, $_2sk7xunqjkmcwqg9.onCell, noop, noop, $_alg1u9nkjkmcwqej.transform(null, 'td')),
    mergeCells: $_2sk7xunqjkmcwqg9.run(mergeCells, $_2sk7xunqjkmcwqg9.onMergable, noop, noop, $_alg1u9nkjkmcwqej.merging),
    unmergeCells: $_2sk7xunqjkmcwqg9.run(unmergeCells, $_2sk7xunqjkmcwqg9.onUnmergable, resize, noop, $_alg1u9nkjkmcwqej.merging),
    pasteCells: $_2sk7xunqjkmcwqg9.run(pasteCells, $_2sk7xunqjkmcwqg9.onPaste, resize, noop, $_alg1u9nkjkmcwqej.modification),
    pasteRowsBefore: $_2sk7xunqjkmcwqg9.run(pasteRowsBefore, $_2sk7xunqjkmcwqg9.onPasteRows, noop, noop, $_alg1u9nkjkmcwqej.modification),
    pasteRowsAfter: $_2sk7xunqjkmcwqg9.run(pasteRowsAfter, $_2sk7xunqjkmcwqg9.onPasteRows, noop, noop, $_alg1u9nkjkmcwqej.modification)
  };
  var getBody$1 = function (editor) {
    return Element$$1.fromDom(editor.getBody());
  };
  var getPixelWidth$1 = function (elm) {
    return elm.getBoundingClientRect().width;
  };
  var getPixelHeight = function (elm) {
    return elm.getBoundingClientRect().height;
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_3jfu9slljkmcwq20.eq(element, getBody$1(editor));
    };
  };
  var removePxSuffix = function (size) {
    return size ? size.replace(/px$/, '') : '';
  };
  var addSizeSuffix = function (size) {
    if (/^[0-9]+$/.test(size)) {
      size += 'px';
    }
    return size;
  };
  var removeDataStyle = function (table) {
    var dataStyleCells = $_6ib2l3m4jkmcwq3n.descendants(table, 'td[data-mce-style],th[data-mce-style]');
    $_98tfuqm2jkmcwq3d.remove(table, 'data-mce-style');
    each(dataStyleCells, function (cell) {
      $_98tfuqm2jkmcwq3d.remove(cell, 'data-mce-style');
    });
  };
  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_b9b72cmbjkmcwq4u.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_4oy87jomjkmcwqmk = {
    onDirection: onDirection,
    getDirection: getDirection
  };
  var ltr$1 = { isRtl: constant(false) };
  var rtl$1 = { isRtl: constant(true) };
  var directionAt = function (element) {
    var dir = $_4oy87jomjkmcwqmk.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_29wc7uoljkmcwqmg = { directionAt: directionAt };
  var defaultTableToolbar = [
    'tableprops',
    'tabledelete',
    '|',
    'tableinsertrowbefore',
    'tableinsertrowafter',
    'tabledeleterow',
    '|',
    'tableinsertcolbefore',
    'tableinsertcolafter',
    'tabledeletecol'
  ];
  var defaultStyles = {
    'border-collapse': 'collapse',
    'width': '100%'
  };
  var defaultAttributes = { border: '1' };
  var getDefaultAttributes = function (editor) {
    return editor.getParam('table_default_attributes', defaultAttributes, 'object');
  };
  var getDefaultStyles = function (editor) {
    return editor.getParam('table_default_styles', defaultStyles, 'object');
  };
  var hasTableResizeBars = function (editor) {
    return editor.getParam('table_resize_bars', true, 'boolean');
  };
  var hasTabNavigation = function (editor) {
    return editor.getParam('table_tab_navigation', true, 'boolean');
  };
  var hasAdvancedCellTab = function (editor) {
    return editor.getParam('table_cell_advtab', true, 'boolean');
  };
  var hasAdvancedRowTab = function (editor) {
    return editor.getParam('table_row_advtab', true, 'boolean');
  };
  var hasAdvancedTableTab = function (editor) {
    return editor.getParam('table_advtab', true, 'boolean');
  };
  var hasAppearanceOptions = function (editor) {
    return editor.getParam('table_appearance_options', true, 'boolean');
  };
  var hasTableGrid = function (editor) {
    return editor.getParam('table_grid', true, 'boolean');
  };
  var shouldStyleWithCss = function (editor) {
    return editor.getParam('table_style_by_css', false, 'boolean');
  };
  var getCellClassList = function (editor) {
    return editor.getParam('table_cell_class_list', [], 'array');
  };
  var getRowClassList = function (editor) {
    return editor.getParam('table_row_class_list', [], 'array');
  };
  var getTableClassList = function (editor) {
    return editor.getParam('table_class_list', [], 'array');
  };
  var getColorPickerCallback = function (editor) {
    return editor.getParam('color_picker_callback');
  };
  var isPixelsForced = function (editor) {
    return editor.getParam('table_responsive_width') === false;
  };
  var getCloneElements = function (editor) {
    var cloneElements = editor.getParam('table_clone_elements');
    if (isString(cloneElements)) {
      return Option.some(cloneElements.split(/[ ,]/));
    } else if (Array.isArray(cloneElements)) {
      return Option.some(cloneElements);
    } else {
      return Option.none();
    }
  };
  var hasObjectResizing = function (editor) {
    var objectResizing = editor.getParam('object_resizing', true);
    return objectResizing === 'table' || objectResizing;
  };
  var getToolbar = function (editor) {
    var toolbar = editor.getParam('table_toolbar', defaultTableToolbar);
    if (toolbar === '' || toolbar === false) {
      return [];
    } else if (isString(toolbar)) {
      return toolbar.split(/[ ,]/);
    } else if (isArray(toolbar)) {
      return toolbar;
    } else {
      return [];
    }
  };
  var fireNewRow = function (editor, row) {
    return editor.fire('newrow', { node: row });
  };
  var fireNewCell = function (editor, cell) {
    return editor.fire('newcell', { node: cell });
  };
  var fireObjectResizeStart = function (editor, target, width, height) {
    editor.fire('ObjectResizeStart', {
      target: target,
      width: width,
      height: height
    });
  };
  var fireObjectResized = function (editor, target, width, height) {
    editor.fire('ObjectResized', {
      target: target,
      width: width,
      height: height
    });
  };
  var TableActions = function (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_5hranzm3jkmcwq3l.name(getBody$1(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_dmon09nijkmcwqdy.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_dmon09nijkmcwqdy.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var cloneFormats = getCloneElements(editor);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        removeDataStyle(table);
        var wire = lazyWire();
        var doc = Element$$1.fromDom(editor.getDoc());
        var direction = TableDirection($_29wc7uoljkmcwqmg.directionAt);
        var generators = $_8pf0kgmgjkmcwq5j.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          each(result.newRows(), function (row) {
            fireNewRow(editor, row.dom());
          });
          each(result.newCells(), function (cell) {
            fireNewCell(editor, cell.dom());
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : Option.none();
      };
    };
    var deleteRow = execute($_dyoy2enjjkmcwqe1.eraseRows, lastRowGuard, noop, lazyWire);
    var deleteColumn = execute($_dyoy2enjjkmcwqe1.eraseColumns, lastColumnGuard, noop, lazyWire);
    var insertRowsBefore = execute($_dyoy2enjjkmcwqe1.insertRowsBefore, always, noop, lazyWire);
    var insertRowsAfter = execute($_dyoy2enjjkmcwqe1.insertRowsAfter, always, noop, lazyWire);
    var insertColumnsBefore = execute($_dyoy2enjjkmcwqe1.insertColumnsBefore, always, $_c5cuhwn6jkmcwqc0.halve, lazyWire);
    var insertColumnsAfter = execute($_dyoy2enjjkmcwqe1.insertColumnsAfter, always, $_c5cuhwn6jkmcwqc0.halve, lazyWire);
    var mergeCells = execute($_dyoy2enjjkmcwqe1.mergeCells, always, noop, lazyWire);
    var unmergeCells = execute($_dyoy2enjjkmcwqe1.unmergeCells, always, noop, lazyWire);
    var pasteRowsBefore = execute($_dyoy2enjjkmcwqe1.pasteRowsBefore, always, noop, lazyWire);
    var pasteRowsAfter = execute($_dyoy2enjjkmcwqe1.pasteRowsAfter, always, noop, lazyWire);
    var pasteCells = execute($_dyoy2enjjkmcwqe1.pasteCells, always, noop, lazyWire);
    return {
      deleteRow: deleteRow,
      deleteColumn: deleteColumn,
      insertRowsBefore: insertRowsBefore,
      insertRowsAfter: insertRowsAfter,
      insertColumnsBefore: insertColumnsBefore,
      insertColumnsAfter: insertColumnsAfter,
      mergeCells: mergeCells,
      unmergeCells: unmergeCells,
      pasteRowsBefore: pasteRowsBefore,
      pasteRowsAfter: pasteRowsAfter,
      pasteCells: pasteCells
    };
  };
  var copyRows = function (table, target, generators) {
    var list = $_dtpn05lbjkmcwpzb.fromTable(table);
    var house = $_8t4rmkmajkmcwq4k.generate(list);
    var details = $_2sk7xunqjkmcwqg9.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_13owsxntjkmcwqgt.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_2sk7xunqjkmcwqg9.toDetailList(slicedGrid, generators);
      return $_4g8n7enwjkmcwqhc.copy(slicedDetails);
    });
  };
  var $_gap17qoqjkmcwqnh = { copyRows: copyRows };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getTDTHOverallStyle = function (dom, elm, name) {
    var cells = dom.select('td,th', elm);
    var firstChildStyle;
    var checkChildren = function (firstChildStyle, elms) {
      for (var i = 0; i < elms.length; i++) {
        var currentStyle = dom.getStyle(elms[i], name);
        if (typeof firstChildStyle === 'undefined') {
          firstChildStyle = currentStyle;
        }
        if (firstChildStyle !== currentStyle) {
          return '';
        }
      }
      return firstChildStyle;
    };
    firstChildStyle = checkChildren(firstChildStyle, cells);
    return firstChildStyle;
  };
  var applyAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('align' + name, {}, elm);
    }
  };
  var applyVAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('valign' + name, {}, elm);
    }
  };
  var unApplyAlign = function (editor, elm) {
    global$1.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    global$1.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_23sq1sotjkmcwqnu = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };
  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      global$1.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  function styleFieldHasFocus(e) {
    return e.control.rootControl.find('#style')[0].getEl().isEqualNode(document.activeElement);
  }
  var syncAdvancedStyleFields = function (editor, evt) {
    if (styleFieldHasFocus(evt)) {
      updateAdvancedFields(editor, evt);
    } else {
      updateStyleField(editor, evt);
    }
  };
  var updateStyleField = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    css['border-style'] = data.borderStyle;
    css['border-color'] = data.borderColor;
    css['background-color'] = data.backgroundColor;
    css.width = data.width ? addSizeSuffix(data.width) : '';
    css.height = data.height ? addSizeSuffix(data.height) : '';
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
  var updateAdvancedFields = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    rootControl.find('#borderStyle').value(css['border-style'] || '');
    rootControl.find('#borderColor').value(css['border-color'] || '');
    rootControl.find('#backgroundColor').value(css['background-color'] || '');
    rootControl.find('#width').value(css.width || '');
    rootControl.find('#height').value(css.height || '');
  };
  var extractAdvancedStyles = function (dom, elm) {
    var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
    var data = {};
    if (css['border-style']) {
      data.borderStyle = css['border-style'];
    }
    if (css['border-color']) {
      data.borderColor = css['border-color'];
    }
    if (css['background-color']) {
      data.backgroundColor = css['background-color'];
    }
    data.style = dom.serializeStyle(css);
    return data;
  };
  var createStyleForm = function (editor) {
    var createColorPickAction = function () {
      var colorPickerCallback = getColorPickerCallback(editor);
      if (colorPickerCallback) {
        return function (evt) {
          return colorPickerCallback.call(editor, function (value) {
            evt.control.value(value).fire('change');
          }, evt.control.value());
        };
      }
    };
    return {
      title: 'Advanced',
      type: 'form',
      defaults: { onchange: curry(updateStyleField, editor) },
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox',
          onchange: curry(updateAdvancedFields, editor)
        },
        {
          type: 'form',
          padding: 0,
          formItemDefaults: {
            layout: 'grid',
            alignH: [
              'start',
              'right'
            ]
          },
          defaults: { size: 7 },
          items: [
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              onselect: curry(updateStyleField, editor),
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            },
            {
              label: 'Border color',
              type: 'colorbox',
              name: 'borderColor',
              onaction: createColorPickAction()
            },
            {
              label: 'Background color',
              type: 'colorbox',
              name: 'backgroundColor',
              onaction: createColorPickAction()
            }
          ]
        }
      ]
    };
  };
  var $_79uus4oujkmcwqnx = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles,
    updateAdvancedFields: updateAdvancedFields,
    syncAdvancedStyleFields: syncAdvancedStyleFields
  };
  var updateStyles = function (elm, cssText) {
    delete elm.dataset.mceStyle;
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      type: elm.nodeName.toLowerCase(),
      style: '',
      align: '',
      valign: ''
    };
    global$1.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    global$1.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (hasAdvancedCellTab(editor)) {
      global$1.extend(data, $_79uus4oujkmcwqnx.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var onSubmitCellForm = function (editor, cells, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (cells.length === 1 || value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (cells.length === 1 || value) {
        dom.setStyle(elm, name, value);
      }
    }
    if (hasAdvancedCellTab(editor)) {
      $_79uus4oujkmcwqnx.syncAdvancedStyleFields(editor, evt);
    }
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$1.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', addSizeSuffix(data.width));
        setStyle(cellElm, 'height', addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_23sq1sotjkmcwqnu.unApplyAlign(editor, cellElm);
          $_23sq1sotjkmcwqnu.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_23sq1sotjkmcwqnu.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_23sq1sotjkmcwqnu.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open = function (editor) {
    var cellElm, data, classListCtrl, cells = [];
    cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    if (!cells.length && cellElm) {
      cells.push(cellElm);
    }
    cellElm = cellElm || cells[0];
    if (!cellElm) {
      return;
    }
    if (cells.length > 1) {
      data = {
        width: '',
        height: '',
        scope: '',
        class: '',
        align: '',
        valign: '',
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement(editor, cellElm);
    }
    if (getCellClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_79uus4oujkmcwqnx.buildListItems(getCellClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'td',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    var generalCellForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          layout: 'grid',
          columns: 2,
          labelGapCalc: false,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: [
            {
              label: 'Width',
              name: 'width',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            },
            {
              label: 'Cell type',
              name: 'type',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'Cell',
                  value: 'td'
                },
                {
                  text: 'Header cell',
                  value: 'th'
                }
              ]
            },
            {
              label: 'Scope',
              name: 'scope',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Row',
                  value: 'row'
                },
                {
                  text: 'Column',
                  value: 'col'
                },
                {
                  text: 'Row group',
                  value: 'rowgroup'
                },
                {
                  text: 'Column group',
                  value: 'colgroup'
                }
              ]
            },
            {
              label: 'H Align',
              name: 'align',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Left',
                  value: 'left'
                },
                {
                  text: 'Center',
                  value: 'center'
                },
                {
                  text: 'Right',
                  value: 'right'
                }
              ]
            },
            {
              label: 'V Align',
              name: 'valign',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Top',
                  value: 'top'
                },
                {
                  text: 'Middle',
                  value: 'middle'
                },
                {
                  text: 'Bottom',
                  value: 'bottom'
                }
              ]
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedCellTab(editor)) {
      editor.windowManager.open({
        title: 'Cell properties',
        bodyType: 'tabpanel',
        data: data,
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalCellForm
          },
          $_79uus4oujkmcwqnx.createStyleForm(editor)
        ],
        onsubmit: curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_2wxau0osjkmcwqnl = { open: open };
  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      align: '',
      style: '',
      type: elm.parentNode.nodeName.toLowerCase()
    };
    global$1.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedRowTab(editor)) {
      global$1.extend(data, $_79uus4oujkmcwqnx.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var switchRowType = function (dom, rowElm, toType) {
    var tableElm = dom.getParent(rowElm, 'table');
    var oldParentElm = rowElm.parentNode;
    var parentElm = dom.select(toType, tableElm)[0];
    if (!parentElm) {
      parentElm = dom.create(toType);
      if (tableElm.firstChild) {
        if (tableElm.firstChild.nodeName === 'CAPTION') {
          dom.insertAfter(parentElm, tableElm.firstChild);
        } else {
          tableElm.insertBefore(parentElm, tableElm.firstChild);
        }
      } else {
        tableElm.appendChild(parentElm);
      }
    }
    parentElm.appendChild(rowElm);
    if (!oldParentElm.hasChildNodes()) {
      dom.remove(oldParentElm);
    }
  };
  function onSubmitRowForm(editor, rows, oldData, evt) {
    var dom = editor.dom;
    function setAttrib(elm, name, value) {
      if (rows.length === 1 || value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (rows.length === 1 || value) {
        dom.setStyle(elm, name, value);
      }
    }
    if (hasAdvancedRowTab(editor)) {
      $_79uus4oujkmcwqnx.syncAdvancedStyleFields(editor, evt);
    }
    var data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$1.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (data.align !== oldData.align) {
          $_23sq1sotjkmcwqnu.unApplyAlign(editor, rowElm);
          $_23sq1sotjkmcwqnu.applyAlign(editor, rowElm, data.align);
        }
      });
      editor.focus();
    });
  }
  var open$1 = function (editor) {
    var dom = editor.dom;
    var tableElm, cellElm, rowElm, classListCtrl, data;
    var rows = [];
    var generalRowForm;
    tableElm = dom.getParent(editor.selection.getStart(), 'table');
    cellElm = dom.getParent(editor.selection.getStart(), 'td,th');
    global$1.each(tableElm.rows, function (row) {
      global$1.each(row.cells, function (cell) {
        if (dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) {
          rows.push(row);
          return false;
        }
      });
    });
    rowElm = rows[0];
    if (!rowElm) {
      return;
    }
    if (rows.length > 1) {
      data = {
        height: '',
        scope: '',
        style: '',
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (getRowClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_79uus4oujkmcwqnx.buildListItems(getRowClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'tr',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalRowForm = {
      type: 'form',
      columns: 2,
      padding: 0,
      defaults: { type: 'textbox' },
      items: [
        {
          type: 'listbox',
          name: 'type',
          label: 'Row type',
          text: 'Header',
          maxWidth: null,
          values: [
            {
              text: 'Header',
              value: 'thead'
            },
            {
              text: 'Body',
              value: 'tbody'
            },
            {
              text: 'Footer',
              value: 'tfoot'
            }
          ]
        },
        {
          type: 'listbox',
          name: 'align',
          label: 'Alignment',
          text: 'None',
          maxWidth: null,
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        {
          label: 'Height',
          name: 'height'
        },
        classListCtrl
      ]
    };
    if (hasAdvancedRowTab(editor)) {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalRowForm
          },
          $_79uus4oujkmcwqnx.createStyleForm(editor)
        ],
        onsubmit: curry(onSubmitRowForm, editor, rows, data)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: curry(onSubmitRowForm, editor, rows, data)
      });
    }
  };
  var $_d5mbwkovjkmcwqo6 = { open: open$1 };
  var global$2 = tinymce.util.Tools.resolve('tinymce.Env');
  var DefaultRenderOptions = {
    styles: {
      'border-collapse': 'collapse',
      width: '100%'
    },
    attributes: { border: '1' },
    percentages: true
  };
  var makeTable = function () {
    return Element$$1.fromTag('table');
  };
  var tableBody = function () {
    return Element$$1.fromTag('tbody');
  };
  var tableRow = function () {
    return Element$$1.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return Element$$1.fromTag('th');
  };
  var tableCell = function () {
    return Element$$1.fromTag('td');
  };
  var render$1 = function (rows, columns, rowHeaders, columnHeaders, renderOpts) {
    if (renderOpts === void 0) {
      renderOpts = DefaultRenderOptions;
    }
    var table = makeTable();
    $_b9b72cmbjkmcwq4u.setAll(table, renderOpts.styles);
    $_98tfuqm2jkmcwq3d.setAll(table, renderOpts.attributes);
    var tbody = tableBody();
    $_504takmdjkmcwq59.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_98tfuqm2jkmcwq3d.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_98tfuqm2jkmcwq3d.set(td, 'scope', 'col');
        }
        $_504takmdjkmcwq59.append(td, Element$$1.fromTag('br'));
        if (renderOpts.percentages) {
          $_b9b72cmbjkmcwq4u.set(td, 'width', 100 / columns + '%');
        }
        $_504takmdjkmcwq59.append(tr, td);
      }
      trs.push(tr);
    }
    $_32y69amfjkmcwq5e.append(tbody, trs);
    return table;
  };
  var get$7 = function (element) {
    return element.dom().innerHTML;
  };
  var set$5 = function (element, content) {
    var owner = $_9z5e1kljjkmcwq1g.owner(element);
    var docDom = owner.dom();
    var fragment = Element$$1.fromDom(docDom.createDocumentFragment());
    var contentElements = $_1rltvxmmjkmcwq6u.fromHtml(content, docDom);
    $_32y69amfjkmcwq5e.append(fragment, contentElements);
    $_af3mfpmejkmcwq5b.empty(element);
    $_504takmdjkmcwq59.append(element, fragment);
  };
  var getOuter$2 = function (element) {
    var container = Element$$1.fromTag('div');
    var clone = Element$$1.fromDom(element.dom().cloneNode(true));
    $_504takmdjkmcwq59.append(container, clone);
    return get$7(container);
  };
  var $_fvtixhp1jkmcwqpk = {
    get: get$7,
    set: set$5,
    getOuter: getOuter$2
  };
  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_87tdfem7jkmcwq42.descendant(tableElm, 'td,th').each(curry(placeCaretInCell, editor));
  };
  var fireEvents = function (editor, table) {
    each($_6ib2l3m4jkmcwq3n.descendants(table, 'tr'), function (row) {
      fireNewRow(editor, row.dom());
      each($_6ib2l3m4jkmcwq3n.descendants(row, 'th,td'), function (cell) {
        fireNewCell(editor, cell.dom());
      });
    });
  };
  var isPercentage = function (width) {
    return isString(width) && width.indexOf('%') !== -1;
  };
  var insert$1 = function (editor, columns, rows) {
    var defaultStyles = getDefaultStyles(editor);
    var options = {
      styles: defaultStyles,
      attributes: getDefaultAttributes(editor),
      percentages: isPercentage(defaultStyles.width) && !isPixelsForced(editor)
    };
    var table = render$1(rows, columns, 0, 0, options);
    $_98tfuqm2jkmcwq3d.set(table, 'data-mce-id', '__mce');
    var html = $_fvtixhp1jkmcwqpk.getOuter(table);
    editor.insertContent(html);
    return $_87tdfem7jkmcwq42.descendant(getBody$1(editor), 'table[data-mce-id="__mce"]').map(function (table) {
      if (isPixelsForced(editor)) {
        $_b9b72cmbjkmcwq4u.set(table, 'width', $_b9b72cmbjkmcwq4u.get(table, 'width'));
      }
      $_98tfuqm2jkmcwq3d.remove(table, 'data-mce-id');
      fireEvents(editor, table);
      selectFirstCellInTable(editor, table);
      return table.dom();
    }).getOr(null);
  };
  var $_37y5yboyjkmcwqos = { insert: insert$1 };
  function styleTDTH(dom, elm, name, value) {
    if (elm.tagName === 'TD' || elm.tagName === 'TH') {
      dom.setStyle(elm, name, value);
    } else {
      if (elm.children) {
        for (var i = 0; i < elm.children.length; i++) {
          styleTDTH(dom, elm.children[i], name, value);
        }
      }
    }
  }
  var extractDataFromElement$2 = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_23sq1sotjkmcwqnu.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_23sq1sotjkmcwqnu.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    global$1.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedTableTab(editor)) {
      global$1.extend(data, $_79uus4oujkmcwqnx.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
      attrs.width = removePxSuffix(data.width);
    } else {
      styles.width = addSizeSuffix(data.width);
    }
    if (shouldStyleWithCss(editor)) {
      styles['border-width'] = addSizeSuffix(data.border);
      styles['border-spacing'] = addSizeSuffix(data.cellspacing);
      global$1.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      global$1.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (shouldStyleWithCss(editor)) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      global$1.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = global$1.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    if (hasAdvancedTableTab(editor)) {
      $_79uus4oujkmcwqnx.syncAdvancedStyleFields(editor, evt);
    }
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_37y5yboyjkmcwqos.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !global$2.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_23sq1sotjkmcwqnu.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_23sq1sotjkmcwqnu.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open$2 = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement$2(editor, tableElm);
      }
    } else {
      colsCtrl = {
        label: 'Cols',
        name: 'cols'
      };
      rowsCtrl = {
        label: 'Rows',
        name: 'rows'
      };
    }
    if (getTableClassList(editor).length > 0) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_79uus4oujkmcwqnx.buildListItems(getTableClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'table',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalTableForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          labelGapCalc: false,
          padding: 0,
          layout: 'grid',
          columns: 2,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: hasAppearanceOptions(editor) ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            },
            {
              label: 'Cell spacing',
              name: 'cellspacing'
            },
            {
              label: 'Cell padding',
              name: 'cellpadding'
            },
            {
              label: 'Border',
              name: 'border'
            },
            {
              label: 'Caption',
              name: 'caption',
              type: 'checkbox'
            }
          ] : [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: curry($_79uus4oujkmcwqnx.updateStyleField, editor)
            }
          ]
        },
        {
          label: 'Alignment',
          name: 'align',
          type: 'listbox',
          text: 'None',
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedTableTab(editor)) {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalTableForm
          },
          $_79uus4oujkmcwqnx.createStyleForm(editor)
        ],
        onsubmit: curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_as86hkowjkmcwqod = { open: open$2 };
  var each$3 = global$1.each;
  var registerCommands = function (editor, actions, cellSelection, selections, clipboardRows) {
    var isRoot = getIsRoot(editor);
    var eraseTable = function () {
      var cell = Element$$1.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_66sys5ldjkmcwpzo.table(cell, isRoot);
      table.filter(not(isRoot)).each(function (table) {
        var cursor = Element$$1.fromText('');
        $_504takmdjkmcwq59.after(table, cursor);
        $_af3mfpmejkmcwq5b.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return Element$$1.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_66sys5ldjkmcwpzo.table(cell, isRoot);
    };
    var getSize = function (table) {
      return {
        width: getPixelWidth$1(table.dom()),
        height: getPixelWidth$1(table.dom())
      };
    };
    var resizeChange = function (editor, oldSize, table) {
      var newSize = getSize(table);
      if (oldSize.width !== newSize.width || oldSize.height !== newSize.height) {
        fireObjectResizeStart(editor, table.dom(), oldSize.width, oldSize.height);
        fireObjectResized(editor, table.dom(), newSize.width, newSize.height);
      }
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_6606lumnjkmcwq6y.forMenu(selections, table, cell);
        var beforeSize = getSize(table);
        execute(table, targets).each(function (rng) {
          resizeChange(editor, beforeSize, table);
          editor.selection.setRng(rng);
          editor.focus();
          cellSelection.clear(table);
          removeDataStyle(table);
        });
      });
    };
    var copyRowSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      return table.bind(function (table) {
        var doc = Element$$1.fromDom(editor.getDoc());
        var targets = $_6606lumnjkmcwq6y.forMenu(selections, table, cell);
        var generators = $_8pf0kgmgjkmcwq5j.cellOperations(noop, doc, Option.none());
        return $_gap17qoqjkmcwqnh.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.get().each(function (rows) {
        var clonedRows = map(rows, function (row) {
          return $_fd9y5qmhjkmcwq6d.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = Element$$1.fromDom(editor.getDoc());
          var generators = $_8pf0kgmgjkmcwq5j.paste(doc);
          var targets = $_6606lumnjkmcwq6y.pasteRows(selections, table, cell, clonedRows, generators);
          execute(table, targets).each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
            cellSelection.clear(table);
          });
        });
      });
    };
    each$3({
      mceTableSplitCells: function () {
        actOnSelection(actions.unmergeCells);
      },
      mceTableMergeCells: function () {
        actOnSelection(actions.mergeCells);
      },
      mceTableInsertRowBefore: function () {
        actOnSelection(actions.insertRowsBefore);
      },
      mceTableInsertRowAfter: function () {
        actOnSelection(actions.insertRowsAfter);
      },
      mceTableInsertColBefore: function () {
        actOnSelection(actions.insertColumnsBefore);
      },
      mceTableInsertColAfter: function () {
        actOnSelection(actions.insertColumnsAfter);
      },
      mceTableDeleteCol: function () {
        actOnSelection(actions.deleteColumn);
      },
      mceTableDeleteRow: function () {
        actOnSelection(actions.deleteRow);
      },
      mceTableCutRow: function (grid) {
        clipboardRows.set(copyRowSelection());
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows.set(copyRowSelection());
      },
      mceTablePasteRowBefore: function (grid) {
        pasteOnSelection(actions.pasteRowsBefore);
      },
      mceTablePasteRowAfter: function (grid) {
        pasteOnSelection(actions.pasteRowsAfter);
      },
      mceTableDelete: eraseTable
    }, function (func, name) {
      editor.addCommand(name, func);
    });
    each$3({
      mceInsertTable: curry($_as86hkowjkmcwqod.open, editor),
      mceTableProps: curry($_as86hkowjkmcwqod.open, editor, true),
      mceTableRowProps: curry($_d5mbwkovjkmcwqo6.open, editor),
      mceTableCellProps: curry($_2wxau0osjkmcwqnl.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_dxen93opjkmcwqmz = { registerCommands: registerCommands };
  var only$1 = function (element) {
    var parent = Option.from(element.dom().documentElement).map(Element$$1.fromDom).getOr(element);
    return {
      parent: constant(parent),
      view: constant(element),
      origin: constant(Position(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = curry($_c80mfqnfjkmcwqdo.absolute, chrome);
    return {
      parent: constant(chrome),
      view: constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: constant(chrome),
      view: constant(editable),
      origin: constant(Position(0, 0))
    };
  };
  var $_di2oicp3jkmcwqpx = {
    only: only$1,
    detached: detached,
    body: body$1
  };
  function Event (fields) {
    var struct = Immutable.apply(null, fields);
    var handlers = [];
    var bind$$1 = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      each(handlers, function (handler) {
        handler(event);
      });
    };
    return {
      bind: bind$$1,
      unbind: unbind,
      trigger: trigger
    };
  }
  var create = function (typeDefs) {
    var registry = map$1(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = map$1(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_7sm1kkp6jkmcwqqs = { create: create };
  var mode = exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_1axsx4pajkmcwqs2 = {
    mode: mode,
    sink: sink,
    api: api$3
  };
  var styles$1 = css('ephox-dragster');
  var $_7vi2f1pcjkmcwqsm = { resolve: styles$1.resolve };
  function Blocker (options) {
    var settings = merge$1({ 'layerClass': $_7vi2f1pcjkmcwqsm.resolve('blocker') }, options);
    var div = Element$$1.fromTag('div');
    $_98tfuqm2jkmcwq3d.set(div, 'role', 'presentation');
    $_b9b72cmbjkmcwq4u.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_fk0u2o3jkmcwqjg.add(div, $_7vi2f1pcjkmcwqsm.resolve('blocker'));
    $_fk0u2o3jkmcwqjg.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_af3mfpmejkmcwq5b.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }
  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': constant(target),
      'x': constant(x),
      'y': constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = Element$$1.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_atu4x2pejkmcwqss = {
    bind: bind$1,
    capture: capture
  };
  var filter$1 = constant(true);
  var bind$2 = function (element, event, handler) {
    return $_atu4x2pejkmcwqss.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_atu4x2pejkmcwqss.capture(element, event, filter$1, handler);
  };
  var $_fe01uvpdjkmcwqsp = {
    bind: bind$2,
    capture: capture$1
  };
  var compare = function (old, nu) {
    return Position(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return Option.some(Position(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink$1 = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_fe01uvpdjkmcwqsp.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_fe01uvpdjkmcwqsp.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_fe01uvpdjkmcwqsp.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_fe01uvpdjkmcwqsp.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_504takmdjkmcwq59.append(parent, blocker.element());
    };
    var stop = function () {
      $_af3mfpmejkmcwq5b.remove(blocker.element());
    };
    return $_1axsx4pajkmcwqs2.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_1axsx4pajkmcwqs2.mode({
    compare: compare,
    extract: extract$1,
    sink: sink$1,
    mutate: mutate$1
  });
  function InDrag () {
    var previous = Option.none();
    var reset = function () {
      previous = Option.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = Option.some(nu);
      return result;
    };
    var onEvent = function (event, mode) {
      var dataOption = mode.extract(event);
      dataOption.each(function (data) {
        var offset = update(mode, data);
        offset.each(function (d) {
          events.trigger.move(d);
        });
      });
    };
    var events = $_7sm1kkp6jkmcwqqs.create({ move: Event(['info']) });
    return {
      onEvent: onEvent,
      reset: reset,
      events: events.registry
    };
  }
  function NoDrag (anchor) {
    var onEvent = function (event, mode) {
    };
    return {
      onEvent: onEvent,
      reset: noop
    };
  }
  function Movement () {
    var noDragState = NoDrag();
    var inDragState = InDrag();
    var dragState = noDragState;
    var on = function () {
      dragState.reset();
      dragState = inDragState;
    };
    var off = function () {
      dragState.reset();
      dragState = noDragState;
    };
    var onEvent = function (event, mode) {
      dragState.onEvent(event, mode);
    };
    var isOn = function () {
      return dragState === inDragState;
    };
    return {
      on: on,
      off: off,
      isOn: isOn,
      onEvent: onEvent,
      events: inDragState.events
    };
  }
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_7sm1kkp6jkmcwqqs.create({
      start: Event([]),
      stop: Event([])
    });
    var movement = Movement();
    var drop = function () {
      sink.stop();
      if (movement.isOn()) {
        movement.off();
        events.trigger.stop();
      }
    };
    var throttledDrop = last$3(drop, 200);
    var go = function (parent) {
      sink.start(parent);
      movement.on();
      events.trigger.start();
    };
    var mousemove = function (event, ui) {
      throttledDrop.cancel();
      movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
      mode.mutate(mutation, event.info());
    });
    var on = function () {
      active = true;
    };
    var off = function () {
      active = false;
    };
    var runIfActive = function (f) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (active) {
          return f.apply(null, args);
        }
      };
    };
    var sink = mode.sink($_1axsx4pajkmcwqs2.api({
      forceDrop: drop,
      drop: runIfActive(drop),
      move: runIfActive(mousemove),
      delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
      sink.destroy();
    };
    return {
      element: sink.element,
      go: go,
      on: on,
      off: off,
      destroy: destroy,
      events: events.registry
    };
  };
  var $_dlikkppfjkmcwqsw = { setup: setup };
  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_dlikkppfjkmcwqsw.setup(mutation, mode, options);
  };
  var $_58p5y5p8jkmcwqrp = { transform: transform$1 };
  function Mutation () {
    var events = $_7sm1kkp6jkmcwqqs.create({
      'drag': Event([
        'xDelta',
        'yDelta'
      ])
    });
    var mutate = function (x, y) {
      events.trigger.drag(x, y);
    };
    return {
      mutate: mutate,
      events: events.registry
    };
  }
  function BarMutation () {
    var events = $_7sm1kkp6jkmcwqqs.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = Option.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = Option.some(t);
    };
    var get = function () {
      return target;
    };
    return {
      assign: assign,
      get: get,
      mutate: delegate.mutate,
      events: events.registry
    };
  }
  var any = function (selector) {
    return $_87tdfem7jkmcwq42.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_87tdfem7jkmcwq42.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_87tdfem7jkmcwq42.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_87tdfem7jkmcwq42.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_87tdfem7jkmcwq42.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_87tdfem7jkmcwq42.closest(scope, selector, isRoot).isSome();
  };
  var $_8hvjz2pmjkmcwqtv = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };
  var resizeBarDragging = $_10r949o1jkmcwqjc.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_58p5y5p8jkmcwqrp.transform(mutation, {});
    var hoverTable = Option.none();
    var getResizer = function (element, type) {
      return Option.from($_98tfuqm2jkmcwq3d.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_67wb16ohjkmcwqlj.getInt(event.target(), 'top');
        $_b9b72cmbjkmcwq4u.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_67wb16ohjkmcwqlj.getInt(event.target(), 'left');
        $_b9b72cmbjkmcwq4u.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_67wb16ohjkmcwqlj.getInt(target, direction);
      var oldX = parseInt($_98tfuqm2jkmcwq3d.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_98tfuqm2jkmcwq3d.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_98tfuqm2jkmcwq3d.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_ax6148nxjkmcwqi0.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_98tfuqm2jkmcwq3d.set(target, 'data-initial-' + direction, parseInt($_b9b72cmbjkmcwq4u.get(target, direction), 10));
      $_fk0u2o3jkmcwqjg.add(target, resizeBarDragging);
      $_b9b72cmbjkmcwq4u.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_fe01uvpdjkmcwqsp.bind(wire.parent(), 'mousedown', function (event) {
      if ($_ax6148nxjkmcwqi0.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_ax6148nxjkmcwqi0.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_3jfu9slljkmcwq20.eq(e, wire.view());
    };
    var mouseover = $_fe01uvpdjkmcwqsp.bind(wire.view(), 'mouseover', function (event) {
      if ($_5hranzm3jkmcwq3l.name(event.target()) === 'table' || $_8hvjz2pmjkmcwqtv.closest(event.target(), 'table', isRoot)) {
        hoverTable = $_5hranzm3jkmcwq3l.name(event.target()) === 'table' ? Option.some(event.target()) : $_87tdfem7jkmcwq42.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_ax6148nxjkmcwqi0.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_d3qhw3m6jkmcwq3s.inBody(event.target())) {
        $_ax6148nxjkmcwqi0.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_ax6148nxjkmcwqi0.destroy(wire);
    };
    var refresh = function (tbl) {
      $_ax6148nxjkmcwqi0.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_7sm1kkp6jkmcwqqs.create({
      adjustHeight: Event([
        'table',
        'delta',
        'row'
      ]),
      adjustWidth: Event([
        'table',
        'delta',
        'column'
      ]),
      startAdjust: Event([])
    });
    return {
      destroy: destroy,
      refresh: refresh,
      on: resizing.on,
      off: resizing.off,
      hideBars: curry($_ax6148nxjkmcwqi0.hide, wire),
      showBars: curry($_ax6148nxjkmcwqi0.show, wire),
      events: events.registry
    };
  }
  function TableResize (wire, vdirection) {
    var hdirection = $_1daexhnejkmcwqd5.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_7sm1kkp6jkmcwqqs.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_c1phphodjkmcwqkx.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_c1phphodjkmcwqkx.adjustWidth(event.table(), delta, event.column(), vdirection);
      events.trigger.afterResize(event.table());
    });
    return {
      on: manager.on,
      off: manager.off,
      hideBars: manager.hideBars,
      showBars: manager.showBars,
      destroy: manager.destroy,
      events: events.registry
    };
  }
  var createContainer = function () {
    var container = Element$$1.fromTag('div');
    $_b9b72cmbjkmcwq4u.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_504takmdjkmcwq59.append($_d3qhw3m6jkmcwq3s.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_di2oicp3jkmcwqpx.body(getBody$1(editor), createContainer()) : $_di2oicp3jkmcwqpx.only(Element$$1.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_af3mfpmejkmcwq5b.remove(wire.parent());
    }
  };
  var $_7hh91vpnjkmcwqtx = {
    get: get$8,
    remove: remove$6
  };
  var ResizeHandler = function (editor) {
    var selectionRng = Option.none();
    var resize = Option.none();
    var wire = Option.none();
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var startW, startRawW;
    var isTable = function (elm) {
      return elm.nodeName === 'TABLE';
    };
    var getRawWidth = function (elm) {
      return editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
    };
    var lazyResize = function () {
      return resize;
    };
    var lazyWire = function () {
      return wire.getOr($_di2oicp3jkmcwqpx.only(Element$$1.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_7hh91vpnjkmcwqtx.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_29wc7uoljkmcwqmg.directionAt);
      var rawWire = $_7hh91vpnjkmcwqtx.get(editor);
      wire = Option.some(rawWire);
      if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = Option.some(editor.selection.getRng());
        });
        sz.events.beforeResize.bind(function (event) {
          var rawTable = event.table().dom();
          fireObjectResizeStart(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var rawTable = table.dom();
          removeDataStyle(table);
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          fireObjectResized(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
          editor.undoManager.add();
        });
        resize = Option.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        startW = e.width;
        startRawW = getRawWidth(targetElm);
      }
    });
    editor.on('ObjectResized', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        var table = targetElm;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          global$1.each(table.rows, function (row) {
            global$1.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          global$1.each(newCellSizes_1, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      }
    });
    return {
      lazyResize: lazyResize,
      lazyWire: lazyWire,
      destroy: destroy
    };
  };
  var none$2 = function (current) {
    return folder$1(function (n, f, m, l) {
      return n(current);
    });
  };
  var first$5 = function (current) {
    return folder$1(function (n, f, m, l) {
      return f(current);
    });
  };
  var middle$1 = function (current, target) {
    return folder$1(function (n, f, m, l) {
      return m(current, target);
    });
  };
  var last$4 = function (current) {
    return folder$1(function (n, f, m, l) {
      return l(current);
    });
  };
  var folder$1 = function (fold) {
    return { fold: fold };
  };
  var $_5k9tbfpqjkmcwqv2 = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };
  var detect$4 = function (current, isRoot) {
    return $_66sys5ldjkmcwpzo.table(current, isRoot).bind(function (table) {
      var all = $_66sys5ldjkmcwpzo.cells(table);
      var index = findIndex(all, function (x) {
        return $_3jfu9slljkmcwq20.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: constant(ind),
          all: constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_5k9tbfpqjkmcwqv2.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_5k9tbfpqjkmcwqv2.middle(current, info.all()[info.index() + 1]) : $_5k9tbfpqjkmcwqv2.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_5k9tbfpqjkmcwqv2.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_5k9tbfpqjkmcwqv2.middle(current, info.all()[info.index() - 1]) : $_5k9tbfpqjkmcwqv2.first(current);
    });
  };
  var $_8e6mbpppjkmcwquu = {
    next: next,
    prev: prev
  };
  var adt = Adt.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata$1 = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart = function (situ) {
    return situ.fold(identity, identity, identity);
  };
  var $_6serovpsjkmcwqv9 = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };
  var type$2 = Adt.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$2 = Immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return Element$$1.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_6serovpsjkmcwqv9.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_9z5e1kljjkmcwq1g.defaultView(start);
  };
  var $_6m1l5tprjkmcwqv4 = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };
  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_9z5e1kljjkmcwq1g.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return Element$$1.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_3jfu9slljkmcwq20.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_20ysy4pujkmcwqvl = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };
  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return Element$$1.fromDom(fragment);
  };
  var $_eieo73pvjkmcwqvm = { fromElements: fromElements };
  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin$1 = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$1 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return Element$$1.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: constant(rect.left),
      top: constant(rect.top),
      right: constant(rect.right),
      bottom: constant(rect.bottom),
      width: constant(rect.width),
      height: constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var getBounds$1 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_dsvnrgpwjkmcwqvr = {
    create: create$1,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    isWithin: isWithin$1,
    toString: toString
  };
  var adt$1 = Adt.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type(Element$$1.fromDom(range.startContainer), range.startOffset, Element$$1.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: cached(function () {
            return $_dsvnrgpwjkmcwqvr.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: cached(function () {
            return Option.some($_dsvnrgpwjkmcwqvr.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: cached(function () {
            return $_dsvnrgpwjkmcwqvr.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: cached(function () {
            return Option.some($_dsvnrgpwjkmcwqvr.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$1.rtl(Element$$1.fromDom(rev.endContainer), rev.endOffset, Element$$1.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$1.ltr, rng);
      });
    } else {
      return fromRange(win, adt$1.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_2u8s7apxjkmcwqw3 = {
    ltr: adt$1.ltr,
    rtl: adt$1.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };
  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y <= rect.bottom) {
        if (y < rect.top || curDeltaX > xDelta) {
          return i - 1;
        } else {
          xDelta = curDeltaX;
        }
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_95b1oq0jkmcwqwn = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };
  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_gelocgmkjkmcwq6n.get(textnode).length;
    var offset = $_95b1oq0jkmcwqwn.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = findMap(rects, function (rect) {
      return $_95b1oq0jkmcwqwn.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_av7xhwq1jkmcwqwp = { locate: locate };
  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_9z5e1kljjkmcwq1g.children(node);
    return findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_95b1oq0jkmcwqwn.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_5hranzm3jkmcwq3l.isText(node) ? $_av7xhwq1jkmcwqwp.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_93na44pzjkmcwqwi = { locate: locate$1 };
  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_9rdh12mijkmcwq6g.first : $_9rdh12mijkmcwq6g.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return Option.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_9z5e1kljjkmcwq1g.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_cravqzq2jkmcwqwu = { search: search };
  var caretPositionFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return Option.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return Option.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_93na44pzjkmcwqwi.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return Element$$1.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_cravqzq2jkmcwqwu.search(doc, elem, x);
      };
      return $_9z5e1kljjkmcwq1g.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = Element$$1.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_6m1l5tprjkmcwqv4.range(Element$$1.fromDom(rng.startContainer), rng.startOffset, Element$$1.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_f7mt3cpyjkmcwqwe = { fromPoint: fromPoint$1 };
  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_dsvnrgpwjkmcwqvr.create(win);
    var self = $_dvr0jtlfjkmcwq0n.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_6ib2l3m4jkmcwq3n.descendants(ancestor, selector));
    return filter(elements, function (elem) {
      $_dsvnrgpwjkmcwqvr.selectNodeContentsUsing(innerRange, elem);
      return $_dsvnrgpwjkmcwqvr.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    var ancestor = Element$$1.fromDom(outerRange.commonAncestorContainer);
    return $_5hranzm3jkmcwq3l.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_tycenq3jkmcwqwy = { find: find$3 };
  var beforeSpecial = function (element, offset) {
    var name = $_5hranzm3jkmcwq3l.name(element);
    if ('input' === name)
      return $_6serovpsjkmcwqv9.after(element);
    else if (!contains([
        'br',
        'img'
      ], name))
      return $_6serovpsjkmcwqv9.on(element, offset);
    else
      return offset === 0 ? $_6serovpsjkmcwqv9.before(element) : $_6serovpsjkmcwqv9.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_6serovpsjkmcwqv9.before, beforeSpecial, $_6serovpsjkmcwqv9.after);
    var finish = finishSitu.fold($_6serovpsjkmcwqv9.before, beforeSpecial, $_6serovpsjkmcwqv9.after);
    return $_6m1l5tprjkmcwqv4.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_6m1l5tprjkmcwqv4.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = Element$$1.fromDom(rng.startContainer);
        var finish = Element$$1.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_dvfksq4jkmcwqx3 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };
  var doSetNativeRange = function (win, rng) {
    Option.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_dsvnrgpwjkmcwqvr.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_tycenq3jkmcwqwy.find(win, selection, selector);
  };
  var setLegacyRtlRange = function (win, selection, start, soffset, finish, foffset) {
    selection.collapse(start.dom(), soffset);
    selection.extend(finish.dom(), foffset);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_2u8s7apxjkmcwqw3.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.setBaseAndExtent) {
          selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
        } else if (selection.extend) {
          try {
            setLegacyRtlRange(win, selection, start, soffset, finish, foffset);
          } catch (e) {
            doSetRange(win, finish, foffset, start, soffset);
          }
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_dvfksq4jkmcwqx3.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_dvfksq4jkmcwqx3.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_6m1l5tprjkmcwqv4.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_dsvnrgpwjkmcwqvr.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_dvfksq4jkmcwqx3.preprocess(selection);
    return $_2u8s7apxjkmcwqw3.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_6m1l5tprjkmcwqv4.range(Element$$1.fromDom(firstRng.startContainer), firstRng.startOffset, Element$$1.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = Element$$1.fromDom(selection.anchorNode);
    var focusNode = Element$$1.fromDom(selection.focusNode);
    return $_20ysy4pujkmcwqvl.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_6m1l5tprjkmcwqv4.range(Element$$1.fromDom(selection.anchorNode), selection.anchorOffset, Element$$1.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_dsvnrgpwjkmcwqvr.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_dsvnrgpwjkmcwqvr.selectNodeContents(win, element);
    return $_6m1l5tprjkmcwqv4.range(Element$$1.fromDom(rng.startContainer), rng.startOffset, Element$$1.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    return Option.from(win.getSelection()).filter(function (sel) {
      return sel.rangeCount > 0;
    }).bind(doGetExact);
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_6m1l5tprjkmcwqv4.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    return $_dsvnrgpwjkmcwqvr.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    return $_dsvnrgpwjkmcwqvr.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_f7mt3cpyjkmcwqwe.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    return $_dsvnrgpwjkmcwqvr.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    return $_dsvnrgpwjkmcwqvr.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    var fragment = $_eieo73pvjkmcwqvm.fromElements(elements, win.document);
    $_dsvnrgpwjkmcwqvr.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    $_dsvnrgpwjkmcwqvr.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_3jfu9slljkmcwq20.eq(start, finish) && soffset === foffset;
  };
  var $_5g8bk8ptjkmcwqvf = {
    setExact: setExact,
    getExact: getExact,
    get: get$9,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$2,
    replace: replace$1,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.VK');
  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_8e6mbpppjkmcwquu.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_8e6mbpppjkmcwquu.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_6m1l5tprjkmcwqv4.exact(cell, 0, cell, 0);
    return $_5g8bk8ptjkmcwqvf.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_6ib2l3m4jkmcwq3n.descendants(table, 'tr');
    return last(rows).bind(function (last$$1) {
      return $_87tdfem7jkmcwq42.descendant(last$$1, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold(Option.none, Option.none, function (current, next) {
      return $_9rdh12mijkmcwq6g.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_66sys5ldjkmcwpzo.table(current, isRoot).bind(function (table) {
        var targets = $_6606lumnjkmcwq6y.noMenu(current);
        editor.undoManager.transact(function () {
          actions.insertRowsAfter(table, targets);
        });
        return getNewRowCursorPosition(editor, table);
      });
    });
  };
  var rootElements = [
    'table',
    'li',
    'dl'
  ];
  var handle$1 = function (event, editor, actions, lazyWire) {
    if (event.keyCode === global$3.TAB) {
      var body_1 = getBody$1(editor);
      var isRoot_1 = function (element) {
        var name = $_5hranzm3jkmcwq3l.name(element);
        return $_3jfu9slljkmcwq20.eq(element, body_1) || contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = Element$$1.fromDom(rng.startContainer);
        $_66sys5ldjkmcwpzo.cell(start, isRoot_1).each(function (cell) {
          event.preventDefault();
          var navigation = event.shiftKey ? backward : forward;
          var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
          rng.each(function (range$$1) {
            editor.selection.setRng(range$$1);
          });
        });
      }
    }
  };
  var $_acndzupojkmcwqub = { handle: handle$1 };
  var response = Immutable('selection', 'kill');
  var $_easrp2q8jkmcwqyc = { response: response };
  var isKey = function (key) {
    return function (keycode) {
      return keycode === key;
    };
  };
  var isUp = isKey(38);
  var isDown = isKey(40);
  var isNavigation = function (keycode) {
    return keycode >= 37 && keycode <= 40;
  };
  var $_c1iwroq9jkmcwqye = {
    ltr: {
      isBackward: isKey(37),
      isForward: isKey(39)
    },
    rtl: {
      isBackward: isKey(39),
      isForward: isKey(37)
    },
    isUp: isUp,
    isDown: isDown,
    isNavigation: isNavigation
  };
  var convertToRange = function (win, selection) {
    var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, selection);
    return {
      start: constant(Element$$1.fromDom(rng.startContainer)),
      soffset: constant(rng.startOffset),
      finish: constant(Element$$1.fromDom(rng.endContainer)),
      foffset: constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: constant($_6serovpsjkmcwqv9.on(start, soffset)),
      finish: constant($_6serovpsjkmcwqv9.on(finish, foffset))
    };
  };
  var $_4yi2x6qbjkmcwqyv = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };
  var isSafari = $_8sm9ublqjkmcwq2h.detect().browser.isSafari();
  var get$10 = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return Position(x, y);
  };
  var to = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollTo(x, y);
  };
  var by = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollBy(x, y);
  };
  var setToElement$1 = function (win, element) {
    var pos = $_c80mfqnfjkmcwqdo.absolute(element);
    var doc = Element$$1.fromDom(win.document);
    to(pos.left(), pos.top(), doc);
  };
  var preserve$1 = function (doc, f) {
    var before = get$10(doc);
    f();
    var after = get$10(doc);
    if (before.top() !== after.top() || before.left() !== after.left()) {
      to(before.left(), before.top(), doc);
    }
  };
  var capture$2 = function (doc) {
    var previous = Option.none();
    var save = function () {
      previous = Option.some(get$10(doc));
    };
    var restore = function () {
      previous.each(function (p) {
        to(p.left(), p.top(), doc);
      });
    };
    save();
    return {
      save: save,
      restore: restore
    };
  };
  var intoView = function (element, alignToTop) {
    if (isSafari && isFunction(element.dom().scrollIntoViewIfNeeded)) {
      element.dom().scrollIntoViewIfNeeded(false);
    } else {
      element.dom().scrollIntoView(alignToTop);
    }
  };
  var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom().getBoundingClientRect();
    var elementBox = element.dom().getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
      intoView(element, true);
    } else if (elementBox.bottom > containerBox.bottom) {
      intoView(element, false);
    }
  };
  var scrollBarWidth = function () {
    var scrollDiv = Element$$1.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_504takmdjkmcwq59.after($_d3qhw3m6jkmcwq3s.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_af3mfpmejkmcwq5b.remove(scrollDiv);
    return w;
  };
  var $_eo5ytyqcjkmcwqz5 = {
    get: get$10,
    to: to,
    by: by,
    preserve: preserve$1,
    capture: capture$2,
    intoView: intoView,
    intoViewIfNeeded: intoViewIfNeeded,
    setToElement: setToElement$1,
    scrollBarWidth: scrollBarWidth
  };
  function WindowBridge (win) {
    var elementFromPoint = function (x, y) {
      return Element$$1.fromPoint(Element$$1.fromDom(win.document), x, y);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_6m1l5tprjkmcwqv4.exact(start, soffset, finish, foffset);
      return $_5g8bk8ptjkmcwqvf.getFirstRect(win, sel).map(function (structRect) {
        return map$1(structRect, apply);
      });
    };
    var getSelection = function () {
      return $_5g8bk8ptjkmcwqvf.get(win).map(function (exactAdt) {
        return $_4yi2x6qbjkmcwqyv.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_6m1l5tprjkmcwqv4.relative(situs.start(), situs.finish());
      return $_4yi2x6qbjkmcwqyv.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_5g8bk8ptjkmcwqvf.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: constant($_6serovpsjkmcwqv9.on(exact.start(), exact.soffset())),
          finish: constant($_6serovpsjkmcwqv9.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_5g8bk8ptjkmcwqvf.clear(win);
    };
    var selectContents = function (element) {
      $_5g8bk8ptjkmcwqvf.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_5g8bk8ptjkmcwqvf.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_5g8bk8ptjkmcwqvf.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_eo5ytyqcjkmcwqz5.get(Element$$1.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_eo5ytyqcjkmcwqz5.by(x, y, Element$$1.fromDom(win.document));
    };
    return {
      elementFromPoint: elementFromPoint,
      getRect: getRect,
      getRangedRect: getRangedRect,
      getSelection: getSelection,
      fromSitus: fromSitus,
      situsFromPoint: situsFromPoint,
      clearSelection: clearSelection,
      setSelection: setSelection,
      setRelativeSelection: setRelativeSelection,
      selectContents: selectContents,
      getInnerHeight: getInnerHeight,
      getScrollY: getScrollY,
      scrollBy: scrollBy
    };
  }
  var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
    if (!($_3jfu9slljkmcwq20.eq(start, finish) && soffset === foffset)) {
      return $_87tdfem7jkmcwq42.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_87tdfem7jkmcwq42.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return Option.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_3jfu9slljkmcwq20.eq(start, finish)) {
      return $_ae41j1mqjkmcwq7w.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return Option.some($_easrp2q8jkmcwqyc.response(Option.some($_4yi2x6qbjkmcwqyv.makeSitus(start, 0, start, $_8b7hivmjjkmcwq6j.getEnd(start))), true));
        } else {
          return Option.none();
        }
      });
    } else {
      return Option.none();
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_ae41j1mqjkmcwq7w.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_4lb7niqdjkmcwqzg = {
    sync: sync,
    detect: detect$5,
    update: update
  };
  var nu$3 = MixedBag([
    'left',
    'top',
    'right',
    'bottom'
  ], []);
  var moveDown = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() + amount,
      right: caret.right(),
      bottom: caret.bottom() + amount
    });
  };
  var moveUp = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() - amount,
      right: caret.right(),
      bottom: caret.bottom() - amount
    });
  };
  var moveBottomTo = function (caret, bottom) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: bottom - height,
      right: caret.right(),
      bottom: bottom
    });
  };
  var moveTopTo = function (caret, top) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: top,
      right: caret.right(),
      bottom: top + height
    });
  };
  var translate = function (caret, xDelta, yDelta) {
    return nu$3({
      left: caret.left() + xDelta,
      top: caret.top() + yDelta,
      right: caret.right() + xDelta,
      bottom: caret.bottom() + yDelta
    });
  };
  var getTop$1 = function (caret) {
    return caret.top();
  };
  var getBottom = function (caret) {
    return caret.bottom();
  };
  var toString$1 = function (caret) {
    return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
  };
  var $_6f928oqgjkmcwr0y = {
    nu: nu$3,
    moveUp: moveUp,
    moveDown: moveDown,
    moveBottomTo: moveBottomTo,
    moveTopTo: moveTopTo,
    getTop: getTop$1,
    getBottom: getBottom,
    translate: translate,
    toString: toString$1
  };
  var getPartialBox = function (bridge, element, offset) {
    if (offset >= 0 && offset < $_8b7hivmjjkmcwq6j.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return Option.none();
  };
  var toCaret = function (rect) {
    return $_6f928oqgjkmcwr0y.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return Option.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_5hranzm3jkmcwq3l.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_5hranzm3jkmcwq3l.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return Option.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_5hranzm3jkmcwq3l.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_5hranzm3jkmcwq3l.isText(element))
      return bridge.getRangedRect(element, 0, element, $_8b7hivmjjkmcwq6j.getEnd(element)).map(toCaret);
    else
      return Option.none();
  };
  var $_etarmqqhjkmcwr12 = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };
  var traverse = Immutable('item', 'mode');
  var backtrack = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : sidestep;
    return universe.property().parent(item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var sidestep = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    return direction.sibling(universe, item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var advance = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    var children = universe.property().children(item);
    var result = direction.first(children);
    return result.map(function (r) {
      return traverse(r, transition);
    });
  };
  var successors = [
    {
      current: backtrack,
      next: sidestep,
      fallback: Option.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: Option.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: Option.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = find(rules, function (succ) {
      return succ.current === mode;
    });
    return ruleOpt.bind(function (rule) {
      return rule.current(universe, item, direction, rule.next).orThunk(function () {
        return rule.fallback.bind(function (fb) {
          return go$1(universe, item, fb, direction);
        });
      });
    });
  };
  var $_2dd1wmqmjkmcwr2g = {
    backtrack: backtrack,
    sidestep: sidestep,
    advance: advance,
    go: go$1
  };
  var left$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().prevSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[children.length - 1]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var right$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().nextSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[0]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_ags1v3qnjkmcwr2o = {
    left: left$1,
    right: right$1
  };
  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_2dd1wmqmjkmcwr2g.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return Option.none();
      else
        return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_2dd1wmqmjkmcwr2g.sidestep, $_ags1v3qnjkmcwr2o.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_2dd1wmqmjkmcwr2g.sidestep, $_ags1v3qnjkmcwr2o.right(), isRoot);
  };
  var $_4vbbqzqljkmcwr2d = {
    left: left$2,
    right: right$2
  };
  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_4vbbqzqljkmcwr2d.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_4vbbqzqljkmcwr2d.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_ags1v3qnjkmcwr2o.left,
      right: $_ags1v3qnjkmcwr2o.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_2dd1wmqmjkmcwr2g.go(universe, item, mode, direction, _rules);
  };
  var $_7tbhqbqkjkmcwr29 = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_2dd1wmqmjkmcwr2g.backtrack,
    sidestep: $_2dd1wmqmjkmcwr2g.sidestep,
    advance: $_2dd1wmqmjkmcwr2g.advance
  };
  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_7tbhqbqkjkmcwr29.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_7tbhqbqkjkmcwr29.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_7tbhqbqkjkmcwr29.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_7tbhqbqkjkmcwr29.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_7tbhqbqkjkmcwr29.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_7tbhqbqkjkmcwr29.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_7tbhqbqkjkmcwr29.walk(universe$2, item, mode, direction, _rules);
  };
  var $_58ad9oqjjkmcwr25 = {
    gather: gather,
    before: before$3,
    after: after$4,
    seekLeft: seekLeft$1,
    seekRight: seekRight$1,
    walkers: walkers$1,
    walk: walk$1
  };
  var JUMP_SIZE = 5;
  var NUM_RETRIES = 100;
  var adt$2 = Adt.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_8rq19vm8jkmcwq44.closest(element, $_fm83ehnojkmcwqfz.isBlock).fold(constant(false), function (cell) {
      return $_etarmqqhjkmcwr12.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_6f928oqgjkmcwr0y.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_6f928oqgjkmcwr0y.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_6f928oqgjkmcwr0y.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_6f928oqgjkmcwr0y.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_6f928oqgjkmcwr0y.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_6f928oqgjkmcwr0y.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_6f928oqgjkmcwr0y.getTop,
    adjuster: adjustUp,
    move: $_6f928oqgjkmcwr0y.moveUp,
    gather: $_58ad9oqjjkmcwr25.before
  };
  var downMovement = {
    point: $_6f928oqgjkmcwr0y.getBottom,
    adjuster: adjustDown,
    move: $_6f928oqgjkmcwr0y.moveDown,
    gather: $_58ad9oqjjkmcwr25.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_5hranzm3jkmcwq3l.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return Option.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold(Option.none, function (element, offset) {
        return $_etarmqqhjkmcwr12.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold(Option.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return Option.some(caret);
        });
      }, Option.none);
    });
  };
  var ieTryDown = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
  };
  var ieTryUp = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
  };
  var checkScroll = function (movement, adjusted, bridge) {
    if (movement.point(adjusted) > bridge.getInnerHeight())
      return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return Option.some(-movement.point(adjusted));
    else
      return Option.none();
  };
  var retry = function (movement, bridge, caret) {
    var moved = movement.move(caret, JUMP_SIZE);
    var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
    return checkScroll(movement, adjusted, bridge).fold(function () {
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
    }, function (delta) {
      bridge.scrollBy(0, delta);
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
    });
  };
  var $_4tas7tqijkmcwr1a = {
    tryUp: curry(retry, upMovement),
    tryDown: curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: constant(JUMP_SIZE)
  };
  var adt$3 = Adt.generate([
    { 'none': ['message'] },
    { 'success': [] },
    { 'failedUp': ['cell'] },
    { 'failedDown': ['cell'] }
  ]);
  var isOverlapping = function (bridge, before, after) {
    var beforeBounds = bridge.getRect(before);
    var afterBounds = bridge.getRect(after);
    return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
  };
  var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
    return $_87tdfem7jkmcwq42.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_87tdfem7jkmcwq42.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_3jfu9slljkmcwq20.eq(afterCell, beforeCell)) {
          return $_cqkw3imrjkmcwq8k.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_3jfu9slljkmcwq20.eq(after, afterCell) && $_8b7hivmjjkmcwq6j.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_87tdfem7jkmcwq42.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_73t807qojkmcwr2u = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };
  var point = Immutable('element', 'offset');
  var delta = Immutable('element', 'deltaOffset');
  var range$3 = Immutable('element', 'start', 'finish');
  var points = Immutable('begin', 'end');
  var text = Immutable('element', 'text');
  var $_3iabnfqqjkmcwr3u = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };
  var inAncestor = Immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = Immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_8rq19vm8jkmcwq44.closest(element, function (elem) {
      return $_9z5e1kljjkmcwq1g.parent(elem).exists(function (parent) {
        return $_3jfu9slljkmcwq20.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_9z5e1kljjkmcwq1g.parent(element).bind(function (parent) {
      var children = $_9z5e1kljjkmcwq1g.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return findIndex(elements, curry($_3jfu9slljkmcwq20.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_9z5e1kljjkmcwq1g.parent(element).bind(function (parent) {
      var children = $_6ib2l3m4jkmcwq3n.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_87tdfem7jkmcwq42.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_6ib2l3m4jkmcwq3n.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_3tnqeaqrjkmcwr3y = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };
  var isBr = function (elem) {
    return $_5hranzm3jkmcwq3l.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_5hranzm3jkmcwq3l.isText(target) && $_gelocgmkjkmcwq6n.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_9z5e1kljjkmcwq1g.child(element, offset).filter(isBr).orThunk(function () {
      return $_9z5e1kljjkmcwq1g.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_3tnqeaqrjkmcwr3y.indexInParent(adjacent).map(function (info) {
          return $_6serovpsjkmcwqv9.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: constant(tgt),
        finish: constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_73t807qojkmcwr2u.cata(analysis, function (message) {
      return Option.none();
    }, function () {
      return Option.none();
    }, function (cell) {
      return Option.some($_3iabnfqqjkmcwr3u.point(cell, 0));
    }, function (cell) {
      return Option.some($_3iabnfqqjkmcwr3u.point(cell, $_8b7hivmjjkmcwq6j.getEnd(cell)));
    });
  };
  var $_5xd9dfqpjkmcwr36 = {
    tryBr: tryBr,
    process: process
  };
  var MAX_RETRIES = 20;
  var platform$1 = $_8sm9ublqjkmcwq2h.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_5xd9dfqpjkmcwr36.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return Option.some($_3iabnfqqjkmcwr3u.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_73t807qojkmcwr2u.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_5xd9dfqpjkmcwr36.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return Option.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_73t807qojkmcwr2u.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_73t807qojkmcwr2u.cata(analysis, function () {
        return Option.none();
      }, function () {
        return Option.some(situs);
      }, function (cell) {
        if ($_3jfu9slljkmcwq20.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_6f928oqgjkmcwr0y.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_3jfu9slljkmcwq20.eq(element, cell) && offset === $_8b7hivmjjkmcwq6j.getEnd(cell))
          return tryAgain(bridge, element, offset, $_6f928oqgjkmcwr0y.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_8b7hivmjjkmcwq6j.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_etarmqqhjkmcwr12.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_4tas7tqijkmcwr1a.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return Option.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_etarmqqhjkmcwr12.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_7iq0kjqfjkmcwr0l = { handle: handle$2 };
  var any$1 = function (predicate) {
    return $_8rq19vm8jkmcwq44.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_8rq19vm8jkmcwq44.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_8rq19vm8jkmcwq44.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_8rq19vm8jkmcwq44.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_8rq19vm8jkmcwq44.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_8rq19vm8jkmcwq44.descendant(scope, predicate).isSome();
  };
  var $_7zu0lqsjkmcwr47 = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };
  var detection = $_8sm9ublqjkmcwq2h.detect();
  var inSameTable = function (elem, table) {
    return $_7zu0lqsjkmcwr47.ancestor(elem, function (e) {
      return $_9z5e1kljjkmcwq1g.parent(e).exists(function (p) {
        return $_3jfu9slljkmcwq20.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_87tdfem7jkmcwq42.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_87tdfem7jkmcwq42.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return Option.none();
        return $_7iq0kjqfjkmcwr0l.handle(bridge, isRoot, direction).bind(function (range) {
          return $_87tdfem7jkmcwq42.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: constant(start),
              finish: constant(finish),
              range: constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return Option.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_easrp2q8jkmcwqyc.response(Option.some($_4yi2x6qbjkmcwqyv.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_87tdfem7jkmcwq42.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_87tdfem7jkmcwq42.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_6ib2l3m4jkmcwq3n.descendants(table, 'tr');
        if ($_3jfu9slljkmcwq20.eq(startRow, rows[0])) {
          return $_58ad9oqjjkmcwr25.seekLeft(table, function (element) {
            return $_9rdh12mijkmcwq6g.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_8b7hivmjjkmcwq6j.getEnd(last);
            return $_easrp2q8jkmcwqyc.response(Option.some($_4yi2x6qbjkmcwqyv.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_87tdfem7jkmcwq42.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_87tdfem7jkmcwq42.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_6ib2l3m4jkmcwq3n.descendants(table, 'tr');
        if ($_3jfu9slljkmcwq20.eq(startRow, rows[rows.length - 1])) {
          return $_58ad9oqjjkmcwr25.seekRight(table, function (element) {
            return $_9rdh12mijkmcwq6g.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_easrp2q8jkmcwqyc.response(Option.some($_4yi2x6qbjkmcwqyv.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_4lb7niqdjkmcwqzg.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_3pct3oqejkmcwqzv = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };
  var findCell = function (target, isRoot) {
    return $_87tdfem7jkmcwq42.closest(target, 'td,th', isRoot);
  };
  function MouseSelection (bridge, container, isRoot, annotations) {
    var cursor = Option.none();
    var clearState = function () {
      cursor = Option.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_ae41j1mqjkmcwq7w.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_3jfu9slljkmcwq20.eq(start, finish)) {
              annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
              bridge.selectContents(finish);
            }
          });
        });
      });
    };
    var mouseup = function () {
      cursor.each(clearState);
    };
    return {
      mousedown: mousedown,
      mouseover: mouseover,
      mouseup: mouseup
    };
  }
  var $_5ppuaaqujkmcwr4h = {
    down: {
      traverse: $_9z5e1kljjkmcwq1g.nextSibling,
      gather: $_58ad9oqjjkmcwr25.after,
      relative: $_6serovpsjkmcwqv9.before,
      otherRetry: $_4tas7tqijkmcwr1a.tryDown,
      ieRetry: $_4tas7tqijkmcwr1a.ieTryDown,
      failure: $_73t807qojkmcwr2u.adt.failedDown
    },
    up: {
      traverse: $_9z5e1kljjkmcwq1g.prevSibling,
      gather: $_58ad9oqjjkmcwr25.before,
      relative: $_6serovpsjkmcwqv9.before,
      otherRetry: $_4tas7tqijkmcwr1a.tryUp,
      ieRetry: $_4tas7tqijkmcwr1a.ieTryUp,
      failure: $_73t807qojkmcwr2u.adt.failedUp
    }
  };
  var rc = Immutable('rows', 'cols');
  var mouse = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var handlers = MouseSelection(bridge, container, isRoot, annotations);
    return {
      mousedown: handlers.mousedown,
      mouseover: handlers.mouseover,
      mouseup: handlers.mouseup
    };
  };
  var keyboard = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var clearToNavigate = function () {
      annotations.clear(container);
      return Option.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_ae41j1mqjkmcwq7w.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_c1iwroq9jkmcwqye.isDown(keycode) && shiftKey) {
          return curry($_3pct3oqejkmcwqzv.select, bridge, container, isRoot, $_5ppuaaqujkmcwr4h.down, finish, start, annotations.selectRange);
        } else if ($_c1iwroq9jkmcwqye.isUp(keycode) && shiftKey) {
          return curry($_3pct3oqejkmcwqzv.select, bridge, container, isRoot, $_5ppuaaqujkmcwr4h.up, finish, start, annotations.selectRange);
        } else if ($_c1iwroq9jkmcwqye.isDown(keycode)) {
          return curry($_3pct3oqejkmcwqzv.navigate, bridge, isRoot, $_5ppuaaqujkmcwr4h.down, finish, start, $_3pct3oqejkmcwqzv.lastDownCheck);
        } else if ($_c1iwroq9jkmcwqye.isUp(keycode)) {
          return curry($_3pct3oqejkmcwqzv.navigate, bridge, isRoot, $_5ppuaaqujkmcwr4h.up, finish, start, $_3pct3oqejkmcwqzv.firstUpCheck);
        } else {
          return Option.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = findMap(attempts, function (delta) {
              return $_4lb7niqdjkmcwqzg.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_ae41j1mqjkmcwq7w.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_c1iwroq9jkmcwqye.isDown(keycode) || direction.isForward(keycode) ? $_6serovpsjkmcwqv9.after : $_6serovpsjkmcwqv9.before;
                bridge.setRelativeSelection($_6serovpsjkmcwqv9.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_easrp2q8jkmcwqyc.response(Option.none(), true);
              });
            }, function (_) {
              return Option.some($_easrp2q8jkmcwqyc.response(Option.none(), true));
            });
          };
        };
        if ($_c1iwroq9jkmcwqye.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_c1iwroq9jkmcwqye.isUp(keycode) && shiftKey)
          return update([rc(-1, 0)]);
        else if (direction.isBackward(keycode) && shiftKey)
          return update([
            rc(0, -1),
            rc(-1, 0)
          ]);
        else if (direction.isForward(keycode) && shiftKey)
          return update([
            rc(0, +1),
            rc(+1, 0)
          ]);
        else if ($_c1iwroq9jkmcwqye.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return Option.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_ae41j1mqjkmcwq7w.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return Option.none();
        if ($_c1iwroq9jkmcwqye.isNavigation(keycode))
          return $_4lb7niqdjkmcwqzg.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return Option.none();
      }, Option.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_96xeccq7jkmcwqxz = {
    mouse: mouse,
    keyboard: keyboard
  };
  var add$3 = function (element, classes) {
    each(classes, function (x) {
      $_fk0u2o3jkmcwqjg.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    each(classes, function (x) {
      $_fk0u2o3jkmcwqjg.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    each(classes, function (x) {
      $_fk0u2o3jkmcwqjg.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return forall(classes, function (clazz) {
      return $_fk0u2o3jkmcwqjg.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return exists(classes, function (clazz) {
      return $_fk0u2o3jkmcwqjg.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$11 = function (element) {
    return $_4hy5b1o5jkmcwqji.supports(element) ? getNative(element) : $_4hy5b1o5jkmcwqji.get(element);
  };
  var $_f0p625qxjkmcwr52 = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };
  var addClass = function (clazz) {
    return function (element) {
      $_fk0u2o3jkmcwqjg.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_fk0u2o3jkmcwqjg.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_f0p625qxjkmcwr52.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_fk0u2o3jkmcwqjg.has(element, clazz);
    };
  };
  var $_8znmk4qwjkmcwr50 = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };
  var byClass = function (ephemera) {
    var addSelectionClass = $_8znmk4qwjkmcwr50.addClass(ephemera.selected());
    var removeSelectionClasses = $_8znmk4qwjkmcwr50.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_6ib2l3m4jkmcwq3n.descendants(container, ephemera.selectedSelector());
      each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      each(cells, addSelectionClass);
      $_fk0u2o3jkmcwqjg.add(start, ephemera.firstSelected());
      $_fk0u2o3jkmcwqjg.add(finish, ephemera.lastSelected());
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var byAttr = function (ephemera) {
    var removeSelectionAttributes = function (element) {
      $_98tfuqm2jkmcwq3d.remove(element, ephemera.selected());
      $_98tfuqm2jkmcwq3d.remove(element, ephemera.firstSelected());
      $_98tfuqm2jkmcwq3d.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_98tfuqm2jkmcwq3d.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_6ib2l3m4jkmcwq3n.descendants(container, ephemera.selectedSelector());
      each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      each(cells, addSelectionAttribute);
      $_98tfuqm2jkmcwq3d.set(start, ephemera.firstSelected(), '1');
      $_98tfuqm2jkmcwq3d.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_e0rdwhqvjkmcwr4p = {
    byClass: byClass,
    byAttr: byAttr
  };
  var hasInternalTarget = function (e) {
    return $_fk0u2o3jkmcwqjg.has(Element$$1.fromDom(e.target), 'ephox-snooker-resizer-bar') === false;
  };
  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = MixedBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = Option.none();
    var annotations = $_e0rdwhqvjkmcwr4p.byAttr($_44m387n2jkmcwqb8);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = getBody$1(editor);
      var isRoot = getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = Element$$1.fromDom(sel.getStart());
        var end = Element$$1.fromDom(sel.getEnd());
        var shared = $_cqkw3imrjkmcwq8k.sharedOne($_66sys5ldjkmcwpzo.table, [
          start,
          end
        ]);
        shared.fold(function () {
          annotations.clear(body);
        }, noop);
      };
      var mouseHandlers = $_96xeccq7jkmcwqxz.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_96xeccq7jkmcwqxz.keyboard(win, body, isRoot, annotations);
      var hasShiftKey = function (event) {
        return event.raw().shiftKey === true;
      };
      var handleResponse = function (event, response) {
        if (!hasShiftKey(event)) {
          return;
        }
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_6m1l5tprjkmcwqv4.relative(ns.start(), ns.finish());
          var rng = $_2u8s7apxjkmcwqw3.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_c1iwroq9jkmcwqye.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = Element$$1.fromDom(rng.startContainer);
          var end = Element$$1.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        var rng = editor.selection.getRng();
        var startContainer = Element$$1.fromDom(editor.selection.getStart());
        var start = Element$$1.fromDom(rng.startContainer);
        var end = Element$$1.fromDom(rng.endContainer);
        var direction = $_29wc7uoljkmcwqmg.directionAt(startContainer).isRtl() ? $_c1iwroq9jkmcwqye.rtl : $_c1iwroq9jkmcwqye.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var isMouseEvent = function (event) {
        return event.hasOwnProperty('x') && event.hasOwnProperty('y');
      };
      var wrapEvent = function (event) {
        var target = Element$$1.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = compose(prevent, stop);
        return {
          target: constant(target),
          x: constant(isMouseEvent(event) ? event.x : null),
          y: constant(isMouseEvent(event) ? event.y : null),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: constant(event)
        };
      };
      var isLeftMouse = function (raw) {
        return raw.button === 0;
      };
      var isLeftButtonPressed = function (raw) {
        if (raw.buttons === undefined) {
          return true;
        }
        return (raw.buttons & 1) !== 0;
      };
      var mouseDown = function (e) {
        if (isLeftMouse(e) && hasInternalTarget(e)) {
          mouseHandlers.mousedown(wrapEvent(e));
        }
      };
      var mouseOver = function (e) {
        if (isLeftButtonPressed(e) && hasInternalTarget(e)) {
          mouseHandlers.mouseover(wrapEvent(e));
        }
      };
      var mouseUp = function (e) {
        if (isLeftMouse(e) && hasInternalTarget(e)) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = Option.some(handlerStruct({
        mousedown: mouseDown,
        mouseover: mouseOver,
        mouseup: mouseUp,
        keyup: keyup,
        keydown: keydown
      }));
    });
    var destroy = function () {
      handlers.each(function (handlers) {
      });
    };
    return {
      clear: annotations.clear,
      destroy: destroy
    };
  }
  var Selections = function (editor) {
    var get = function () {
      var body = getBody$1(editor);
      return $_btnclampjkmcwq7i.retrieve(body, $_44m387n2jkmcwqb8.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_62kqdcn3jkmcwqba.none();
        } else {
          return $_62kqdcn3jkmcwqba.single(editor.selection);
        }
      }, function (cells) {
        return $_62kqdcn3jkmcwqba.multiple(cells);
      });
    };
    return { get: get };
  };
  var each$4 = global$1.each;
  var addButtons = function (editor) {
    var menuItems = [];
    each$4('inserttable tableprops deletetable | cell row column'.split(' '), function (name) {
      if (name === '|') {
        menuItems.push({ text: '-' });
      } else {
        menuItems.push(editor.menuItems[name]);
      }
    });
    editor.addButton('table', {
      type: 'menubutton',
      title: 'Table',
      menu: menuItems
    });
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    editor.addButton('tableprops', {
      title: 'Table properties',
      onclick: cmd('mceTableProps'),
      icon: 'table'
    });
    editor.addButton('tabledelete', {
      title: 'Delete table',
      onclick: cmd('mceTableDelete')
    });
    editor.addButton('tablecellprops', {
      title: 'Cell properties',
      onclick: cmd('mceTableCellProps')
    });
    editor.addButton('tablemergecells', {
      title: 'Merge cells',
      onclick: cmd('mceTableMergeCells')
    });
    editor.addButton('tablesplitcells', {
      title: 'Split cell',
      onclick: cmd('mceTableSplitCells')
    });
    editor.addButton('tableinsertrowbefore', {
      title: 'Insert row before',
      onclick: cmd('mceTableInsertRowBefore')
    });
    editor.addButton('tableinsertrowafter', {
      title: 'Insert row after',
      onclick: cmd('mceTableInsertRowAfter')
    });
    editor.addButton('tabledeleterow', {
      title: 'Delete row',
      onclick: cmd('mceTableDeleteRow')
    });
    editor.addButton('tablerowprops', {
      title: 'Row properties',
      onclick: cmd('mceTableRowProps')
    });
    editor.addButton('tablecutrow', {
      title: 'Cut row',
      onclick: cmd('mceTableCutRow')
    });
    editor.addButton('tablecopyrow', {
      title: 'Copy row',
      onclick: cmd('mceTableCopyRow')
    });
    editor.addButton('tablepasterowbefore', {
      title: 'Paste row before',
      onclick: cmd('mceTablePasteRowBefore')
    });
    editor.addButton('tablepasterowafter', {
      title: 'Paste row after',
      onclick: cmd('mceTablePasteRowAfter')
    });
    editor.addButton('tableinsertcolbefore', {
      title: 'Insert column before',
      onclick: cmd('mceTableInsertColBefore')
    });
    editor.addButton('tableinsertcolafter', {
      title: 'Insert column after',
      onclick: cmd('mceTableInsertColAfter')
    });
    editor.addButton('tabledeletecol', {
      title: 'Delete column',
      onclick: cmd('mceTableDeleteCol')
    });
  };
  var addToolbars = function (editor) {
    var isTable = function (table) {
      var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);
      return selectorMatched;
    };
    var toolbar = getToolbar(editor);
    if (toolbar.length > 0) {
      editor.addContextToolbar(isTable, toolbar.join(' '));
    }
  };
  var $_argisvqzjkmcwr5a = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };
  var addMenuItems = function (editor, selections) {
    var targets = Option.none();
    var tableCtrls = [];
    var cellCtrls = [];
    var mergeCtrls = [];
    var unmergeCtrls = [];
    var noTargetDisable = function (ctrl) {
      ctrl.disabled(true);
    };
    var ctrlEnable = function (ctrl) {
      ctrl.disabled(false);
    };
    var pushTable = function () {
      var self = this;
      tableCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushCell = function () {
      var self = this;
      cellCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushMerge = function () {
      var self = this;
      mergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.mergable().isNone());
      });
    };
    var pushUnmerge = function () {
      var self = this;
      unmergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.unmergable().isNone());
      });
    };
    var setDisabledCtrls = function () {
      targets.fold(function () {
        each(tableCtrls, noTargetDisable);
        each(cellCtrls, noTargetDisable);
        each(mergeCtrls, noTargetDisable);
        each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        each(tableCtrls, ctrlEnable);
        each(cellCtrls, ctrlEnable);
        each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = Element$$1.fromDom(cellDom);
          var table = $_66sys5ldjkmcwpzo.table(cell);
          return table.map(function (table) {
            return $_6606lumnjkmcwq6y.forMenu(selections, table, cell);
          });
        });
        setDisabledCtrls();
      });
    });
    var generateTableGrid = function () {
      var html = '';
      html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
      for (var y = 0; y < 10; y++) {
        html += '<tr>';
        for (var x = 0; x < 10; x++) {
          html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' + 'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '<div class="mce-text-center" role="presentation">1 x 1</div>';
      return html;
    };
    var selectGrid = function (editor, tx, ty, control) {
      var table = control.getEl().getElementsByTagName('table')[0];
      var x, y, focusCell, cell, active;
      var rtl = control.isRtl() || control.parent().rel === 'tl-tr';
      table.nextSibling.innerHTML = tx + 1 + ' x ' + (ty + 1);
      if (rtl) {
        tx = 9 - tx;
      }
      for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
          cell = table.rows[y].childNodes[x].firstChild;
          active = (rtl ? x >= tx : x <= tx) && y <= ty;
          editor.dom.toggleClass(cell, 'mce-active', active);
          if (active) {
            focusCell = cell;
          }
        }
      }
      return focusCell.parentNode;
    };
    var insertTable = hasTableGrid(editor) === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: cmd('mceInsertTable')
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          editor.execCommand('mceInsertTable');
        }
      },
      onshow: function () {
        selectGrid(editor, 0, 0, this.menu.items()[0]);
      },
      onhide: function () {
        var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
        editor.dom.removeClass(elements, 'mce-active');
        editor.dom.addClass(elements[0], 'mce-active');
      },
      menu: [{
          type: 'container',
          html: generateTableGrid(),
          onPostRender: function () {
            this.lastX = this.lastY = 0;
          },
          onmousemove: function (e) {
            var target = e.target;
            var x, y;
            if (target.tagName.toUpperCase() === 'A') {
              x = parseInt(target.getAttribute('data-mce-x'), 10);
              y = parseInt(target.getAttribute('data-mce-y'), 10);
              if (this.isRtl() || this.parent().rel === 'tl-tr') {
                x = 9 - x;
              }
              if (x !== this.lastX || y !== this.lastY) {
                selectGrid(editor, x, y, e.control);
                this.lastX = x;
                this.lastY = y;
              }
            }
          },
          onclick: function (e) {
            var self = this;
            if (e.target.tagName.toUpperCase() === 'A') {
              e.preventDefault();
              e.stopPropagation();
              self.parent().cancel();
              editor.undoManager.transact(function () {
                $_37y5yboyjkmcwqos.insert(editor, self.lastX + 1, self.lastY + 1);
              });
              editor.addVisual();
            }
          }
        }]
    };
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    var tableProperties = {
      text: 'Table properties',
      context: 'table',
      onPostRender: pushTable,
      onclick: cmd('mceTableProps')
    };
    var deleteTable = {
      text: 'Delete table',
      context: 'table',
      onPostRender: pushTable,
      cmd: 'mceTableDelete'
    };
    var row = {
      text: 'Row',
      context: 'table',
      menu: [
        {
          text: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete row',
          onclick: cmd('mceTableDeleteRow'),
          onPostRender: pushCell
        },
        {
          text: 'Row properties',
          onclick: cmd('mceTableRowProps'),
          onPostRender: pushCell
        },
        { text: '-' },
        {
          text: 'Cut row',
          onclick: cmd('mceTableCutRow'),
          onPostRender: pushCell
        },
        {
          text: 'Copy row',
          onclick: cmd('mceTableCopyRow'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter'),
          onPostRender: pushCell
        }
      ]
    };
    var column = {
      text: 'Column',
      context: 'table',
      menu: [
        {
          text: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete column',
          onclick: cmd('mceTableDeleteCol'),
          onPostRender: pushCell
        }
      ]
    };
    var cell = {
      separator: 'before',
      text: 'Cell',
      context: 'table',
      menu: [
        {
          text: 'Cell properties',
          onclick: cmd('mceTableCellProps'),
          onPostRender: pushCell
        },
        {
          text: 'Merge cells',
          onclick: cmd('mceTableMergeCells'),
          onPostRender: pushMerge
        },
        {
          text: 'Split cell',
          onclick: cmd('mceTableSplitCells'),
          onPostRender: pushUnmerge
        }
      ]
    };
    editor.addMenuItem('inserttable', insertTable);
    editor.addMenuItem('tableprops', tableProperties);
    editor.addMenuItem('deletetable', deleteTable);
    editor.addMenuItem('row', row);
    editor.addMenuItem('column', column);
    editor.addMenuItem('cell', cell);
  };
  var $_e5e3ybr0jkmcwr5d = { addMenuItems: addMenuItems };
  var getClipboardRows = function (clipboardRows) {
    return clipboardRows.get().fold(function () {
      return;
    }, function (rows) {
      return map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows, clipboardRows) {
    var sugarRows = map(rows, Element$$1.fromDom);
    clipboardRows.set(Option.from(sugarRows));
  };
  var getApi = function (editor, clipboardRows) {
    return {
      insertTable: function (columns, rows) {
        return $_37y5yboyjkmcwqos.insert(editor, columns, rows);
      },
      setClipboardRows: function (rows) {
        return setClipboardRows(rows, clipboardRows);
      },
      getClipboardRows: function () {
        return getClipboardRows(clipboardRows);
      }
    };
  };
  function Plugin(editor) {
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    var clipboardRows = Cell(Option.none());
    $_dxen93opjkmcwqmz.registerCommands(editor, actions, cellSelection, selections, clipboardRows);
    $_7y3gnul0jkmcwpxc.registerEvents(editor, selections, actions, cellSelection);
    $_e5e3ybr0jkmcwr5d.addMenuItems(editor, selections);
    $_argisvqzjkmcwr5a.addButtons(editor);
    $_argisvqzjkmcwr5a.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_44m387n2jkmcwqb8.firstSelected());
      editor.serializer.addTempAttr($_44m387n2jkmcwqb8.lastSelected());
    });
    if (hasTabNavigation(editor)) {
      editor.on('keydown', function (e) {
        $_acndzupojkmcwqub.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    return getApi(editor, clipboardRows);
  }
  global.add('table', Plugin);
  function Plugin$1 () {
  }
  return Plugin$1;
}());
})();
(function () {
var textcolor = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var getCurrentColor = function (editor, format) {
    var color;
    editor.dom.getParents(editor.selection.getStart(), function (elm) {
      var value;
      if (value = elm.style[format === 'forecolor' ? 'color' : 'background-color']) {
        color = value;
      }
    });
    return color;
  };
  var mapColors = function (colorMap) {
    var i;
    var colors = [];
    for (i = 0; i < colorMap.length; i += 2) {
      colors.push({
        text: colorMap[i + 1],
        color: '#' + colorMap[i]
      });
    }
    return colors;
  };
  var applyFormat = function (editor, format, value) {
    editor.undoManager.transact(function () {
      editor.focus();
      editor.formatter.apply(format, { value: value });
      editor.nodeChanged();
    });
  };
  var removeFormat = function (editor, format) {
    editor.undoManager.transact(function () {
      editor.focus();
      editor.formatter.remove(format, { value: null }, null, true);
      editor.nodeChanged();
    });
  };
  var $_fyfrxgrijkmcws5a = {
    getCurrentColor: getCurrentColor,
    mapColors: mapColors,
    applyFormat: applyFormat,
    removeFormat: removeFormat
  };
  var register = function (editor) {
    editor.addCommand('mceApplyTextcolor', function (format, value) {
      $_fyfrxgrijkmcws5a.applyFormat(editor, format, value);
    });
    editor.addCommand('mceRemoveTextcolor', function (format) {
      $_fyfrxgrijkmcws5a.removeFormat(editor, format);
    });
  };
  var $_fr9cbdrhjkmcws58 = { register: register };
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var defaultColorMap = [
    '000000',
    'Black',
    '993300',
    'Burnt orange',
    '333300',
    'Dark olive',
    '003300',
    'Dark green',
    '003366',
    'Dark azure',
    '000080',
    'Navy Blue',
    '333399',
    'Indigo',
    '333333',
    'Very dark gray',
    '800000',
    'Maroon',
    'FF6600',
    'Orange',
    '808000',
    'Olive',
    '008000',
    'Green',
    '008080',
    'Teal',
    '0000FF',
    'Blue',
    '666699',
    'Grayish blue',
    '808080',
    'Gray',
    'FF0000',
    'Red',
    'FF9900',
    'Amber',
    '99CC00',
    'Yellow green',
    '339966',
    'Sea green',
    '33CCCC',
    'Turquoise',
    '3366FF',
    'Royal blue',
    '800080',
    'Purple',
    '999999',
    'Medium gray',
    'FF00FF',
    'Magenta',
    'FFCC00',
    'Gold',
    'FFFF00',
    'Yellow',
    '00FF00',
    'Lime',
    '00FFFF',
    'Aqua',
    '00CCFF',
    'Sky blue',
    '993366',
    'Red violet',
    'FFFFFF',
    'White',
    'FF99CC',
    'Pink',
    'FFCC99',
    'Peach',
    'FFFF99',
    'Light yellow',
    'CCFFCC',
    'Pale green',
    'CCFFFF',
    'Pale cyan',
    '99CCFF',
    'Light sky blue',
    'CC99FF',
    'Plum'
  ];
  var getTextColorMap = function (editor) {
    return editor.getParam('textcolor_map', defaultColorMap);
  };
  var getForeColorMap = function (editor) {
    return editor.getParam('forecolor_map', getTextColorMap(editor));
  };
  var getBackColorMap = function (editor) {
    return editor.getParam('backcolor_map', getTextColorMap(editor));
  };
  var getTextColorRows = function (editor) {
    return editor.getParam('textcolor_rows', 5);
  };
  var getTextColorCols = function (editor) {
    return editor.getParam('textcolor_cols', 8);
  };
  var getForeColorRows = function (editor) {
    return editor.getParam('forecolor_rows', getTextColorRows(editor));
  };
  var getBackColorRows = function (editor) {
    return editor.getParam('backcolor_rows', getTextColorRows(editor));
  };
  var getForeColorCols = function (editor) {
    return editor.getParam('forecolor_cols', getTextColorCols(editor));
  };
  var getBackColorCols = function (editor) {
    return editor.getParam('backcolor_cols', getTextColorCols(editor));
  };
  var getColorPickerCallback = function (editor) {
    return editor.getParam('color_picker_callback', null);
  };
  var hasColorPicker = function (editor) {
    return typeof getColorPickerCallback(editor) === 'function';
  };
  var $_9xkreprmjkmcws5h = {
    getForeColorMap: getForeColorMap,
    getBackColorMap: getBackColorMap,
    getForeColorRows: getForeColorRows,
    getBackColorRows: getBackColorRows,
    getForeColorCols: getForeColorCols,
    getBackColorCols: getBackColorCols,
    getColorPickerCallback: getColorPickerCallback,
    hasColorPicker: hasColorPicker
  };
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.I18n');
  var getHtml = function (cols, rows, colorMap, hasColorPicker) {
    var colors, color, html, last, x, y, i, count = 0;
    var id = global$1.DOM.uniqueId('mcearia');
    var getColorCellHtml = function (color, title) {
      var isNoColor = color === 'transparent';
      return '<td class="mce-grid-cell' + (isNoColor ? ' mce-colorbtn-trans' : '') + '">' + '<div id="' + id + '-' + count++ + '"' + ' data-mce-color="' + (color ? color : '') + '"' + ' role="option"' + ' tabIndex="-1"' + ' style="' + (color ? 'background-color: ' + color : '') + '"' + ' title="' + global$3.translate(title) + '">' + (isNoColor ? '&#215;' : '') + '</div>' + '</td>';
    };
    colors = $_fyfrxgrijkmcws5a.mapColors(colorMap);
    colors.push({
      text: global$3.translate('No color'),
      color: 'transparent'
    });
    html = '<table class="mce-grid mce-grid-border mce-colorbutton-grid" role="list" cellspacing="0"><tbody>';
    last = colors.length - 1;
    for (y = 0; y < rows; y++) {
      html += '<tr>';
      for (x = 0; x < cols; x++) {
        i = y * cols + x;
        if (i > last) {
          html += '<td></td>';
        } else {
          color = colors[i];
          html += getColorCellHtml(color.color, color.text);
        }
      }
      html += '</tr>';
    }
    if (hasColorPicker) {
      html += '<tr>' + '<td colspan="' + cols + '" class="mce-custom-color-btn">' + '<div id="' + id + '-c" class="mce-widget mce-btn mce-btn-small mce-btn-flat" ' + 'role="button" tabindex="-1" aria-labelledby="' + id + '-c" style="width: 100%">' + '<button type="button" role="presentation" tabindex="-1">' + global$3.translate('Custom...') + '</button>' + '</div>' + '</td>' + '</tr>';
      html += '<tr>';
      for (x = 0; x < cols; x++) {
        html += getColorCellHtml('', 'Custom color');
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  };
  var $_4vmnmvrnjkmcws5o = { getHtml: getHtml };
  var setDivColor = function setDivColor(div, value) {
    div.style.background = value;
    div.setAttribute('data-mce-color', value);
  };
  var onButtonClick = function (editor) {
    return function (e) {
      var ctrl = e.control;
      if (ctrl._color) {
        editor.execCommand('mceApplyTextcolor', ctrl.settings.format, ctrl._color);
      } else {
        editor.execCommand('mceRemoveTextcolor', ctrl.settings.format);
      }
    };
  };
  var onPanelClick = function (editor, cols) {
    return function (e) {
      var buttonCtrl = this.parent();
      var value;
      var currentColor = $_fyfrxgrijkmcws5a.getCurrentColor(editor, buttonCtrl.settings.format);
      var selectColor = function (value) {
        editor.execCommand('mceApplyTextcolor', buttonCtrl.settings.format, value);
        buttonCtrl.hidePanel();
        buttonCtrl.color(value);
      };
      var resetColor = function () {
        editor.execCommand('mceRemoveTextcolor', buttonCtrl.settings.format);
        buttonCtrl.hidePanel();
        buttonCtrl.resetColor();
      };
      if (global$1.DOM.getParent(e.target, '.mce-custom-color-btn')) {
        buttonCtrl.hidePanel();
        var colorPickerCallback = $_9xkreprmjkmcws5h.getColorPickerCallback(editor);
        colorPickerCallback.call(editor, function (value) {
          var tableElm = buttonCtrl.panel.getEl().getElementsByTagName('table')[0];
          var customColorCells, div, i;
          customColorCells = global$2.map(tableElm.rows[tableElm.rows.length - 1].childNodes, function (elm) {
            return elm.firstChild;
          });
          for (i = 0; i < customColorCells.length; i++) {
            div = customColorCells[i];
            if (!div.getAttribute('data-mce-color')) {
              break;
            }
          }
          if (i === cols) {
            for (i = 0; i < cols - 1; i++) {
              setDivColor(customColorCells[i], customColorCells[i + 1].getAttribute('data-mce-color'));
            }
          }
          setDivColor(div, value);
          selectColor(value);
        }, currentColor);
      }
      value = e.target.getAttribute('data-mce-color');
      if (value) {
        if (this.lastId) {
          global$1.DOM.get(this.lastId).setAttribute('aria-selected', 'false');
        }
        e.target.setAttribute('aria-selected', true);
        this.lastId = e.target.id;
        if (value === 'transparent') {
          resetColor();
        } else {
          selectColor(value);
        }
      } else if (value !== null) {
        buttonCtrl.hidePanel();
      }
    };
  };
  var renderColorPicker = function (editor, foreColor) {
    return function () {
      var cols = foreColor ? $_9xkreprmjkmcws5h.getForeColorCols(editor) : $_9xkreprmjkmcws5h.getBackColorCols(editor);
      var rows = foreColor ? $_9xkreprmjkmcws5h.getForeColorRows(editor) : $_9xkreprmjkmcws5h.getBackColorRows(editor);
      var colorMap = foreColor ? $_9xkreprmjkmcws5h.getForeColorMap(editor) : $_9xkreprmjkmcws5h.getBackColorMap(editor);
      var hasColorPicker = $_9xkreprmjkmcws5h.hasColorPicker(editor);
      return $_4vmnmvrnjkmcws5o.getHtml(cols, rows, colorMap, hasColorPicker);
    };
  };
  var register$1 = function (editor) {
    editor.addButton('forecolor', {
      type: 'colorbutton',
      tooltip: 'Text color',
      format: 'forecolor',
      panel: {
        role: 'application',
        ariaRemember: true,
        html: renderColorPicker(editor, true),
        onclick: onPanelClick(editor, $_9xkreprmjkmcws5h.getForeColorCols(editor))
      },
      onclick: onButtonClick(editor)
    });
    editor.addButton('backcolor', {
      type: 'colorbutton',
      tooltip: 'Background color',
      format: 'hilitecolor',
      panel: {
        role: 'application',
        ariaRemember: true,
        html: renderColorPicker(editor, false),
        onclick: onPanelClick(editor, $_9xkreprmjkmcws5h.getBackColorCols(editor))
      },
      onclick: onButtonClick(editor)
    });
  };
  var $_38ipxvrjjkmcws5c = { register: register$1 };
  global.add('textcolor', function (editor) {
    $_fr9cbdrhjkmcws58.register(editor);
    $_38ipxvrjjkmcws5c.register(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var toc = (function () {
  'use strict';
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
  var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');
  var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  var getTocClass = function (editor) {
    return editor.getParam('toc_class', 'mce-toc');
  };
  var getTocHeader = function (editor) {
    var tagName = editor.getParam('toc_header', 'h2');
    return /^h[1-6]$/.test(tagName) ? tagName : 'h2';
  };
  var getTocDepth = function (editor) {
    var depth = parseInt(editor.getParam('toc_depth', '3'), 10);
    return depth >= 1 && depth <= 9 ? depth : 3;
  };
  var $_7vx431sajkmcws8w = {
    getTocClass: getTocClass,
    getTocHeader: getTocHeader,
    getTocDepth: getTocDepth
  };
  var create = function (prefix) {
    var counter = 0;
    return function () {
      var guid = new Date().getTime().toString(32);
      return prefix + guid + (counter++).toString(32);
    };
  };
  var $_2iqtzbsbjkmcws8x = { create: create };
  var tocId = $_2iqtzbsbjkmcws8x.create('mcetoc_');
  var generateSelector = function generateSelector(depth) {
    var i;
    var selector = [];
    for (i = 1; i <= depth; i++) {
      selector.push('h' + i);
    }
    return selector.join(',');
  };
  var hasHeaders = function (editor) {
    return readHeaders(editor).length > 0;
  };
  var readHeaders = function (editor) {
    var tocClass = $_7vx431sajkmcws8w.getTocClass(editor);
    var headerTag = $_7vx431sajkmcws8w.getTocHeader(editor);
    var selector = generateSelector($_7vx431sajkmcws8w.getTocDepth(editor));
    var headers = editor.$(selector);
    if (headers.length && /^h[1-9]$/i.test(headerTag)) {
      headers = headers.filter(function (i, el) {
        return !editor.dom.hasClass(el.parentNode, tocClass);
      });
    }
    return global$3.map(headers, function (h) {
      return {
        id: h.id ? h.id : tocId(),
        level: parseInt(h.nodeName.replace(/^H/i, ''), 10),
        title: editor.$.text(h),
        element: h
      };
    });
  };
  var getMinLevel = function (headers) {
    var i, minLevel = 9;
    for (i = 0; i < headers.length; i++) {
      if (headers[i].level < minLevel) {
        minLevel = headers[i].level;
      }
      if (minLevel === 1) {
        return minLevel;
      }
    }
    return minLevel;
  };
  var generateTitle = function (tag, title) {
    var openTag = '<' + tag + ' contenteditable="true">';
    var closeTag = '</' + tag + '>';
    return openTag + global$1.DOM.encode(title) + closeTag;
  };
  var generateTocHtml = function (editor) {
    var html = generateTocContentHtml(editor);
    return '<div class="' + editor.dom.encode($_7vx431sajkmcws8w.getTocClass(editor)) + '" contenteditable="false">' + html + '</div>';
  };
  var generateTocContentHtml = function (editor) {
    var html = '';
    var headers = readHeaders(editor);
    var prevLevel = getMinLevel(headers) - 1;
    var i, ii, h, nextLevel;
    if (!headers.length) {
      return '';
    }
    html += generateTitle($_7vx431sajkmcws8w.getTocHeader(editor), global$2.translate('Table of Contents'));
    for (i = 0; i < headers.length; i++) {
      h = headers[i];
      h.element.id = h.id;
      nextLevel = headers[i + 1] && headers[i + 1].level;
      if (prevLevel === h.level) {
        html += '<li>';
      } else {
        for (ii = prevLevel; ii < h.level; ii++) {
          html += '<ul><li>';
        }
      }
      html += '<a href="#' + h.id + '">' + h.title + '</a>';
      if (nextLevel === h.level || !nextLevel) {
        html += '</li>';
        if (!nextLevel) {
          html += '</ul>';
        }
      } else {
        for (ii = h.level; ii > nextLevel; ii--) {
          html += '</li></ul><li>';
        }
      }
      prevLevel = h.level;
    }
    return html;
  };
  var isEmptyOrOffscren = function (editor, nodes) {
    return !nodes.length || editor.dom.getParents(nodes[0], '.mce-offscreen-selection').length > 0;
  };
  var insertToc = function (editor) {
    var tocClass = $_7vx431sajkmcws8w.getTocClass(editor);
    var $tocElm = editor.$('.' + tocClass);
    if (isEmptyOrOffscren(editor, $tocElm)) {
      editor.insertContent(generateTocHtml(editor));
    } else {
      updateToc(editor);
    }
  };
  var updateToc = function (editor) {
    var tocClass = $_7vx431sajkmcws8w.getTocClass(editor);
    var $tocElm = editor.$('.' + tocClass);
    if ($tocElm.length) {
      editor.undoManager.transact(function () {
        $tocElm.html(generateTocContentHtml(editor));
      });
    }
  };
  var $_1dj9nrs6jkmcws8q = {
    hasHeaders: hasHeaders,
    insertToc: insertToc,
    updateToc: updateToc
  };
  var register = function (editor) {
    editor.addCommand('mceInsertToc', function () {
      $_1dj9nrs6jkmcws8q.insertToc(editor);
    });
    editor.addCommand('mceUpdateToc', function () {
      $_1dj9nrs6jkmcws8q.updateToc(editor);
    });
  };
  var $_f9555ys5jkmcws8o = { register: register };
  var setup = function (editor) {
    var $ = editor.$, tocClass = $_7vx431sajkmcws8w.getTocClass(editor);
    editor.on('PreProcess', function (e) {
      var $tocElm = $('.' + tocClass, e.node);
      if ($tocElm.length) {
        $tocElm.removeAttr('contentEditable');
        $tocElm.find('[contenteditable]').removeAttr('contentEditable');
      }
    });
    editor.on('SetContent', function () {
      var $tocElm = $('.' + tocClass);
      if ($tocElm.length) {
        $tocElm.attr('contentEditable', false);
        $tocElm.children(':first-child').attr('contentEditable', true);
      }
    });
  };
  var $_bxhthfscjkmcws8y = { setup: setup };
  var toggleState = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('LoadContent SetContent change', function () {
        ctrl.disabled(editor.readonly || !$_1dj9nrs6jkmcws8q.hasHeaders(editor));
      });
    };
  };
  var isToc = function (editor) {
    return function (elm) {
      return elm && editor.dom.is(elm, '.' + $_7vx431sajkmcws8w.getTocClass(editor)) && editor.getBody().contains(elm);
    };
  };
  var register$1 = function (editor) {
    editor.addButton('toc', {
      tooltip: 'Table of Contents',
      cmd: 'mceInsertToc',
      icon: 'toc',
      onPostRender: toggleState(editor)
    });
    editor.addButton('tocupdate', {
      tooltip: 'Update',
      cmd: 'mceUpdateToc',
      icon: 'reload'
    });
    editor.addMenuItem('toc', {
      text: 'Table of Contents',
      context: 'insert',
      cmd: 'mceInsertToc',
      onPostRender: toggleState(editor)
    });
    editor.addContextToolbar(isToc(editor), 'tocupdate');
  };
  var $_5n5bxlsdjkmcws8z = { register: register$1 };
  global.add('toc', function (editor) {
    $_f9555ys5jkmcws8o.register(editor);
    $_5n5bxlsdjkmcws8z.register(editor);
    $_bxhthfscjkmcws8y.setup(editor);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
(function () {
var visualchars = (function () {
  'use strict';
  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };
  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var get = function (toggleState) {
    var isEnabled = function () {
      return toggleState.get();
    };
    return { isEnabled: isEnabled };
  };
  var $_9mm6m1stjkmcwsag = { get: get };
  var fireVisualChars = function (editor, state) {
    return editor.fire('VisualChars', { state: state });
  };
  var $_1amvi1swjkmcwsak = { fireVisualChars: fireVisualChars };
  var charMap = {
    '\xA0': 'nbsp',
    '\xAD': 'shy'
  };
  var charMapToRegExp = function (charMap, global) {
    var key, regExp = '';
    for (key in charMap) {
      regExp += key;
    }
    return new RegExp('[' + regExp + ']', global ? 'g' : '');
  };
  var charMapToSelector = function (charMap) {
    var key, selector = '';
    for (key in charMap) {
      if (selector) {
        selector += ',';
      }
      selector += 'span.mce-' + charMap[key];
    }
    return selector;
  };
  var $_dey8tosyjkmcwsas = {
    charMap: charMap,
    regExp: charMapToRegExp(charMap),
    regExpGlobal: charMapToRegExp(charMap, true),
    selector: charMapToSelector(charMap),
    charMapToRegExp: charMapToRegExp,
    charMapToSelector: charMapToSelector
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var never = constant(false);
  var always = constant(true);
  var never$1 = never;
  var always$1 = always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call$$1 = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop$$1 = function () {
    };
    var nul = function () {
      return null;
    };
    var undef = function () {
      return undefined;
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call$$1,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      getOrNull: nul,
      getOrUndefined: undef,
      or: id,
      orThunk: call$$1,
      map: none,
      ap: none,
      each: noop$$1,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };
  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var isFunction = isType('function');
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var slice = Array.prototype.slice;
  var from$1 = isFunction(Array.from) ? Array.from : function (x) {
    return slice.call(x);
  };
  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: constant(node) };
  };
  var fromPoint = function (docElm, x, y) {
    var doc = docElm.dom();
    return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
  };
  var Element$$1 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };
  var $_488suct7jkmcwsbz = {
    ATTRIBUTE: Node.ATTRIBUTE_NODE,
    CDATA_SECTION: Node.CDATA_SECTION_NODE,
    COMMENT: Node.COMMENT_NODE,
    DOCUMENT: Node.DOCUMENT_NODE,
    DOCUMENT_TYPE: Node.DOCUMENT_TYPE_NODE,
    DOCUMENT_FRAGMENT: Node.DOCUMENT_FRAGMENT_NODE,
    ELEMENT: Node.ELEMENT_NODE,
    TEXT: Node.TEXT_NODE,
    PROCESSING_INSTRUCTION: Node.PROCESSING_INSTRUCTION_NODE,
    ENTITY_REFERENCE: Node.ENTITY_REFERENCE_NODE,
    ENTITY: Node.ENTITY_NODE,
    NOTATION: Node.NOTATION_NODE
  };
  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_488suct7jkmcwsbz.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_488suct7jkmcwsbz.ELEMENT);
  var isText = isType$1($_488suct7jkmcwsbz.TEXT);
  var isDocument = isType$1($_488suct7jkmcwsbz.DOCUMENT);
  var $_fswyn1t6jkmcwsby = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };
  var wrapCharWithSpan = function (value) {
    return '<span data-mce-bogus="1" class="mce-' + $_dey8tosyjkmcwsas.charMap[value] + '">' + value + '</span>';
  };
  var $_2nl12ut8jkmcwsc8 = { wrapCharWithSpan: wrapCharWithSpan };
  var isMatch = function (n) {
    return $_fswyn1t6jkmcwsby.isText(n) && $_fswyn1t6jkmcwsby.value(n) !== undefined && $_dey8tosyjkmcwsas.regExp.test($_fswyn1t6jkmcwsby.value(n));
  };
  var filterDescendants = function (scope, predicate) {
    var result = [];
    var dom = scope.dom();
    var children = map(dom.childNodes, Element$$1.fromDom);
    each(children, function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(filterDescendants(x, predicate));
    });
    return result;
  };
  var findParentElm = function (elm, rootElm) {
    while (elm.parentNode) {
      if (elm.parentNode === rootElm) {
        return elm;
      }
      elm = elm.parentNode;
    }
  };
  var replaceWithSpans = function (html) {
    return html.replace($_dey8tosyjkmcwsas.regExpGlobal, $_2nl12ut8jkmcwsc8.wrapCharWithSpan);
  };
  var $_cwpoydszjkmcwsau = {
    isMatch: isMatch,
    filterDescendants: filterDescendants,
    findParentElm: findParentElm,
    replaceWithSpans: replaceWithSpans
  };
  var show = function (editor, rootElm) {
    var node, div;
    var nodeList = $_cwpoydszjkmcwsau.filterDescendants(Element$$1.fromDom(rootElm), $_cwpoydszjkmcwsau.isMatch);
    each(nodeList, function (n) {
      var withSpans = $_cwpoydszjkmcwsau.replaceWithSpans($_fswyn1t6jkmcwsby.value(n));
      div = editor.dom.create('div', null, withSpans);
      while (node = div.lastChild) {
        editor.dom.insertAfter(node, n.dom());
      }
      editor.dom.remove(n.dom());
    });
  };
  var hide = function (editor, body) {
    var nodeList = editor.dom.select($_dey8tosyjkmcwsas.selector, body);
    each(nodeList, function (node) {
      editor.dom.remove(node, 1);
    });
  };
  var toggle = function (editor) {
    var body = editor.getBody();
    var bookmark = editor.selection.getBookmark();
    var parentNode = $_cwpoydszjkmcwsau.findParentElm(editor.selection.getNode(), body);
    parentNode = parentNode !== undefined ? parentNode : body;
    hide(editor, parentNode);
    show(editor, parentNode);
    editor.selection.moveToBookmark(bookmark);
  };
  var $_cqqknmsxjkmcwsal = {
    show: show,
    hide: hide,
    toggle: toggle
  };
  var toggleVisualChars = function (editor, toggleState) {
    var body = editor.getBody();
    var selection = editor.selection;
    var bookmark;
    toggleState.set(!toggleState.get());
    $_1amvi1swjkmcwsak.fireVisualChars(editor, toggleState.get());
    bookmark = selection.getBookmark();
    if (toggleState.get() === true) {
      $_cqqknmsxjkmcwsal.show(editor, body);
    } else {
      $_cqqknmsxjkmcwsal.hide(editor, body);
    }
    selection.moveToBookmark(bookmark);
  };
  var $_6jbw14svjkmcwsaj = { toggleVisualChars: toggleVisualChars };
  var register = function (editor, toggleState) {
    editor.addCommand('mceVisualChars', function () {
      $_6jbw14svjkmcwsaj.toggleVisualChars(editor, toggleState);
    });
  };
  var $_d384o2sujkmcwsai = { register: register };
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');
  var setup = function (editor, toggleState) {
    var debouncedToggle = global$1.debounce(function () {
      $_cqqknmsxjkmcwsal.toggle(editor);
    }, 300);
    if (editor.settings.forced_root_block !== false) {
      editor.on('keydown', function (e) {
        if (toggleState.get() === true) {
          e.keyCode === 13 ? $_cqqknmsxjkmcwsal.toggle(editor) : debouncedToggle();
        }
      });
    }
  };
  var $_9nthojt9jkmcwsca = { setup: setup };
  var toggleActiveState = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('VisualChars', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('visualchars', {
      active: false,
      title: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor)
    });
    editor.addMenuItem('visualchars', {
      text: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };
  global.add('visualchars', function (editor) {
    var toggleState = Cell(false);
    $_d384o2sujkmcwsai.register(editor, toggleState);
    register$1(editor);
    $_9nthojt9jkmcwsca.setup(editor, toggleState);
    return $_9mm6m1stjkmcwsag.get(toggleState);
  });
  function Plugin () {
  }
  return Plugin;
}());
})();
