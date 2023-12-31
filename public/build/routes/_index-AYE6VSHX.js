import {
  tailwind_default
} from "/build/_shared/chunk-ONYGZ6UJ.js";
import {
  init_dist2 as init_dist,
  useNavigate
} from "/build/_shared/chunk-3XJOQGLE.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-BCJ43RGM.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/ical.js/build/ical.js
var require_ical = __commonJS({
  "node_modules/ical.js/build/ical.js"(exports, module) {
    var ICAL2;
    (function() {
      if (typeof module === "object") {
        ICAL2 = module.exports;
      } else if (typeof HTMLScriptElement !== "undefined" && "noModule" in HTMLScriptElement.prototype) {
        window.ICAL = ICAL2 = {};
      } else if (typeof ICAL2 !== "object") {
        ICAL2 = {};
      }
    })();
    ICAL2.foldLength = 75;
    ICAL2.newLineChar = "\r\n";
    ICAL2.helpers = {
      /**
       * Compiles a list of all referenced TZIDs in all subcomponents and
       * removes any extra VTIMEZONE subcomponents. In addition, if any TZIDs
       * are referenced by a component, but a VTIMEZONE does not exist,
       * an attempt will be made to generate a VTIMEZONE using ICAL.TimezoneService.
       *
       * @param {ICAL.Component} vcal     The top-level VCALENDAR component.
       * @return {ICAL.Component}         The ICAL.Component that was passed in.
       */
      updateTimezones: function(vcal) {
        var allsubs, properties, vtimezones, reqTzid, i, tzid;
        if (!vcal || vcal.name !== "vcalendar") {
          return vcal;
        }
        allsubs = vcal.getAllSubcomponents();
        properties = [];
        vtimezones = {};
        for (i = 0; i < allsubs.length; i++) {
          if (allsubs[i].name === "vtimezone") {
            tzid = allsubs[i].getFirstProperty("tzid").getFirstValue();
            vtimezones[tzid] = allsubs[i];
          } else {
            properties = properties.concat(allsubs[i].getAllProperties());
          }
        }
        reqTzid = {};
        for (i = 0; i < properties.length; i++) {
          if (tzid = properties[i].getParameter("tzid")) {
            reqTzid[tzid] = true;
          }
        }
        for (i in vtimezones) {
          if (vtimezones.hasOwnProperty(i) && !reqTzid[i]) {
            vcal.removeSubcomponent(vtimezones[i]);
          }
        }
        for (i in reqTzid) {
          if (reqTzid.hasOwnProperty(i) && !vtimezones[i] && ICAL2.TimezoneService.has(i)) {
            vcal.addSubcomponent(ICAL2.TimezoneService.get(i).component);
          }
        }
        return vcal;
      },
      /**
       * Checks if the given type is of the number type and also NaN.
       *
       * @param {Number} number     The number to check
       * @return {Boolean}          True, if the number is strictly NaN
       */
      isStrictlyNaN: function(number) {
        return typeof number === "number" && isNaN(number);
      },
      /**
       * Parses a string value that is expected to be an integer, when the valid is
       * not an integer throws a decoration error.
       *
       * @param {String} string     Raw string input
       * @return {Number}           Parsed integer
       */
      strictParseInt: function(string) {
        var result = parseInt(string, 10);
        if (ICAL2.helpers.isStrictlyNaN(result)) {
          throw new Error(
            'Could not extract integer from "' + string + '"'
          );
        }
        return result;
      },
      /**
       * Creates or returns a class instance of a given type with the initialization
       * data if the data is not already an instance of the given type.
       *
       * @example
       * var time = new ICAL.Time(...);
       * var result = ICAL.helpers.formatClassType(time, ICAL.Time);
       *
       * (result instanceof ICAL.Time)
       * // => true
       *
       * result = ICAL.helpers.formatClassType({}, ICAL.Time);
       * (result isntanceof ICAL.Time)
       * // => true
       *
       *
       * @param {Object} data       object initialization data
       * @param {Object} type       object type (like ICAL.Time)
       * @return {?}                An instance of the found type.
       */
      formatClassType: function formatClassType(data, type) {
        if (typeof data === "undefined") {
          return void 0;
        }
        if (data instanceof type) {
          return data;
        }
        return new type(data);
      },
      /**
       * Identical to indexOf but will only match values when they are not preceded
       * by a backslash character.
       *
       * @param {String} buffer         String to search
       * @param {String} search         Value to look for
       * @param {Number} pos            Start position
       * @return {Number}               The position, or -1 if not found
       */
      unescapedIndexOf: function(buffer, search, pos) {
        while ((pos = buffer.indexOf(search, pos)) !== -1) {
          if (pos > 0 && buffer[pos - 1] === "\\") {
            pos += 1;
          } else {
            return pos;
          }
        }
        return -1;
      },
      /**
       * Find the index for insertion using binary search.
       *
       * @param {Array} list            The list to search
       * @param {?} seekVal             The value to insert
       * @param {function(?,?)} cmpfunc The comparison func, that can
       *                                  compare two seekVals
       * @return {Number}               The insert position
       */
      binsearchInsert: function(list, seekVal, cmpfunc) {
        if (!list.length)
          return 0;
        var low = 0, high = list.length - 1, mid, cmpval;
        while (low <= high) {
          mid = low + Math.floor((high - low) / 2);
          cmpval = cmpfunc(seekVal, list[mid]);
          if (cmpval < 0)
            high = mid - 1;
          else if (cmpval > 0)
            low = mid + 1;
          else
            break;
        }
        if (cmpval < 0)
          return mid;
        else if (cmpval > 0)
          return mid + 1;
        else
          return mid;
      },
      /**
       * Convenience function for debug output
       * @private
       */
      dumpn: (
        /* istanbul ignore next */
        function() {
          if (!ICAL2.debug) {
            return;
          }
          if (typeof console !== "undefined" && "log" in console) {
            ICAL2.helpers.dumpn = function consoleDumpn(input) {
              console.log(input);
            };
          } else {
            ICAL2.helpers.dumpn = function geckoDumpn(input) {
              dump(input + "\n");
            };
          }
          ICAL2.helpers.dumpn(arguments[0]);
        }
      ),
      /**
       * Clone the passed object or primitive. By default a shallow clone will be
       * executed.
       *
       * @param {*} aSrc            The thing to clone
       * @param {Boolean=} aDeep    If true, a deep clone will be performed
       * @return {*}                The copy of the thing
       */
      clone: function(aSrc, aDeep) {
        if (!aSrc || typeof aSrc != "object") {
          return aSrc;
        } else if (aSrc instanceof Date) {
          return new Date(aSrc.getTime());
        } else if ("clone" in aSrc) {
          return aSrc.clone();
        } else if (Array.isArray(aSrc)) {
          var arr = [];
          for (var i = 0; i < aSrc.length; i++) {
            arr.push(aDeep ? ICAL2.helpers.clone(aSrc[i], true) : aSrc[i]);
          }
          return arr;
        } else {
          var obj = {};
          for (var name in aSrc) {
            if (Object.prototype.hasOwnProperty.call(aSrc, name)) {
              if (aDeep) {
                obj[name] = ICAL2.helpers.clone(aSrc[name], true);
              } else {
                obj[name] = aSrc[name];
              }
            }
          }
          return obj;
        }
      },
      /**
       * Performs iCalendar line folding. A line ending character is inserted and
       * the next line begins with a whitespace.
       *
       * @example
       * SUMMARY:This line will be fold
       *  ed right in the middle of a word.
       *
       * @param {String} aLine      The line to fold
       * @return {String}           The folded line
       */
      foldline: function foldline(aLine) {
        var result = "";
        var line = aLine || "", pos = 0, line_length = 0;
        while (line.length) {
          var cp = line.codePointAt(pos);
          if (cp < 128)
            ++line_length;
          else if (cp < 2048)
            line_length += 2;
          else if (cp < 65536)
            line_length += 3;
          else
            line_length += 4;
          if (line_length < ICAL2.foldLength + 1)
            pos += cp > 65535 ? 2 : 1;
          else {
            result += ICAL2.newLineChar + " " + line.substring(0, pos);
            line = line.substring(pos);
            pos = line_length = 0;
          }
        }
        return result.substr(ICAL2.newLineChar.length + 1);
      },
      /**
       * Pads the given string or number with zeros so it will have at least two
       * characters.
       *
       * @param {String|Number} data    The string or number to pad
       * @return {String}               The number padded as a string
       */
      pad2: function pad(data) {
        if (typeof data !== "string") {
          if (typeof data === "number") {
            data = parseInt(data);
          }
          data = String(data);
        }
        var len = data.length;
        switch (len) {
          case 0:
            return "00";
          case 1:
            return "0" + data;
          default:
            return data;
        }
      },
      /**
       * Truncates the given number, correctly handling negative numbers.
       *
       * @param {Number} number     The number to truncate
       * @return {Number}           The truncated number
       */
      trunc: function trunc(number) {
        return number < 0 ? Math.ceil(number) : Math.floor(number);
      },
      /**
       * Poor-man's cross-browser inheritance for JavaScript. Doesn't support all
       * the features, but enough for our usage.
       *
       * @param {Function} base     The base class constructor function.
       * @param {Function} child    The child class constructor function.
       * @param {Object} extra      Extends the prototype with extra properties
       *                              and methods
       */
      inherits: function(base, child, extra) {
        function F() {
        }
        F.prototype = base.prototype;
        child.prototype = new F();
        if (extra) {
          ICAL2.helpers.extend(extra, child.prototype);
        }
      },
      /**
       * Poor-man's cross-browser object extension. Doesn't support all the
       * features, but enough for our usage. Note that the target's properties are
       * not overwritten with the source properties.
       *
       * @example
       * var child = ICAL.helpers.extend(parent, {
       *   "bar": 123
       * });
       *
       * @param {Object} source     The object to extend
       * @param {Object} target     The object to extend with
       * @return {Object}           Returns the target.
       */
      extend: function(source, target) {
        for (var key in source) {
          var descr = Object.getOwnPropertyDescriptor(source, key);
          if (descr && !Object.getOwnPropertyDescriptor(target, key)) {
            Object.defineProperty(target, key, descr);
          }
        }
        return target;
      }
    };
    ICAL2.design = function() {
      "use strict";
      var FROM_ICAL_NEWLINE = /\\\\|\\;|\\,|\\[Nn]/g;
      var TO_ICAL_NEWLINE = /\\|;|,|\n/g;
      var FROM_VCARD_NEWLINE = /\\\\|\\,|\\[Nn]/g;
      var TO_VCARD_NEWLINE = /\\|,|\n/g;
      function createTextType(fromNewline, toNewline) {
        var result = {
          matches: /.*/,
          fromICAL: function(aValue, structuredEscape) {
            return replaceNewline(aValue, fromNewline, structuredEscape);
          },
          toICAL: function(aValue, structuredEscape) {
            var regEx = toNewline;
            if (structuredEscape)
              regEx = new RegExp(regEx.source + "|" + structuredEscape);
            return aValue.replace(regEx, function(str) {
              switch (str) {
                case "\\":
                  return "\\\\";
                case ";":
                  return "\\;";
                case ",":
                  return "\\,";
                case "\n":
                  return "\\n";
                default:
                  return str;
              }
            });
          }
        };
        return result;
      }
      var DEFAULT_TYPE_TEXT = { defaultType: "text" };
      var DEFAULT_TYPE_TEXT_MULTI = { defaultType: "text", multiValue: "," };
      var DEFAULT_TYPE_TEXT_STRUCTURED = { defaultType: "text", structuredValue: ";" };
      var DEFAULT_TYPE_INTEGER = { defaultType: "integer" };
      var DEFAULT_TYPE_DATETIME_DATE = { defaultType: "date-time", allowedTypes: ["date-time", "date"] };
      var DEFAULT_TYPE_DATETIME = { defaultType: "date-time" };
      var DEFAULT_TYPE_URI = { defaultType: "uri" };
      var DEFAULT_TYPE_UTCOFFSET = { defaultType: "utc-offset" };
      var DEFAULT_TYPE_RECUR = { defaultType: "recur" };
      var DEFAULT_TYPE_DATE_ANDOR_TIME = { defaultType: "date-and-or-time", allowedTypes: ["date-time", "date", "text"] };
      function replaceNewlineReplace(string) {
        switch (string) {
          case "\\\\":
            return "\\";
          case "\\;":
            return ";";
          case "\\,":
            return ",";
          case "\\n":
          case "\\N":
            return "\n";
          default:
            return string;
        }
      }
      function replaceNewline(value, newline, structuredEscape) {
        if (value.indexOf("\\") === -1) {
          return value;
        }
        if (structuredEscape)
          newline = new RegExp(newline.source + "|\\\\" + structuredEscape);
        return value.replace(newline, replaceNewlineReplace);
      }
      var commonProperties = {
        "categories": DEFAULT_TYPE_TEXT_MULTI,
        "url": DEFAULT_TYPE_URI,
        "version": DEFAULT_TYPE_TEXT,
        "uid": DEFAULT_TYPE_TEXT
      };
      var commonValues = {
        "boolean": {
          values: ["TRUE", "FALSE"],
          fromICAL: function(aValue) {
            switch (aValue) {
              case "TRUE":
                return true;
              case "FALSE":
                return false;
              default:
                return false;
            }
          },
          toICAL: function(aValue) {
            if (aValue) {
              return "TRUE";
            }
            return "FALSE";
          }
        },
        float: {
          matches: /^[+-]?\d+\.\d+$/,
          fromICAL: function(aValue) {
            var parsed = parseFloat(aValue);
            if (ICAL2.helpers.isStrictlyNaN(parsed)) {
              return 0;
            }
            return parsed;
          },
          toICAL: function(aValue) {
            return String(aValue);
          }
        },
        integer: {
          fromICAL: function(aValue) {
            var parsed = parseInt(aValue);
            if (ICAL2.helpers.isStrictlyNaN(parsed)) {
              return 0;
            }
            return parsed;
          },
          toICAL: function(aValue) {
            return String(aValue);
          }
        },
        "utc-offset": {
          toICAL: function(aValue) {
            if (aValue.length < 7) {
              return aValue.substr(0, 3) + aValue.substr(4, 2);
            } else {
              return aValue.substr(0, 3) + aValue.substr(4, 2) + aValue.substr(7, 2);
            }
          },
          fromICAL: function(aValue) {
            if (aValue.length < 6) {
              return aValue.substr(0, 3) + ":" + aValue.substr(3, 2);
            } else {
              return aValue.substr(0, 3) + ":" + aValue.substr(3, 2) + ":" + aValue.substr(5, 2);
            }
          },
          decorate: function(aValue) {
            return ICAL2.UtcOffset.fromString(aValue);
          },
          undecorate: function(aValue) {
            return aValue.toString();
          }
        }
      };
      var icalParams = {
        // Although the syntax is DQUOTE uri DQUOTE, I don't think we should
        // enfoce anything aside from it being a valid content line.
        //
        // At least some params require - if multi values are used - DQUOTEs
        // for each of its values - e.g. delegated-from="uri1","uri2"
        // To indicate this, I introduced the new k/v pair
        // multiValueSeparateDQuote: true
        //
        // "ALTREP": { ... },
        // CN just wants a param-value
        // "CN": { ... }
        "cutype": {
          values: ["INDIVIDUAL", "GROUP", "RESOURCE", "ROOM", "UNKNOWN"],
          allowXName: true,
          allowIanaToken: true
        },
        "delegated-from": {
          valueType: "cal-address",
          multiValue: ",",
          multiValueSeparateDQuote: true
        },
        "delegated-to": {
          valueType: "cal-address",
          multiValue: ",",
          multiValueSeparateDQuote: true
        },
        // "DIR": { ... }, // See ALTREP
        "encoding": {
          values: ["8BIT", "BASE64"]
        },
        // "FMTTYPE": { ... }, // See ALTREP
        "fbtype": {
          values: ["FREE", "BUSY", "BUSY-UNAVAILABLE", "BUSY-TENTATIVE"],
          allowXName: true,
          allowIanaToken: true
        },
        // "LANGUAGE": { ... }, // See ALTREP
        "member": {
          valueType: "cal-address",
          multiValue: ",",
          multiValueSeparateDQuote: true
        },
        "partstat": {
          // TODO These values are actually different per-component
          values: [
            "NEEDS-ACTION",
            "ACCEPTED",
            "DECLINED",
            "TENTATIVE",
            "DELEGATED",
            "COMPLETED",
            "IN-PROCESS"
          ],
          allowXName: true,
          allowIanaToken: true
        },
        "range": {
          values: ["THISANDFUTURE"]
        },
        "related": {
          values: ["START", "END"]
        },
        "reltype": {
          values: ["PARENT", "CHILD", "SIBLING"],
          allowXName: true,
          allowIanaToken: true
        },
        "role": {
          values: [
            "REQ-PARTICIPANT",
            "CHAIR",
            "OPT-PARTICIPANT",
            "NON-PARTICIPANT"
          ],
          allowXName: true,
          allowIanaToken: true
        },
        "rsvp": {
          values: ["TRUE", "FALSE"]
        },
        "sent-by": {
          valueType: "cal-address"
        },
        "tzid": {
          matches: /^\//
        },
        "value": {
          // since the value here is a 'type' lowercase is used.
          values: [
            "binary",
            "boolean",
            "cal-address",
            "date",
            "date-time",
            "duration",
            "float",
            "integer",
            "period",
            "recur",
            "text",
            "time",
            "uri",
            "utc-offset"
          ],
          allowXName: true,
          allowIanaToken: true
        }
      };
      var icalValues = ICAL2.helpers.extend(commonValues, {
        text: createTextType(FROM_ICAL_NEWLINE, TO_ICAL_NEWLINE),
        uri: {
          // TODO
          /* ... */
        },
        "binary": {
          decorate: function(aString) {
            return ICAL2.Binary.fromString(aString);
          },
          undecorate: function(aBinary) {
            return aBinary.toString();
          }
        },
        "cal-address": {
          // needs to be an uri
        },
        "date": {
          decorate: function(aValue, aProp) {
            if (design.strict) {
              return ICAL2.Time.fromDateString(aValue, aProp);
            } else {
              return ICAL2.Time.fromString(aValue, aProp);
            }
          },
          /**
           * undecorates a time object.
           */
          undecorate: function(aValue) {
            return aValue.toString();
          },
          fromICAL: function(aValue) {
            if (!design.strict && aValue.length >= 15) {
              return icalValues["date-time"].fromICAL(aValue);
            } else {
              return aValue.substr(0, 4) + "-" + aValue.substr(4, 2) + "-" + aValue.substr(6, 2);
            }
          },
          toICAL: function(aValue) {
            var len = aValue.length;
            if (len == 10) {
              return aValue.substr(0, 4) + aValue.substr(5, 2) + aValue.substr(8, 2);
            } else if (len >= 19) {
              return icalValues["date-time"].toICAL(aValue);
            } else {
              return aValue;
            }
          }
        },
        "date-time": {
          fromICAL: function(aValue) {
            if (!design.strict && aValue.length == 8) {
              return icalValues.date.fromICAL(aValue);
            } else {
              var result = aValue.substr(0, 4) + "-" + aValue.substr(4, 2) + "-" + aValue.substr(6, 2) + "T" + aValue.substr(9, 2) + ":" + aValue.substr(11, 2) + ":" + aValue.substr(13, 2);
              if (aValue[15] && aValue[15] === "Z") {
                result += "Z";
              }
              return result;
            }
          },
          toICAL: function(aValue) {
            var len = aValue.length;
            if (len == 10 && !design.strict) {
              return icalValues.date.toICAL(aValue);
            } else if (len >= 19) {
              var result = aValue.substr(0, 4) + aValue.substr(5, 2) + // grab the (DDTHH) segment
              aValue.substr(8, 5) + // MM
              aValue.substr(14, 2) + // SS
              aValue.substr(17, 2);
              if (aValue[19] && aValue[19] === "Z") {
                result += "Z";
              }
              return result;
            } else {
              return aValue;
            }
          },
          decorate: function(aValue, aProp) {
            if (design.strict) {
              return ICAL2.Time.fromDateTimeString(aValue, aProp);
            } else {
              return ICAL2.Time.fromString(aValue, aProp);
            }
          },
          undecorate: function(aValue) {
            return aValue.toString();
          }
        },
        duration: {
          decorate: function(aValue) {
            return ICAL2.Duration.fromString(aValue);
          },
          undecorate: function(aValue) {
            return aValue.toString();
          }
        },
        period: {
          fromICAL: function(string) {
            var parts = string.split("/");
            parts[0] = icalValues["date-time"].fromICAL(parts[0]);
            if (!ICAL2.Duration.isValueString(parts[1])) {
              parts[1] = icalValues["date-time"].fromICAL(parts[1]);
            }
            return parts;
          },
          toICAL: function(parts) {
            if (!design.strict && parts[0].length == 10) {
              parts[0] = icalValues.date.toICAL(parts[0]);
            } else {
              parts[0] = icalValues["date-time"].toICAL(parts[0]);
            }
            if (!ICAL2.Duration.isValueString(parts[1])) {
              if (!design.strict && parts[1].length == 10) {
                parts[1] = icalValues.date.toICAL(parts[1]);
              } else {
                parts[1] = icalValues["date-time"].toICAL(parts[1]);
              }
            }
            return parts.join("/");
          },
          decorate: function(aValue, aProp) {
            return ICAL2.Period.fromJSON(aValue, aProp, !design.strict);
          },
          undecorate: function(aValue) {
            return aValue.toJSON();
          }
        },
        recur: {
          fromICAL: function(string) {
            return ICAL2.Recur._stringToData(string, true);
          },
          toICAL: function(data) {
            var str = "";
            for (var k in data) {
              if (!Object.prototype.hasOwnProperty.call(data, k)) {
                continue;
              }
              var val = data[k];
              if (k == "until") {
                if (val.length > 10) {
                  val = icalValues["date-time"].toICAL(val);
                } else {
                  val = icalValues.date.toICAL(val);
                }
              } else if (k == "wkst") {
                if (typeof val === "number") {
                  val = ICAL2.Recur.numericDayToIcalDay(val);
                }
              } else if (Array.isArray(val)) {
                val = val.join(",");
              }
              str += k.toUpperCase() + "=" + val + ";";
            }
            return str.substr(0, str.length - 1);
          },
          decorate: function decorate(aValue) {
            return ICAL2.Recur.fromData(aValue);
          },
          undecorate: function(aRecur) {
            return aRecur.toJSON();
          }
        },
        time: {
          fromICAL: function(aValue) {
            if (aValue.length < 6) {
              return aValue;
            }
            var result = aValue.substr(0, 2) + ":" + aValue.substr(2, 2) + ":" + aValue.substr(4, 2);
            if (aValue[6] === "Z") {
              result += "Z";
            }
            return result;
          },
          toICAL: function(aValue) {
            if (aValue.length < 8) {
              return aValue;
            }
            var result = aValue.substr(0, 2) + aValue.substr(3, 2) + aValue.substr(6, 2);
            if (aValue[8] === "Z") {
              result += "Z";
            }
            return result;
          }
        }
      });
      var icalProperties = ICAL2.helpers.extend(commonProperties, {
        "action": DEFAULT_TYPE_TEXT,
        "attach": { defaultType: "uri" },
        "attendee": { defaultType: "cal-address" },
        "calscale": DEFAULT_TYPE_TEXT,
        "class": DEFAULT_TYPE_TEXT,
        "comment": DEFAULT_TYPE_TEXT,
        "completed": DEFAULT_TYPE_DATETIME,
        "contact": DEFAULT_TYPE_TEXT,
        "created": DEFAULT_TYPE_DATETIME,
        "description": DEFAULT_TYPE_TEXT,
        "dtend": DEFAULT_TYPE_DATETIME_DATE,
        "dtstamp": DEFAULT_TYPE_DATETIME,
        "dtstart": DEFAULT_TYPE_DATETIME_DATE,
        "due": DEFAULT_TYPE_DATETIME_DATE,
        "duration": { defaultType: "duration" },
        "exdate": {
          defaultType: "date-time",
          allowedTypes: ["date-time", "date"],
          multiValue: ","
        },
        "exrule": DEFAULT_TYPE_RECUR,
        "freebusy": { defaultType: "period", multiValue: "," },
        "geo": { defaultType: "float", structuredValue: ";" },
        "last-modified": DEFAULT_TYPE_DATETIME,
        "location": DEFAULT_TYPE_TEXT,
        "method": DEFAULT_TYPE_TEXT,
        "organizer": { defaultType: "cal-address" },
        "percent-complete": DEFAULT_TYPE_INTEGER,
        "priority": DEFAULT_TYPE_INTEGER,
        "prodid": DEFAULT_TYPE_TEXT,
        "related-to": DEFAULT_TYPE_TEXT,
        "repeat": DEFAULT_TYPE_INTEGER,
        "rdate": {
          defaultType: "date-time",
          allowedTypes: ["date-time", "date", "period"],
          multiValue: ",",
          detectType: function(string) {
            if (string.indexOf("/") !== -1) {
              return "period";
            }
            return string.indexOf("T") === -1 ? "date" : "date-time";
          }
        },
        "recurrence-id": DEFAULT_TYPE_DATETIME_DATE,
        "resources": DEFAULT_TYPE_TEXT_MULTI,
        "request-status": DEFAULT_TYPE_TEXT_STRUCTURED,
        "rrule": DEFAULT_TYPE_RECUR,
        "sequence": DEFAULT_TYPE_INTEGER,
        "status": DEFAULT_TYPE_TEXT,
        "summary": DEFAULT_TYPE_TEXT,
        "transp": DEFAULT_TYPE_TEXT,
        "trigger": { defaultType: "duration", allowedTypes: ["duration", "date-time"] },
        "tzoffsetfrom": DEFAULT_TYPE_UTCOFFSET,
        "tzoffsetto": DEFAULT_TYPE_UTCOFFSET,
        "tzurl": DEFAULT_TYPE_URI,
        "tzid": DEFAULT_TYPE_TEXT,
        "tzname": DEFAULT_TYPE_TEXT
      });
      var vcardValues = ICAL2.helpers.extend(commonValues, {
        text: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
        uri: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
        date: {
          decorate: function(aValue) {
            return ICAL2.VCardTime.fromDateAndOrTimeString(aValue, "date");
          },
          undecorate: function(aValue) {
            return aValue.toString();
          },
          fromICAL: function(aValue) {
            if (aValue.length == 8) {
              return icalValues.date.fromICAL(aValue);
            } else if (aValue[0] == "-" && aValue.length == 6) {
              return aValue.substr(0, 4) + "-" + aValue.substr(4);
            } else {
              return aValue;
            }
          },
          toICAL: function(aValue) {
            if (aValue.length == 10) {
              return icalValues.date.toICAL(aValue);
            } else if (aValue[0] == "-" && aValue.length == 7) {
              return aValue.substr(0, 4) + aValue.substr(5);
            } else {
              return aValue;
            }
          }
        },
        time: {
          decorate: function(aValue) {
            return ICAL2.VCardTime.fromDateAndOrTimeString("T" + aValue, "time");
          },
          undecorate: function(aValue) {
            return aValue.toString();
          },
          fromICAL: function(aValue) {
            var splitzone = vcardValues.time._splitZone(aValue, true);
            var zone = splitzone[0], value = splitzone[1];
            if (value.length == 6) {
              value = value.substr(0, 2) + ":" + value.substr(2, 2) + ":" + value.substr(4, 2);
            } else if (value.length == 4 && value[0] != "-") {
              value = value.substr(0, 2) + ":" + value.substr(2, 2);
            } else if (value.length == 5) {
              value = value.substr(0, 3) + ":" + value.substr(3, 2);
            }
            if (zone.length == 5 && (zone[0] == "-" || zone[0] == "+")) {
              zone = zone.substr(0, 3) + ":" + zone.substr(3);
            }
            return value + zone;
          },
          toICAL: function(aValue) {
            var splitzone = vcardValues.time._splitZone(aValue);
            var zone = splitzone[0], value = splitzone[1];
            if (value.length == 8) {
              value = value.substr(0, 2) + value.substr(3, 2) + value.substr(6, 2);
            } else if (value.length == 5 && value[0] != "-") {
              value = value.substr(0, 2) + value.substr(3, 2);
            } else if (value.length == 6) {
              value = value.substr(0, 3) + value.substr(4, 2);
            }
            if (zone.length == 6 && (zone[0] == "-" || zone[0] == "+")) {
              zone = zone.substr(0, 3) + zone.substr(4);
            }
            return value + zone;
          },
          _splitZone: function(aValue, isFromIcal) {
            var lastChar = aValue.length - 1;
            var signChar = aValue.length - (isFromIcal ? 5 : 6);
            var sign = aValue[signChar];
            var zone, value;
            if (aValue[lastChar] == "Z") {
              zone = aValue[lastChar];
              value = aValue.substr(0, lastChar);
            } else if (aValue.length > 6 && (sign == "-" || sign == "+")) {
              zone = aValue.substr(signChar);
              value = aValue.substr(0, signChar);
            } else {
              zone = "";
              value = aValue;
            }
            return [zone, value];
          }
        },
        "date-time": {
          decorate: function(aValue) {
            return ICAL2.VCardTime.fromDateAndOrTimeString(aValue, "date-time");
          },
          undecorate: function(aValue) {
            return aValue.toString();
          },
          fromICAL: function(aValue) {
            return vcardValues["date-and-or-time"].fromICAL(aValue);
          },
          toICAL: function(aValue) {
            return vcardValues["date-and-or-time"].toICAL(aValue);
          }
        },
        "date-and-or-time": {
          decorate: function(aValue) {
            return ICAL2.VCardTime.fromDateAndOrTimeString(aValue, "date-and-or-time");
          },
          undecorate: function(aValue) {
            return aValue.toString();
          },
          fromICAL: function(aValue) {
            var parts = aValue.split("T");
            return (parts[0] ? vcardValues.date.fromICAL(parts[0]) : "") + (parts[1] ? "T" + vcardValues.time.fromICAL(parts[1]) : "");
          },
          toICAL: function(aValue) {
            var parts = aValue.split("T");
            return vcardValues.date.toICAL(parts[0]) + (parts[1] ? "T" + vcardValues.time.toICAL(parts[1]) : "");
          }
        },
        timestamp: icalValues["date-time"],
        "language-tag": {
          matches: /^[a-zA-Z0-9-]+$/
          // Could go with a more strict regex here
        }
      });
      var vcardParams = {
        "type": {
          valueType: "text",
          multiValue: ","
        },
        "value": {
          // since the value here is a 'type' lowercase is used.
          values: [
            "text",
            "uri",
            "date",
            "time",
            "date-time",
            "date-and-or-time",
            "timestamp",
            "boolean",
            "integer",
            "float",
            "utc-offset",
            "language-tag"
          ],
          allowXName: true,
          allowIanaToken: true
        }
      };
      var vcardProperties = ICAL2.helpers.extend(commonProperties, {
        "adr": { defaultType: "text", structuredValue: ";", multiValue: "," },
        "anniversary": DEFAULT_TYPE_DATE_ANDOR_TIME,
        "bday": DEFAULT_TYPE_DATE_ANDOR_TIME,
        "caladruri": DEFAULT_TYPE_URI,
        "caluri": DEFAULT_TYPE_URI,
        "clientpidmap": DEFAULT_TYPE_TEXT_STRUCTURED,
        "email": DEFAULT_TYPE_TEXT,
        "fburl": DEFAULT_TYPE_URI,
        "fn": DEFAULT_TYPE_TEXT,
        "gender": DEFAULT_TYPE_TEXT_STRUCTURED,
        "geo": DEFAULT_TYPE_URI,
        "impp": DEFAULT_TYPE_URI,
        "key": DEFAULT_TYPE_URI,
        "kind": DEFAULT_TYPE_TEXT,
        "lang": { defaultType: "language-tag" },
        "logo": DEFAULT_TYPE_URI,
        "member": DEFAULT_TYPE_URI,
        "n": { defaultType: "text", structuredValue: ";", multiValue: "," },
        "nickname": DEFAULT_TYPE_TEXT_MULTI,
        "note": DEFAULT_TYPE_TEXT,
        "org": { defaultType: "text", structuredValue: ";" },
        "photo": DEFAULT_TYPE_URI,
        "related": DEFAULT_TYPE_URI,
        "rev": { defaultType: "timestamp" },
        "role": DEFAULT_TYPE_TEXT,
        "sound": DEFAULT_TYPE_URI,
        "source": DEFAULT_TYPE_URI,
        "tel": { defaultType: "uri", allowedTypes: ["uri", "text"] },
        "title": DEFAULT_TYPE_TEXT,
        "tz": { defaultType: "text", allowedTypes: ["text", "utc-offset", "uri"] },
        "xml": DEFAULT_TYPE_TEXT
      });
      var vcard3Values = ICAL2.helpers.extend(commonValues, {
        binary: icalValues.binary,
        date: vcardValues.date,
        "date-time": vcardValues["date-time"],
        "phone-number": {
          // TODO
          /* ... */
        },
        uri: icalValues.uri,
        text: icalValues.text,
        time: icalValues.time,
        vcard: icalValues.text,
        "utc-offset": {
          toICAL: function(aValue) {
            return aValue.substr(0, 7);
          },
          fromICAL: function(aValue) {
            return aValue.substr(0, 7);
          },
          decorate: function(aValue) {
            return ICAL2.UtcOffset.fromString(aValue);
          },
          undecorate: function(aValue) {
            return aValue.toString();
          }
        }
      });
      var vcard3Params = {
        "type": {
          valueType: "text",
          multiValue: ","
        },
        "value": {
          // since the value here is a 'type' lowercase is used.
          values: [
            "text",
            "uri",
            "date",
            "date-time",
            "phone-number",
            "time",
            "boolean",
            "integer",
            "float",
            "utc-offset",
            "vcard",
            "binary"
          ],
          allowXName: true,
          allowIanaToken: true
        }
      };
      var vcard3Properties = ICAL2.helpers.extend(commonProperties, {
        fn: DEFAULT_TYPE_TEXT,
        n: { defaultType: "text", structuredValue: ";", multiValue: "," },
        nickname: DEFAULT_TYPE_TEXT_MULTI,
        photo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
        bday: {
          defaultType: "date-time",
          allowedTypes: ["date-time", "date"],
          detectType: function(string) {
            return string.indexOf("T") === -1 ? "date" : "date-time";
          }
        },
        adr: { defaultType: "text", structuredValue: ";", multiValue: "," },
        label: DEFAULT_TYPE_TEXT,
        tel: { defaultType: "phone-number" },
        email: DEFAULT_TYPE_TEXT,
        mailer: DEFAULT_TYPE_TEXT,
        tz: { defaultType: "utc-offset", allowedTypes: ["utc-offset", "text"] },
        geo: { defaultType: "float", structuredValue: ";" },
        title: DEFAULT_TYPE_TEXT,
        role: DEFAULT_TYPE_TEXT,
        logo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
        agent: { defaultType: "vcard", allowedTypes: ["vcard", "text", "uri"] },
        org: DEFAULT_TYPE_TEXT_STRUCTURED,
        note: DEFAULT_TYPE_TEXT_MULTI,
        prodid: DEFAULT_TYPE_TEXT,
        rev: {
          defaultType: "date-time",
          allowedTypes: ["date-time", "date"],
          detectType: function(string) {
            return string.indexOf("T") === -1 ? "date" : "date-time";
          }
        },
        "sort-string": DEFAULT_TYPE_TEXT,
        sound: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
        class: DEFAULT_TYPE_TEXT,
        key: { defaultType: "binary", allowedTypes: ["binary", "text"] }
      });
      var icalSet = {
        value: icalValues,
        param: icalParams,
        property: icalProperties
      };
      var vcardSet = {
        value: vcardValues,
        param: vcardParams,
        property: vcardProperties
      };
      var vcard3Set = {
        value: vcard3Values,
        param: vcard3Params,
        property: vcard3Properties
      };
      var design = {
        /**
         * A designSet describes value, parameter and property data. It is used by
         * ther parser and stringifier in components and properties to determine they
         * should be represented.
         *
         * @typedef {Object} designSet
         * @memberOf ICAL.design
         * @property {Object} value       Definitions for value types, keys are type names
         * @property {Object} param       Definitions for params, keys are param names
         * @property {Object} property    Defintions for properties, keys are property names
         */
        /**
         * Can be set to false to make the parser more lenient.
         */
        strict: true,
        /**
         * The default set for new properties and components if none is specified.
         * @type {ICAL.design.designSet}
         */
        defaultSet: icalSet,
        /**
         * The default type for unknown properties
         * @type {String}
         */
        defaultType: "unknown",
        /**
         * Holds the design set for known top-level components
         *
         * @type {Object}
         * @property {ICAL.design.designSet} vcard       vCard VCARD
         * @property {ICAL.design.designSet} vevent      iCalendar VEVENT
         * @property {ICAL.design.designSet} vtodo       iCalendar VTODO
         * @property {ICAL.design.designSet} vjournal    iCalendar VJOURNAL
         * @property {ICAL.design.designSet} valarm      iCalendar VALARM
         * @property {ICAL.design.designSet} vtimezone   iCalendar VTIMEZONE
         * @property {ICAL.design.designSet} daylight    iCalendar DAYLIGHT
         * @property {ICAL.design.designSet} standard    iCalendar STANDARD
         *
         * @example
         * var propertyName = 'fn';
         * var componentDesign = ICAL.design.components.vcard;
         * var propertyDetails = componentDesign.property[propertyName];
         * if (propertyDetails.defaultType == 'text') {
         *   // Yep, sure is...
         * }
         */
        components: {
          vcard: vcardSet,
          vcard3: vcard3Set,
          vevent: icalSet,
          vtodo: icalSet,
          vjournal: icalSet,
          valarm: icalSet,
          vtimezone: icalSet,
          daylight: icalSet,
          standard: icalSet
        },
        /**
         * The design set for iCalendar (rfc5545/rfc7265) components.
         * @type {ICAL.design.designSet}
         */
        icalendar: icalSet,
        /**
         * The design set for vCard (rfc6350/rfc7095) components.
         * @type {ICAL.design.designSet}
         */
        vcard: vcardSet,
        /**
         * The design set for vCard (rfc2425/rfc2426/rfc7095) components.
         * @type {ICAL.design.designSet}
         */
        vcard3: vcard3Set,
        /**
         * Gets the design set for the given component name.
         *
         * @param {String} componentName        The name of the component
         * @return {ICAL.design.designSet}      The design set for the component
         */
        getDesignSet: function(componentName) {
          var isInDesign = componentName && componentName in design.components;
          return isInDesign ? design.components[componentName] : design.defaultSet;
        }
      };
      return design;
    }();
    ICAL2.stringify = function() {
      "use strict";
      var LINE_ENDING = "\r\n";
      var DEFAULT_VALUE_TYPE = "unknown";
      var design = ICAL2.design;
      var helpers = ICAL2.helpers;
      function stringify(jCal) {
        if (typeof jCal[0] == "string") {
          jCal = [jCal];
        }
        var i = 0;
        var len = jCal.length;
        var result = "";
        for (; i < len; i++) {
          result += stringify.component(jCal[i]) + LINE_ENDING;
        }
        return result;
      }
      stringify.component = function(component, designSet) {
        var name = component[0].toUpperCase();
        var result = "BEGIN:" + name + LINE_ENDING;
        var props = component[1];
        var propIdx = 0;
        var propLen = props.length;
        var designSetName = component[0];
        if (designSetName === "vcard" && component[1].length > 0 && !(component[1][0][0] === "version" && component[1][0][3] === "4.0")) {
          designSetName = "vcard3";
        }
        designSet = designSet || design.getDesignSet(designSetName);
        for (; propIdx < propLen; propIdx++) {
          result += stringify.property(props[propIdx], designSet) + LINE_ENDING;
        }
        var comps = component[2] || [];
        var compIdx = 0;
        var compLen = comps.length;
        for (; compIdx < compLen; compIdx++) {
          result += stringify.component(comps[compIdx], designSet) + LINE_ENDING;
        }
        result += "END:" + name;
        return result;
      };
      stringify.property = function(property, designSet, noFold) {
        var name = property[0].toUpperCase();
        var jsName = property[0];
        var params = property[1];
        var line = name;
        var paramName;
        for (paramName in params) {
          var value = params[paramName];
          if (params.hasOwnProperty(paramName)) {
            var multiValue = paramName in designSet.param && designSet.param[paramName].multiValue;
            if (multiValue && Array.isArray(value)) {
              if (designSet.param[paramName].multiValueSeparateDQuote) {
                multiValue = '"' + multiValue + '"';
              }
              value = value.map(stringify._rfc6868Unescape);
              value = stringify.multiValue(value, multiValue, "unknown", null, designSet);
            } else {
              value = stringify._rfc6868Unescape(value);
            }
            line += ";" + paramName.toUpperCase();
            line += "=" + stringify.propertyValue(value);
          }
        }
        if (property.length === 3) {
          return line + ":";
        }
        var valueType = property[2];
        if (!designSet) {
          designSet = design.defaultSet;
        }
        var propDetails;
        var multiValue = false;
        var structuredValue = false;
        var isDefault = false;
        if (jsName in designSet.property) {
          propDetails = designSet.property[jsName];
          if ("multiValue" in propDetails) {
            multiValue = propDetails.multiValue;
          }
          if ("structuredValue" in propDetails && Array.isArray(property[3])) {
            structuredValue = propDetails.structuredValue;
          }
          if ("defaultType" in propDetails) {
            if (valueType === propDetails.defaultType) {
              isDefault = true;
            }
          } else {
            if (valueType === DEFAULT_VALUE_TYPE) {
              isDefault = true;
            }
          }
        } else {
          if (valueType === DEFAULT_VALUE_TYPE) {
            isDefault = true;
          }
        }
        if (!isDefault) {
          line += ";VALUE=" + valueType.toUpperCase();
        }
        line += ":";
        if (multiValue && structuredValue) {
          line += stringify.multiValue(
            property[3],
            structuredValue,
            valueType,
            multiValue,
            designSet,
            structuredValue
          );
        } else if (multiValue) {
          line += stringify.multiValue(
            property.slice(3),
            multiValue,
            valueType,
            null,
            designSet,
            false
          );
        } else if (structuredValue) {
          line += stringify.multiValue(
            property[3],
            structuredValue,
            valueType,
            null,
            designSet,
            structuredValue
          );
        } else {
          line += stringify.value(property[3], valueType, designSet, false);
        }
        return noFold ? line : ICAL2.helpers.foldline(line);
      };
      stringify.propertyValue = function(value) {
        if (helpers.unescapedIndexOf(value, ",") === -1 && helpers.unescapedIndexOf(value, ":") === -1 && helpers.unescapedIndexOf(value, ";") === -1) {
          return value;
        }
        return '"' + value + '"';
      };
      stringify.multiValue = function(values, delim, type, innerMulti, designSet, structuredValue) {
        var result = "";
        var len = values.length;
        var i = 0;
        for (; i < len; i++) {
          if (innerMulti && Array.isArray(values[i])) {
            result += stringify.multiValue(values[i], innerMulti, type, null, designSet, structuredValue);
          } else {
            result += stringify.value(values[i], type, designSet, structuredValue);
          }
          if (i !== len - 1) {
            result += delim;
          }
        }
        return result;
      };
      stringify.value = function(value, type, designSet, structuredValue) {
        if (type in designSet.value && "toICAL" in designSet.value[type]) {
          return designSet.value[type].toICAL(value, structuredValue);
        }
        return value;
      };
      stringify._rfc6868Unescape = function(val) {
        return val.replace(/[\n^"]/g, function(x) {
          return RFC6868_REPLACE_MAP[x];
        });
      };
      var RFC6868_REPLACE_MAP = { '"': "^'", "\n": "^n", "^": "^^" };
      return stringify;
    }();
    ICAL2.parse = function() {
      "use strict";
      var CHAR = /[^ \t]/;
      var MULTIVALUE_DELIMITER = ",";
      var VALUE_DELIMITER = ":";
      var PARAM_DELIMITER = ";";
      var PARAM_NAME_DELIMITER = "=";
      var DEFAULT_VALUE_TYPE = "unknown";
      var DEFAULT_PARAM_TYPE = "text";
      var design = ICAL2.design;
      var helpers = ICAL2.helpers;
      function ParserError(message) {
        this.message = message;
        this.name = "ParserError";
        try {
          throw new Error();
        } catch (e) {
          if (e.stack) {
            var split = e.stack.split("\n");
            split.shift();
            this.stack = split.join("\n");
          }
        }
      }
      ParserError.prototype = Error.prototype;
      function parser(input) {
        var state = {};
        var root = state.component = [];
        state.stack = [root];
        parser._eachLine(input, function(err, line) {
          parser._handleContentLine(line, state);
        });
        if (state.stack.length > 1) {
          throw new ParserError(
            "invalid ical body. component began but did not end"
          );
        }
        state = null;
        return root.length == 1 ? root[0] : root;
      }
      parser.property = function(str, designSet) {
        var state = {
          component: [[], []],
          designSet: designSet || design.defaultSet
        };
        parser._handleContentLine(str, state);
        return state.component[1][0];
      };
      parser.component = function(str) {
        return parser(str);
      };
      parser.ParserError = ParserError;
      parser._handleContentLine = function(line, state) {
        var valuePos = line.indexOf(VALUE_DELIMITER);
        var paramPos = line.indexOf(PARAM_DELIMITER);
        var lastParamIndex;
        var lastValuePos;
        var name;
        var value;
        var params = {};
        if (paramPos !== -1 && valuePos !== -1) {
          if (paramPos > valuePos) {
            paramPos = -1;
          }
        }
        var parsedParams;
        if (paramPos !== -1) {
          name = line.substring(0, paramPos).toLowerCase();
          parsedParams = parser._parseParameters(line.substring(paramPos), 0, state.designSet);
          if (parsedParams[2] == -1) {
            throw new ParserError("Invalid parameters in '" + line + "'");
          }
          params = parsedParams[0];
          lastParamIndex = parsedParams[1].length + parsedParams[2] + paramPos;
          if ((lastValuePos = line.substring(lastParamIndex).indexOf(VALUE_DELIMITER)) !== -1) {
            value = line.substring(lastParamIndex + lastValuePos + 1);
          } else {
            throw new ParserError("Missing parameter value in '" + line + "'");
          }
        } else if (valuePos !== -1) {
          name = line.substring(0, valuePos).toLowerCase();
          value = line.substring(valuePos + 1);
          if (name === "begin") {
            var newComponent = [value.toLowerCase(), [], []];
            if (state.stack.length === 1) {
              state.component.push(newComponent);
            } else {
              state.component[2].push(newComponent);
            }
            state.stack.push(state.component);
            state.component = newComponent;
            if (!state.designSet) {
              state.designSet = design.getDesignSet(state.component[0]);
            }
            return;
          } else if (name === "end") {
            state.component = state.stack.pop();
            return;
          }
        } else {
          throw new ParserError(
            'invalid line (no token ";" or ":") "' + line + '"'
          );
        }
        var valueType;
        var multiValue = false;
        var structuredValue = false;
        var propertyDetails;
        if (name in state.designSet.property) {
          propertyDetails = state.designSet.property[name];
          if ("multiValue" in propertyDetails) {
            multiValue = propertyDetails.multiValue;
          }
          if ("structuredValue" in propertyDetails) {
            structuredValue = propertyDetails.structuredValue;
          }
          if (value && "detectType" in propertyDetails) {
            valueType = propertyDetails.detectType(value);
          }
        }
        if (!valueType) {
          if (!("value" in params)) {
            if (propertyDetails) {
              valueType = propertyDetails.defaultType;
            } else {
              valueType = DEFAULT_VALUE_TYPE;
            }
          } else {
            valueType = params.value.toLowerCase();
          }
        }
        delete params.value;
        var result;
        if (multiValue && structuredValue) {
          value = parser._parseMultiValue(value, structuredValue, valueType, [], multiValue, state.designSet, structuredValue);
          result = [name, params, valueType, value];
        } else if (multiValue) {
          result = [name, params, valueType];
          parser._parseMultiValue(value, multiValue, valueType, result, null, state.designSet, false);
        } else if (structuredValue) {
          value = parser._parseMultiValue(value, structuredValue, valueType, [], null, state.designSet, structuredValue);
          result = [name, params, valueType, value];
        } else {
          value = parser._parseValue(value, valueType, state.designSet, false);
          result = [name, params, valueType, value];
        }
        if (state.component[0] === "vcard" && state.component[1].length === 0 && !(name === "version" && value === "4.0")) {
          state.designSet = design.getDesignSet("vcard3");
        }
        state.component[1].push(result);
      };
      parser._parseValue = function(value, type, designSet, structuredValue) {
        if (type in designSet.value && "fromICAL" in designSet.value[type]) {
          return designSet.value[type].fromICAL(value, structuredValue);
        }
        return value;
      };
      parser._parseParameters = function(line, start, designSet) {
        var lastParam = start;
        var pos = 0;
        var delim = PARAM_NAME_DELIMITER;
        var result = {};
        var name, lcname;
        var value, valuePos = -1;
        var type, multiValue, mvdelim;
        while (pos !== false && (pos = helpers.unescapedIndexOf(line, delim, pos + 1)) !== -1) {
          name = line.substr(lastParam + 1, pos - lastParam - 1);
          if (name.length == 0) {
            throw new ParserError("Empty parameter name in '" + line + "'");
          }
          lcname = name.toLowerCase();
          mvdelim = false;
          multiValue = false;
          if (lcname in designSet.param && designSet.param[lcname].valueType) {
            type = designSet.param[lcname].valueType;
          } else {
            type = DEFAULT_PARAM_TYPE;
          }
          if (lcname in designSet.param) {
            multiValue = designSet.param[lcname].multiValue;
            if (designSet.param[lcname].multiValueSeparateDQuote) {
              mvdelim = parser._rfc6868Escape('"' + multiValue + '"');
            }
          }
          var nextChar = line[pos + 1];
          if (nextChar === '"') {
            valuePos = pos + 2;
            pos = helpers.unescapedIndexOf(line, '"', valuePos);
            if (multiValue && pos != -1) {
              var extendedValue = true;
              while (extendedValue) {
                if (line[pos + 1] == multiValue && line[pos + 2] == '"') {
                  pos = helpers.unescapedIndexOf(line, '"', pos + 3);
                } else {
                  extendedValue = false;
                }
              }
            }
            if (pos === -1) {
              throw new ParserError(
                'invalid line (no matching double quote) "' + line + '"'
              );
            }
            value = line.substr(valuePos, pos - valuePos);
            lastParam = helpers.unescapedIndexOf(line, PARAM_DELIMITER, pos);
            if (lastParam === -1) {
              pos = false;
            }
          } else {
            valuePos = pos + 1;
            var nextPos = helpers.unescapedIndexOf(line, PARAM_DELIMITER, valuePos);
            var propValuePos = helpers.unescapedIndexOf(line, VALUE_DELIMITER, valuePos);
            if (propValuePos !== -1 && nextPos > propValuePos) {
              nextPos = propValuePos;
              pos = false;
            } else if (nextPos === -1) {
              if (propValuePos === -1) {
                nextPos = line.length;
              } else {
                nextPos = propValuePos;
              }
              pos = false;
            } else {
              lastParam = nextPos;
              pos = nextPos;
            }
            value = line.substr(valuePos, nextPos - valuePos);
          }
          value = parser._rfc6868Escape(value);
          if (multiValue) {
            var delimiter = mvdelim || multiValue;
            value = parser._parseMultiValue(value, delimiter, type, [], null, designSet);
          } else {
            value = parser._parseValue(value, type, designSet);
          }
          if (multiValue && lcname in result) {
            if (Array.isArray(result[lcname])) {
              result[lcname].push(value);
            } else {
              result[lcname] = [
                result[lcname],
                value
              ];
            }
          } else {
            result[lcname] = value;
          }
        }
        return [result, value, valuePos];
      };
      parser._rfc6868Escape = function(val) {
        return val.replace(/\^['n^]/g, function(x) {
          return RFC6868_REPLACE_MAP[x];
        });
      };
      var RFC6868_REPLACE_MAP = { "^'": '"', "^n": "\n", "^^": "^" };
      parser._parseMultiValue = function(buffer, delim, type, result, innerMulti, designSet, structuredValue) {
        var pos = 0;
        var lastPos = 0;
        var value;
        if (delim.length === 0) {
          return buffer;
        }
        while ((pos = helpers.unescapedIndexOf(buffer, delim, lastPos)) !== -1) {
          value = buffer.substr(lastPos, pos - lastPos);
          if (innerMulti) {
            value = parser._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
          } else {
            value = parser._parseValue(value, type, designSet, structuredValue);
          }
          result.push(value);
          lastPos = pos + delim.length;
        }
        value = buffer.substr(lastPos);
        if (innerMulti) {
          value = parser._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
        } else {
          value = parser._parseValue(value, type, designSet, structuredValue);
        }
        result.push(value);
        return result.length == 1 ? result[0] : result;
      };
      parser._eachLine = function(buffer, callback) {
        var len = buffer.length;
        var lastPos = buffer.search(CHAR);
        var pos = lastPos;
        var line;
        var firstChar;
        var newlineOffset;
        do {
          pos = buffer.indexOf("\n", lastPos) + 1;
          if (pos > 1 && buffer[pos - 2] === "\r") {
            newlineOffset = 2;
          } else {
            newlineOffset = 1;
          }
          if (pos === 0) {
            pos = len;
            newlineOffset = 0;
          }
          firstChar = buffer[lastPos];
          if (firstChar === " " || firstChar === "	") {
            line += buffer.substr(
              lastPos + 1,
              pos - lastPos - (newlineOffset + 1)
            );
          } else {
            if (line)
              callback(null, line);
            line = buffer.substr(
              lastPos,
              pos - lastPos - newlineOffset
            );
          }
          lastPos = pos;
        } while (pos !== len);
        line = line.trim();
        if (line.length)
          callback(null, line);
      };
      return parser;
    }();
    ICAL2.Component = function() {
      "use strict";
      var PROPERTY_INDEX = 1;
      var COMPONENT_INDEX = 2;
      var NAME_INDEX = 0;
      function Component2(jCal, parent) {
        if (typeof jCal === "string") {
          jCal = [jCal, [], []];
        }
        this.jCal = jCal;
        this.parent = parent || null;
      }
      Component2.prototype = {
        /**
         * Hydrated properties are inserted into the _properties array at the same
         * position as in the jCal array, so it is possible that the array contains
         * undefined values for unhydrdated properties. To avoid iterating the
         * array when checking if all properties have been hydrated, we save the
         * count here.
         *
         * @type {Number}
         * @private
         */
        _hydratedPropertyCount: 0,
        /**
         * The same count as for _hydratedPropertyCount, but for subcomponents
         *
         * @type {Number}
         * @private
         */
        _hydratedComponentCount: 0,
        /**
         * The name of this component
         * @readonly
         */
        get name() {
          return this.jCal[NAME_INDEX];
        },
        /**
         * The design set for this component, e.g. icalendar vs vcard
         *
         * @type {ICAL.design.designSet}
         * @private
         */
        get _designSet() {
          var parentDesign = this.parent && this.parent._designSet;
          return parentDesign || ICAL2.design.getDesignSet(this.name);
        },
        _hydrateComponent: function(index) {
          if (!this._components) {
            this._components = [];
            this._hydratedComponentCount = 0;
          }
          if (this._components[index]) {
            return this._components[index];
          }
          var comp = new Component2(
            this.jCal[COMPONENT_INDEX][index],
            this
          );
          this._hydratedComponentCount++;
          return this._components[index] = comp;
        },
        _hydrateProperty: function(index) {
          if (!this._properties) {
            this._properties = [];
            this._hydratedPropertyCount = 0;
          }
          if (this._properties[index]) {
            return this._properties[index];
          }
          var prop = new ICAL2.Property(
            this.jCal[PROPERTY_INDEX][index],
            this
          );
          this._hydratedPropertyCount++;
          return this._properties[index] = prop;
        },
        /**
         * Finds first sub component, optionally filtered by name.
         *
         * @param {String=} name        Optional name to filter by
         * @return {?ICAL.Component}     The found subcomponent
         */
        getFirstSubcomponent: function(name) {
          if (name) {
            var i = 0;
            var comps = this.jCal[COMPONENT_INDEX];
            var len = comps.length;
            for (; i < len; i++) {
              if (comps[i][NAME_INDEX] === name) {
                var result = this._hydrateComponent(i);
                return result;
              }
            }
          } else {
            if (this.jCal[COMPONENT_INDEX].length) {
              return this._hydrateComponent(0);
            }
          }
          return null;
        },
        /**
         * Finds all sub components, optionally filtering by name.
         *
         * @param {String=} name            Optional name to filter by
         * @return {ICAL.Component[]}       The found sub components
         */
        getAllSubcomponents: function(name) {
          var jCalLen = this.jCal[COMPONENT_INDEX].length;
          var i = 0;
          if (name) {
            var comps = this.jCal[COMPONENT_INDEX];
            var result = [];
            for (; i < jCalLen; i++) {
              if (name === comps[i][NAME_INDEX]) {
                result.push(
                  this._hydrateComponent(i)
                );
              }
            }
            return result;
          } else {
            if (!this._components || this._hydratedComponentCount !== jCalLen) {
              for (; i < jCalLen; i++) {
                this._hydrateComponent(i);
              }
            }
            return this._components || [];
          }
        },
        /**
         * Returns true when a named property exists.
         *
         * @param {String} name     The property name
         * @return {Boolean}        True, when property is found
         */
        hasProperty: function(name) {
          var props = this.jCal[PROPERTY_INDEX];
          var len = props.length;
          var i = 0;
          for (; i < len; i++) {
            if (props[i][NAME_INDEX] === name) {
              return true;
            }
          }
          return false;
        },
        /**
         * Finds the first property, optionally with the given name.
         *
         * @param {String=} name        Lowercase property name
         * @return {?ICAL.Property}     The found property
         */
        getFirstProperty: function(name) {
          if (name) {
            var i = 0;
            var props = this.jCal[PROPERTY_INDEX];
            var len = props.length;
            for (; i < len; i++) {
              if (props[i][NAME_INDEX] === name) {
                var result = this._hydrateProperty(i);
                return result;
              }
            }
          } else {
            if (this.jCal[PROPERTY_INDEX].length) {
              return this._hydrateProperty(0);
            }
          }
          return null;
        },
        /**
         * Returns first property's value, if available.
         *
         * @param {String=} name    Lowercase property name
         * @return {?String}        The found property value.
         */
        getFirstPropertyValue: function(name) {
          var prop = this.getFirstProperty(name);
          if (prop) {
            return prop.getFirstValue();
          }
          return null;
        },
        /**
         * Get all properties in the component, optionally filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {ICAL.Property[]}    List of properties
         */
        getAllProperties: function(name) {
          var jCalLen = this.jCal[PROPERTY_INDEX].length;
          var i = 0;
          if (name) {
            var props = this.jCal[PROPERTY_INDEX];
            var result = [];
            for (; i < jCalLen; i++) {
              if (name === props[i][NAME_INDEX]) {
                result.push(
                  this._hydrateProperty(i)
                );
              }
            }
            return result;
          } else {
            if (!this._properties || this._hydratedPropertyCount !== jCalLen) {
              for (; i < jCalLen; i++) {
                this._hydrateProperty(i);
              }
            }
            return this._properties || [];
          }
        },
        _removeObjectByIndex: function(jCalIndex, cache, index) {
          cache = cache || [];
          if (cache[index]) {
            var obj = cache[index];
            if ("parent" in obj) {
              obj.parent = null;
            }
          }
          cache.splice(index, 1);
          this.jCal[jCalIndex].splice(index, 1);
        },
        _removeObject: function(jCalIndex, cache, nameOrObject) {
          var i = 0;
          var objects = this.jCal[jCalIndex];
          var len = objects.length;
          var cached = this[cache];
          if (typeof nameOrObject === "string") {
            for (; i < len; i++) {
              if (objects[i][NAME_INDEX] === nameOrObject) {
                this._removeObjectByIndex(jCalIndex, cached, i);
                return true;
              }
            }
          } else if (cached) {
            for (; i < len; i++) {
              if (cached[i] && cached[i] === nameOrObject) {
                this._removeObjectByIndex(jCalIndex, cached, i);
                return true;
              }
            }
          }
          return false;
        },
        _removeAllObjects: function(jCalIndex, cache, name) {
          var cached = this[cache];
          var objects = this.jCal[jCalIndex];
          var i = objects.length - 1;
          for (; i >= 0; i--) {
            if (!name || objects[i][NAME_INDEX] === name) {
              this._removeObjectByIndex(jCalIndex, cached, i);
            }
          }
        },
        /**
         * Adds a single sub component.
         *
         * @param {ICAL.Component} component        The component to add
         * @return {ICAL.Component}                 The passed in component
         */
        addSubcomponent: function(component) {
          if (!this._components) {
            this._components = [];
            this._hydratedComponentCount = 0;
          }
          if (component.parent) {
            component.parent.removeSubcomponent(component);
          }
          var idx = this.jCal[COMPONENT_INDEX].push(component.jCal);
          this._components[idx - 1] = component;
          this._hydratedComponentCount++;
          component.parent = this;
          return component;
        },
        /**
         * Removes a single component by name or the instance of a specific
         * component.
         *
         * @param {ICAL.Component|String} nameOrComp    Name of component, or component
         * @return {Boolean}                            True when comp is removed
         */
        removeSubcomponent: function(nameOrComp) {
          var removed = this._removeObject(COMPONENT_INDEX, "_components", nameOrComp);
          if (removed) {
            this._hydratedComponentCount--;
          }
          return removed;
        },
        /**
         * Removes all components or (if given) all components by a particular
         * name.
         *
         * @param {String=} name            Lowercase component name
         */
        removeAllSubcomponents: function(name) {
          var removed = this._removeAllObjects(COMPONENT_INDEX, "_components", name);
          this._hydratedComponentCount = 0;
          return removed;
        },
        /**
         * Adds an {@link ICAL.Property} to the component.
         *
         * @param {ICAL.Property} property      The property to add
         * @return {ICAL.Property}              The passed in property
         */
        addProperty: function(property) {
          if (!(property instanceof ICAL2.Property)) {
            throw new TypeError("must instance of ICAL.Property");
          }
          if (!this._properties) {
            this._properties = [];
            this._hydratedPropertyCount = 0;
          }
          if (property.parent) {
            property.parent.removeProperty(property);
          }
          var idx = this.jCal[PROPERTY_INDEX].push(property.jCal);
          this._properties[idx - 1] = property;
          this._hydratedPropertyCount++;
          property.parent = this;
          return property;
        },
        /**
         * Helper method to add a property with a value to the component.
         *
         * @param {String}               name         Property name to add
         * @param {String|Number|Object} value        Property value
         * @return {ICAL.Property}                    The created property
         */
        addPropertyWithValue: function(name, value) {
          var prop = new ICAL2.Property(name);
          prop.setValue(value);
          this.addProperty(prop);
          return prop;
        },
        /**
         * Helper method that will update or create a property of the given name
         * and sets its value. If multiple properties with the given name exist,
         * only the first is updated.
         *
         * @param {String}               name         Property name to update
         * @param {String|Number|Object} value        Property value
         * @return {ICAL.Property}                    The created property
         */
        updatePropertyWithValue: function(name, value) {
          var prop = this.getFirstProperty(name);
          if (prop) {
            prop.setValue(value);
          } else {
            prop = this.addPropertyWithValue(name, value);
          }
          return prop;
        },
        /**
         * Removes a single property by name or the instance of the specific
         * property.
         *
         * @param {String|ICAL.Property} nameOrProp     Property name or instance to remove
         * @return {Boolean}                            True, when deleted
         */
        removeProperty: function(nameOrProp) {
          var removed = this._removeObject(PROPERTY_INDEX, "_properties", nameOrProp);
          if (removed) {
            this._hydratedPropertyCount--;
          }
          return removed;
        },
        /**
         * Removes all properties associated with this component, optionally
         * filtered by name.
         *
         * @param {String=} name        Lowercase property name
         * @return {Boolean}            True, when deleted
         */
        removeAllProperties: function(name) {
          var removed = this._removeAllObjects(PROPERTY_INDEX, "_properties", name);
          this._hydratedPropertyCount = 0;
          return removed;
        },
        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        toJSON: function() {
          return this.jCal;
        },
        /**
         * The string representation of this component.
         * @return {String}
         */
        toString: function() {
          return ICAL2.stringify.component(
            this.jCal,
            this._designSet
          );
        }
      };
      Component2.fromString = function(str) {
        return new Component2(ICAL2.parse.component(str));
      };
      return Component2;
    }();
    ICAL2.Property = function() {
      "use strict";
      var NAME_INDEX = 0;
      var PROP_INDEX = 1;
      var TYPE_INDEX = 2;
      var VALUE_INDEX = 3;
      var design = ICAL2.design;
      function Property(jCal, parent) {
        this._parent = parent || null;
        if (typeof jCal === "string") {
          this.jCal = [jCal, {}, design.defaultType];
          this.jCal[TYPE_INDEX] = this.getDefaultType();
        } else {
          this.jCal = jCal;
        }
        this._updateType();
      }
      Property.prototype = {
        /**
         * The value type for this property
         * @readonly
         * @type {String}
         */
        get type() {
          return this.jCal[TYPE_INDEX];
        },
        /**
         * The name of this property, in lowercase.
         * @readonly
         * @type {String}
         */
        get name() {
          return this.jCal[NAME_INDEX];
        },
        /**
         * The parent component for this property.
         * @type {ICAL.Component}
         */
        get parent() {
          return this._parent;
        },
        set parent(p) {
          var designSetChanged = !this._parent || p && p._designSet != this._parent._designSet;
          this._parent = p;
          if (this.type == design.defaultType && designSetChanged) {
            this.jCal[TYPE_INDEX] = this.getDefaultType();
            this._updateType();
          }
          return p;
        },
        /**
         * The design set for this property, e.g. icalendar vs vcard
         *
         * @type {ICAL.design.designSet}
         * @private
         */
        get _designSet() {
          return this.parent ? this.parent._designSet : design.defaultSet;
        },
        /**
         * Updates the type metadata from the current jCal type and design set.
         *
         * @private
         */
        _updateType: function() {
          var designSet = this._designSet;
          if (this.type in designSet.value) {
            var designType = designSet.value[this.type];
            if ("decorate" in designSet.value[this.type]) {
              this.isDecorated = true;
            } else {
              this.isDecorated = false;
            }
            if (this.name in designSet.property) {
              this.isMultiValue = "multiValue" in designSet.property[this.name];
              this.isStructuredValue = "structuredValue" in designSet.property[this.name];
            }
          }
        },
        /**
         * Hydrate a single value. The act of hydrating means turning the raw jCal
         * value into a potentially wrapped object, for example {@link ICAL.Time}.
         *
         * @private
         * @param {Number} index        The index of the value to hydrate
         * @return {Object}             The decorated value.
         */
        _hydrateValue: function(index) {
          if (this._values && this._values[index]) {
            return this._values[index];
          }
          if (this.jCal.length <= VALUE_INDEX + index) {
            return null;
          }
          if (this.isDecorated) {
            if (!this._values) {
              this._values = [];
            }
            return this._values[index] = this._decorate(
              this.jCal[VALUE_INDEX + index]
            );
          } else {
            return this.jCal[VALUE_INDEX + index];
          }
        },
        /**
         * Decorate a single value, returning its wrapped object. This is used by
         * the hydrate function to actually wrap the value.
         *
         * @private
         * @param {?} value         The value to decorate
         * @return {Object}         The decorated value
         */
        _decorate: function(value) {
          return this._designSet.value[this.type].decorate(value, this);
        },
        /**
         * Undecorate a single value, returning its raw jCal data.
         *
         * @private
         * @param {Object} value         The value to undecorate
         * @return {?}                   The undecorated value
         */
        _undecorate: function(value) {
          return this._designSet.value[this.type].undecorate(value, this);
        },
        /**
         * Sets the value at the given index while also hydrating it. The passed
         * value can either be a decorated or undecorated value.
         *
         * @private
         * @param {?} value             The value to set
         * @param {Number} index        The index to set it at
         */
        _setDecoratedValue: function(value, index) {
          if (!this._values) {
            this._values = [];
          }
          if (typeof value === "object" && "icaltype" in value) {
            this.jCal[VALUE_INDEX + index] = this._undecorate(value);
            this._values[index] = value;
          } else {
            this.jCal[VALUE_INDEX + index] = value;
            this._values[index] = this._decorate(value);
          }
        },
        /**
         * Gets a parameter on the property.
         *
         * @param {String}        name   Parameter name (lowercase)
         * @return {Array|String}        Parameter value
         */
        getParameter: function(name) {
          if (name in this.jCal[PROP_INDEX]) {
            return this.jCal[PROP_INDEX][name];
          } else {
            return void 0;
          }
        },
        /**
         * Gets first parameter on the property.
         *
         * @param {String}        name   Parameter name (lowercase)
         * @return {String}        Parameter value
         */
        getFirstParameter: function(name) {
          var parameters = this.getParameter(name);
          if (Array.isArray(parameters)) {
            return parameters[0];
          }
          return parameters;
        },
        /**
         * Sets a parameter on the property.
         *
         * @param {String}       name     The parameter name
         * @param {Array|String} value    The parameter value
         */
        setParameter: function(name, value) {
          var lcname = name.toLowerCase();
          if (typeof value === "string" && lcname in this._designSet.param && "multiValue" in this._designSet.param[lcname]) {
            value = [value];
          }
          this.jCal[PROP_INDEX][name] = value;
        },
        /**
         * Removes a parameter
         *
         * @param {String} name     The parameter name
         */
        removeParameter: function(name) {
          delete this.jCal[PROP_INDEX][name];
        },
        /**
         * Get the default type based on this property's name.
         *
         * @return {String}     The default type for this property
         */
        getDefaultType: function() {
          var name = this.jCal[NAME_INDEX];
          var designSet = this._designSet;
          if (name in designSet.property) {
            var details = designSet.property[name];
            if ("defaultType" in details) {
              return details.defaultType;
            }
          }
          return design.defaultType;
        },
        /**
         * Sets type of property and clears out any existing values of the current
         * type.
         *
         * @param {String} type     New iCAL type (see design.*.values)
         */
        resetType: function(type) {
          this.removeAllValues();
          this.jCal[TYPE_INDEX] = type;
          this._updateType();
        },
        /**
         * Finds the first property value.
         *
         * @return {String}         First property value
         */
        getFirstValue: function() {
          return this._hydrateValue(0);
        },
        /**
         * Gets all values on the property.
         *
         * NOTE: this creates an array during each call.
         *
         * @return {Array}          List of values
         */
        getValues: function() {
          var len = this.jCal.length - VALUE_INDEX;
          if (len < 1) {
            return [];
          }
          var i = 0;
          var result = [];
          for (; i < len; i++) {
            result[i] = this._hydrateValue(i);
          }
          return result;
        },
        /**
         * Removes all values from this property
         */
        removeAllValues: function() {
          if (this._values) {
            this._values.length = 0;
          }
          this.jCal.length = 3;
        },
        /**
         * Sets the values of the property.  Will overwrite the existing values.
         * This can only be used for multi-value properties.
         *
         * @param {Array} values    An array of values
         */
        setValues: function(values) {
          if (!this.isMultiValue) {
            throw new Error(
              this.name + ": does not not support mulitValue.\noverride isMultiValue"
            );
          }
          var len = values.length;
          var i = 0;
          this.removeAllValues();
          if (len > 0 && typeof values[0] === "object" && "icaltype" in values[0]) {
            this.resetType(values[0].icaltype);
          }
          if (this.isDecorated) {
            for (; i < len; i++) {
              this._setDecoratedValue(values[i], i);
            }
          } else {
            for (; i < len; i++) {
              this.jCal[VALUE_INDEX + i] = values[i];
            }
          }
        },
        /**
         * Sets the current value of the property. If this is a multi-value
         * property, all other values will be removed.
         *
         * @param {String|Object} value     New property value.
         */
        setValue: function(value) {
          this.removeAllValues();
          if (typeof value === "object" && "icaltype" in value) {
            this.resetType(value.icaltype);
          }
          if (this.isDecorated) {
            this._setDecoratedValue(value, 0);
          } else {
            this.jCal[VALUE_INDEX] = value;
          }
        },
        /**
         * Returns the Object representation of this component. The returned object
         * is a live jCal object and should be cloned if modified.
         * @return {Object}
         */
        toJSON: function() {
          return this.jCal;
        },
        /**
         * The string representation of this component.
         * @return {String}
         */
        toICALString: function() {
          return ICAL2.stringify.property(
            this.jCal,
            this._designSet,
            true
          );
        }
      };
      Property.fromString = function(str, designSet) {
        return new Property(ICAL2.parse.property(str, designSet));
      };
      return Property;
    }();
    ICAL2.UtcOffset = function() {
      function UtcOffset(aData) {
        this.fromData(aData);
      }
      UtcOffset.prototype = {
        /**
         * The hours in the utc-offset
         * @type {Number}
         */
        hours: 0,
        /**
         * The minutes in the utc-offset
         * @type {Number}
         */
        minutes: 0,
        /**
         * The sign of the utc offset, 1 for positive offset, -1 for negative
         * offsets.
         * @type {Number}
         */
        factor: 1,
        /**
         * The type name, to be used in the jCal object.
         * @constant
         * @type {String}
         * @default "utc-offset"
         */
        icaltype: "utc-offset",
        /**
         * Returns a clone of the utc offset object.
         *
         * @return {ICAL.UtcOffset}     The cloned object
         */
        clone: function() {
          return ICAL2.UtcOffset.fromSeconds(this.toSeconds());
        },
        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {Object} aData          An object with members of the utc offset
         * @param {Number=} aData.hours   The hours for the utc offset
         * @param {Number=} aData.minutes The minutes in the utc offset
         * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
         */
        fromData: function(aData) {
          if (aData) {
            for (var key in aData) {
              if (aData.hasOwnProperty(key)) {
                this[key] = aData[key];
              }
            }
          }
          this._normalize();
        },
        /**
         * Sets up the current instance from the given seconds value. The seconds
         * value is truncated to the minute. Offsets are wrapped when the world
         * ends, the hour after UTC+14:00 is UTC-12:00.
         *
         * @param {Number} aSeconds         The seconds to convert into an offset
         */
        fromSeconds: function(aSeconds) {
          var secs = Math.abs(aSeconds);
          this.factor = aSeconds < 0 ? -1 : 1;
          this.hours = ICAL2.helpers.trunc(secs / 3600);
          secs -= this.hours * 3600;
          this.minutes = ICAL2.helpers.trunc(secs / 60);
          return this;
        },
        /**
         * Convert the current offset to a value in seconds
         *
         * @return {Number}                 The offset in seconds
         */
        toSeconds: function() {
          return this.factor * (60 * this.minutes + 3600 * this.hours);
        },
        /**
         * Compare this utc offset with another one.
         *
         * @param {ICAL.UtcOffset} other        The other offset to compare with
         * @return {Number}                     -1, 0 or 1 for less/equal/greater
         */
        compare: function icaltime_compare(other) {
          var a = this.toSeconds();
          var b = other.toSeconds();
          return (a > b) - (b > a);
        },
        _normalize: function() {
          var secs = this.toSeconds();
          var factor = this.factor;
          while (secs < -43200) {
            secs += 97200;
          }
          while (secs > 50400) {
            secs -= 97200;
          }
          this.fromSeconds(secs);
          if (secs == 0) {
            this.factor = factor;
          }
        },
        /**
         * The iCalendar string representation of this utc-offset.
         * @return {String}
         */
        toICALString: function() {
          return ICAL2.design.icalendar.value["utc-offset"].toICAL(this.toString());
        },
        /**
         * The string representation of this utc-offset.
         * @return {String}
         */
        toString: function toString() {
          return (this.factor == 1 ? "+" : "-") + ICAL2.helpers.pad2(this.hours) + ":" + ICAL2.helpers.pad2(this.minutes);
        }
      };
      UtcOffset.fromString = function(aString) {
        var options = {};
        options.factor = aString[0] === "+" ? 1 : -1;
        options.hours = ICAL2.helpers.strictParseInt(aString.substr(1, 2));
        options.minutes = ICAL2.helpers.strictParseInt(aString.substr(4, 2));
        return new ICAL2.UtcOffset(options);
      };
      UtcOffset.fromSeconds = function(aSeconds) {
        var instance = new UtcOffset();
        instance.fromSeconds(aSeconds);
        return instance;
      };
      return UtcOffset;
    }();
    ICAL2.Binary = function() {
      function Binary(aValue) {
        this.value = aValue;
      }
      Binary.prototype = {
        /**
         * The type name, to be used in the jCal object.
         * @default "binary"
         * @constant
         */
        icaltype: "binary",
        /**
         * Base64 decode the current value
         *
         * @return {String}         The base64-decoded value
         */
        decodeValue: function decodeValue() {
          return this._b64_decode(this.value);
        },
        /**
         * Encodes the passed parameter with base64 and sets the internal
         * value to the result.
         *
         * @param {String} aValue      The raw binary value to encode
         */
        setEncodedValue: function setEncodedValue(aValue) {
          this.value = this._b64_encode(aValue);
        },
        _b64_encode: function base64_encode(data) {
          var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
          if (!data) {
            return data;
          }
          do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 63;
            h2 = bits >> 12 & 63;
            h3 = bits >> 6 & 63;
            h4 = bits & 63;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
          } while (i < data.length);
          enc = tmp_arr.join("");
          var r = data.length % 3;
          return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
        },
        _b64_decode: function base64_decode(data) {
          var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
          if (!data) {
            return data;
          }
          data += "";
          do {
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 255;
            o2 = bits >> 8 & 255;
            o3 = bits & 255;
            if (h3 == 64) {
              tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
              tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
              tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
          } while (i < data.length);
          dec = tmp_arr.join("");
          return dec;
        },
        /**
         * The string representation of this value
         * @return {String}
         */
        toString: function() {
          return this.value;
        }
      };
      Binary.fromString = function(aString) {
        return new Binary(aString);
      };
      return Binary;
    }();
    (function() {
      ICAL2.Period = function icalperiod(aData) {
        this.wrappedJSObject = this;
        if (aData && "start" in aData) {
          if (aData.start && !(aData.start instanceof ICAL2.Time)) {
            throw new TypeError(".start must be an instance of ICAL.Time");
          }
          this.start = aData.start;
        }
        if (aData && aData.end && aData.duration) {
          throw new Error("cannot accept both end and duration");
        }
        if (aData && "end" in aData) {
          if (aData.end && !(aData.end instanceof ICAL2.Time)) {
            throw new TypeError(".end must be an instance of ICAL.Time");
          }
          this.end = aData.end;
        }
        if (aData && "duration" in aData) {
          if (aData.duration && !(aData.duration instanceof ICAL2.Duration)) {
            throw new TypeError(".duration must be an instance of ICAL.Duration");
          }
          this.duration = aData.duration;
        }
      };
      ICAL2.Period.prototype = {
        /**
         * The start of the period
         * @type {ICAL.Time}
         */
        start: null,
        /**
         * The end of the period
         * @type {ICAL.Time}
         */
        end: null,
        /**
         * The duration of the period
         * @type {ICAL.Duration}
         */
        duration: null,
        /**
         * The class identifier.
         * @constant
         * @type {String}
         * @default "icalperiod"
         */
        icalclass: "icalperiod",
        /**
         * The type name, to be used in the jCal object.
         * @constant
         * @type {String}
         * @default "period"
         */
        icaltype: "period",
        /**
         * Returns a clone of the duration object.
         *
         * @return {ICAL.Period}      The cloned object
         */
        clone: function() {
          return ICAL2.Period.fromData({
            start: this.start ? this.start.clone() : null,
            end: this.end ? this.end.clone() : null,
            duration: this.duration ? this.duration.clone() : null
          });
        },
        /**
         * Calculates the duration of the period, either directly or by subtracting
         * start from end date.
         *
         * @return {ICAL.Duration}      The calculated duration
         */
        getDuration: function duration() {
          if (this.duration) {
            return this.duration;
          } else {
            return this.end.subtractDate(this.start);
          }
        },
        /**
         * Calculates the end date of the period, either directly or by adding
         * duration to start date.
         *
         * @return {ICAL.Time}          The calculated end date
         */
        getEnd: function() {
          if (this.end) {
            return this.end;
          } else {
            var end = this.start.clone();
            end.addDuration(this.duration);
            return end;
          }
        },
        /**
         * The string representation of this period.
         * @return {String}
         */
        toString: function toString() {
          return this.start + "/" + (this.end || this.duration);
        },
        /**
         * The jCal representation of this period type.
         * @return {Object}
         */
        toJSON: function() {
          return [this.start.toString(), (this.end || this.duration).toString()];
        },
        /**
         * The iCalendar string representation of this period.
         * @return {String}
         */
        toICALString: function() {
          return this.start.toICALString() + "/" + (this.end || this.duration).toICALString();
        }
      };
      ICAL2.Period.fromString = function fromString(str, prop) {
        var parts = str.split("/");
        if (parts.length !== 2) {
          throw new Error(
            'Invalid string value: "' + str + '" must contain a "/" char.'
          );
        }
        var options = {
          start: ICAL2.Time.fromDateTimeString(parts[0], prop)
        };
        var end = parts[1];
        if (ICAL2.Duration.isValueString(end)) {
          options.duration = ICAL2.Duration.fromString(end);
        } else {
          options.end = ICAL2.Time.fromDateTimeString(end, prop);
        }
        return new ICAL2.Period(options);
      };
      ICAL2.Period.fromData = function fromData(aData) {
        return new ICAL2.Period(aData);
      };
      ICAL2.Period.fromJSON = function(aData, aProp, aLenient) {
        function fromDateOrDateTimeString(aValue, aProp2) {
          if (aLenient) {
            return ICAL2.Time.fromString(aValue, aProp2);
          } else {
            return ICAL2.Time.fromDateTimeString(aValue, aProp2);
          }
        }
        if (ICAL2.Duration.isValueString(aData[1])) {
          return ICAL2.Period.fromData({
            start: fromDateOrDateTimeString(aData[0], aProp),
            duration: ICAL2.Duration.fromString(aData[1])
          });
        } else {
          return ICAL2.Period.fromData({
            start: fromDateOrDateTimeString(aData[0], aProp),
            end: fromDateOrDateTimeString(aData[1], aProp)
          });
        }
      };
    })();
    (function() {
      var DURATION_LETTERS = /([PDWHMTS]{1,1})/;
      ICAL2.Duration = function icalduration(data) {
        this.wrappedJSObject = this;
        this.fromData(data);
      };
      ICAL2.Duration.prototype = {
        /**
         * The weeks in this duration
         * @type {Number}
         * @default 0
         */
        weeks: 0,
        /**
         * The days in this duration
         * @type {Number}
         * @default 0
         */
        days: 0,
        /**
         * The days in this duration
         * @type {Number}
         * @default 0
         */
        hours: 0,
        /**
         * The minutes in this duration
         * @type {Number}
         * @default 0
         */
        minutes: 0,
        /**
         * The seconds in this duration
         * @type {Number}
         * @default 0
         */
        seconds: 0,
        /**
         * The seconds in this duration
         * @type {Boolean}
         * @default false
         */
        isNegative: false,
        /**
         * The class identifier.
         * @constant
         * @type {String}
         * @default "icalduration"
         */
        icalclass: "icalduration",
        /**
         * The type name, to be used in the jCal object.
         * @constant
         * @type {String}
         * @default "duration"
         */
        icaltype: "duration",
        /**
         * Returns a clone of the duration object.
         *
         * @return {ICAL.Duration}      The cloned object
         */
        clone: function clone() {
          return ICAL2.Duration.fromData(this);
        },
        /**
         * The duration value expressed as a number of seconds.
         *
         * @return {Number}             The duration value in seconds
         */
        toSeconds: function toSeconds() {
          var seconds = this.seconds + 60 * this.minutes + 3600 * this.hours + 86400 * this.days + 7 * 86400 * this.weeks;
          return this.isNegative ? -seconds : seconds;
        },
        /**
         * Reads the passed seconds value into this duration object. Afterwards,
         * members like {@link ICAL.Duration#days days} and {@link ICAL.Duration#weeks weeks} will be set up
         * accordingly.
         *
         * @param {Number} aSeconds     The duration value in seconds
         * @return {ICAL.Duration}      Returns this instance
         */
        fromSeconds: function fromSeconds(aSeconds) {
          var secs = Math.abs(aSeconds);
          this.isNegative = aSeconds < 0;
          this.days = ICAL2.helpers.trunc(secs / 86400);
          if (this.days % 7 == 0) {
            this.weeks = this.days / 7;
            this.days = 0;
          } else {
            this.weeks = 0;
          }
          secs -= (this.days + 7 * this.weeks) * 86400;
          this.hours = ICAL2.helpers.trunc(secs / 3600);
          secs -= this.hours * 3600;
          this.minutes = ICAL2.helpers.trunc(secs / 60);
          secs -= this.minutes * 60;
          this.seconds = secs;
          return this;
        },
        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {Object} aData               An object with members of the duration
         * @param {Number} aData.weeks         Duration in weeks
         * @param {Number} aData.days          Duration in days
         * @param {Number} aData.hours         Duration in hours
         * @param {Number} aData.minutes       Duration in minutes
         * @param {Number} aData.seconds       Duration in seconds
         * @param {Boolean} aData.isNegative   If true, the duration is negative
         */
        fromData: function fromData(aData) {
          var propsToCopy = [
            "weeks",
            "days",
            "hours",
            "minutes",
            "seconds",
            "isNegative"
          ];
          for (var key in propsToCopy) {
            if (!propsToCopy.hasOwnProperty(key)) {
              continue;
            }
            var prop = propsToCopy[key];
            if (aData && prop in aData) {
              this[prop] = aData[prop];
            } else {
              this[prop] = 0;
            }
          }
        },
        /**
         * Resets the duration instance to the default values, i.e. PT0S
         */
        reset: function reset() {
          this.isNegative = false;
          this.weeks = 0;
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        },
        /**
         * Compares the duration instance with another one.
         *
         * @param {ICAL.Duration} aOther        The instance to compare with
         * @return {Number}                     -1, 0 or 1 for less/equal/greater
         */
        compare: function compare(aOther) {
          var thisSeconds = this.toSeconds();
          var otherSeconds = aOther.toSeconds();
          return (thisSeconds > otherSeconds) - (thisSeconds < otherSeconds);
        },
        /**
         * Normalizes the duration instance. For example, a duration with a value
         * of 61 seconds will be normalized to 1 minute and 1 second.
         */
        normalize: function normalize() {
          this.fromSeconds(this.toSeconds());
        },
        /**
         * The string representation of this duration.
         * @return {String}
         */
        toString: function toString() {
          if (this.toSeconds() == 0) {
            return "PT0S";
          } else {
            var str = "";
            if (this.isNegative)
              str += "-";
            str += "P";
            if (this.weeks)
              str += this.weeks + "W";
            if (this.days)
              str += this.days + "D";
            if (this.hours || this.minutes || this.seconds) {
              str += "T";
              if (this.hours)
                str += this.hours + "H";
              if (this.minutes)
                str += this.minutes + "M";
              if (this.seconds)
                str += this.seconds + "S";
            }
            return str;
          }
        },
        /**
         * The iCalendar string representation of this duration.
         * @return {String}
         */
        toICALString: function() {
          return this.toString();
        }
      };
      ICAL2.Duration.fromSeconds = function icalduration_from_seconds(aSeconds) {
        return new ICAL2.Duration().fromSeconds(aSeconds);
      };
      function parseDurationChunk(letter, number, object) {
        var type;
        switch (letter) {
          case "P":
            if (number && number === "-") {
              object.isNegative = true;
            } else {
              object.isNegative = false;
            }
            break;
          case "D":
            type = "days";
            break;
          case "W":
            type = "weeks";
            break;
          case "H":
            type = "hours";
            break;
          case "M":
            type = "minutes";
            break;
          case "S":
            type = "seconds";
            break;
          default:
            return 0;
        }
        if (type) {
          if (!number && number !== 0) {
            throw new Error(
              'invalid duration value: Missing number before "' + letter + '"'
            );
          }
          var num = parseInt(number, 10);
          if (ICAL2.helpers.isStrictlyNaN(num)) {
            throw new Error(
              'invalid duration value: Invalid number "' + number + '" before "' + letter + '"'
            );
          }
          object[type] = num;
        }
        return 1;
      }
      ICAL2.Duration.isValueString = function(string) {
        return string[0] === "P" || string[1] === "P";
      };
      ICAL2.Duration.fromString = function icalduration_from_string(aStr) {
        var pos = 0;
        var dict = /* @__PURE__ */ Object.create(null);
        var chunks = 0;
        while ((pos = aStr.search(DURATION_LETTERS)) !== -1) {
          var type = aStr[pos];
          var numeric = aStr.substr(0, pos);
          aStr = aStr.substr(pos + 1);
          chunks += parseDurationChunk(type, numeric, dict);
        }
        if (chunks < 2) {
          throw new Error(
            'invalid duration value: Not enough duration components in "' + aStr + '"'
          );
        }
        return new ICAL2.Duration(dict);
      };
      ICAL2.Duration.fromData = function icalduration_from_data(aData) {
        return new ICAL2.Duration(aData);
      };
    })();
    (function() {
      var OPTIONS = [
        "tzid",
        "location",
        "tznames",
        "latitude",
        "longitude"
      ];
      ICAL2.Timezone = function icaltimezone(data) {
        this.wrappedJSObject = this;
        this.fromData(data);
      };
      ICAL2.Timezone.prototype = {
        /**
         * Timezone identifier
         * @type {String}
         */
        tzid: "",
        /**
         * Timezone location
         * @type {String}
         */
        location: "",
        /**
         * Alternative timezone name, for the string representation
         * @type {String}
         */
        tznames: "",
        /**
         * The primary latitude for the timezone.
         * @type {Number}
         */
        latitude: 0,
        /**
         * The primary longitude for the timezone.
         * @type {Number}
         */
        longitude: 0,
        /**
         * The vtimezone component for this timezone.
         * @type {ICAL.Component}
         */
        component: null,
        /**
         * The year this timezone has been expanded to. All timezone transition
         * dates until this year are known and can be used for calculation
         *
         * @private
         * @type {Number}
         */
        expandedUntilYear: 0,
        /**
         * The class identifier.
         * @constant
         * @type {String}
         * @default "icaltimezone"
         */
        icalclass: "icaltimezone",
        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {ICAL.Component|Object} aData options for class
         * @param {String|ICAL.Component} aData.component
         *        If aData is a simple object, then this member can be set to either a
         *        string containing the component data, or an already parsed
         *        ICAL.Component
         * @param {String} aData.tzid      The timezone identifier
         * @param {String} aData.location  The timezone locationw
         * @param {String} aData.tznames   An alternative string representation of the
         *                                  timezone
         * @param {Number} aData.latitude  The latitude of the timezone
         * @param {Number} aData.longitude The longitude of the timezone
         */
        fromData: function fromData(aData) {
          this.expandedUntilYear = 0;
          this.changes = [];
          if (aData instanceof ICAL2.Component) {
            this.component = aData;
          } else {
            if (aData && "component" in aData) {
              if (typeof aData.component == "string") {
                var jCal = ICAL2.parse(aData.component);
                this.component = new ICAL2.Component(jCal);
              } else if (aData.component instanceof ICAL2.Component) {
                this.component = aData.component;
              } else {
                this.component = null;
              }
            }
            for (var key in OPTIONS) {
              if (OPTIONS.hasOwnProperty(key)) {
                var prop = OPTIONS[key];
                if (aData && prop in aData) {
                  this[prop] = aData[prop];
                }
              }
            }
          }
          if (this.component instanceof ICAL2.Component && !this.tzid) {
            this.tzid = this.component.getFirstPropertyValue("tzid");
          }
          return this;
        },
        /**
         * Finds the utcOffset the given time would occur in this timezone.
         *
         * @param {ICAL.Time} tt        The time to check for
         * @return {Number} utc offset in seconds
         */
        utcOffset: function utcOffset(tt) {
          if (this == ICAL2.Timezone.utcTimezone || this == ICAL2.Timezone.localTimezone) {
            return 0;
          }
          this._ensureCoverage(tt.year);
          if (!this.changes.length) {
            return 0;
          }
          var tt_change = {
            year: tt.year,
            month: tt.month,
            day: tt.day,
            hour: tt.hour,
            minute: tt.minute,
            second: tt.second
          };
          var change_num = this._findNearbyChange(tt_change);
          var change_num_to_use = -1;
          var step = 1;
          for (; ; ) {
            var change = ICAL2.helpers.clone(this.changes[change_num], true);
            if (change.utcOffset < change.prevUtcOffset) {
              ICAL2.Timezone.adjust_change(change, 0, 0, 0, change.utcOffset);
            } else {
              ICAL2.Timezone.adjust_change(
                change,
                0,
                0,
                0,
                change.prevUtcOffset
              );
            }
            var cmp = ICAL2.Timezone._compare_change_fn(tt_change, change);
            if (cmp >= 0) {
              change_num_to_use = change_num;
            } else {
              step = -1;
            }
            if (step == -1 && change_num_to_use != -1) {
              break;
            }
            change_num += step;
            if (change_num < 0) {
              return 0;
            }
            if (change_num >= this.changes.length) {
              break;
            }
          }
          var zone_change = this.changes[change_num_to_use];
          var utcOffset_change = zone_change.utcOffset - zone_change.prevUtcOffset;
          if (utcOffset_change < 0 && change_num_to_use > 0) {
            var tmp_change = ICAL2.helpers.clone(zone_change, true);
            ICAL2.Timezone.adjust_change(
              tmp_change,
              0,
              0,
              0,
              tmp_change.prevUtcOffset
            );
            if (ICAL2.Timezone._compare_change_fn(tt_change, tmp_change) < 0) {
              var prev_zone_change = this.changes[change_num_to_use - 1];
              var want_daylight = false;
              if (zone_change.is_daylight != want_daylight && prev_zone_change.is_daylight == want_daylight) {
                zone_change = prev_zone_change;
              }
            }
          }
          return zone_change.utcOffset;
        },
        _findNearbyChange: function icaltimezone_find_nearby_change(change) {
          var idx = ICAL2.helpers.binsearchInsert(
            this.changes,
            change,
            ICAL2.Timezone._compare_change_fn
          );
          if (idx >= this.changes.length) {
            return this.changes.length - 1;
          }
          return idx;
        },
        _ensureCoverage: function(aYear) {
          if (ICAL2.Timezone._minimumExpansionYear == -1) {
            var today = ICAL2.Time.now();
            ICAL2.Timezone._minimumExpansionYear = today.year;
          }
          var changesEndYear = aYear;
          if (changesEndYear < ICAL2.Timezone._minimumExpansionYear) {
            changesEndYear = ICAL2.Timezone._minimumExpansionYear;
          }
          changesEndYear += ICAL2.Timezone.EXTRA_COVERAGE;
          if (changesEndYear > ICAL2.Timezone.MAX_YEAR) {
            changesEndYear = ICAL2.Timezone.MAX_YEAR;
          }
          if (!this.changes.length || this.expandedUntilYear < aYear) {
            var subcomps = this.component.getAllSubcomponents();
            var compLen = subcomps.length;
            var compIdx = 0;
            for (; compIdx < compLen; compIdx++) {
              this._expandComponent(
                subcomps[compIdx],
                changesEndYear,
                this.changes
              );
            }
            this.changes.sort(ICAL2.Timezone._compare_change_fn);
            this.expandedUntilYear = changesEndYear;
          }
        },
        _expandComponent: function(aComponent, aYear, changes) {
          if (!aComponent.hasProperty("dtstart") || !aComponent.hasProperty("tzoffsetto") || !aComponent.hasProperty("tzoffsetfrom")) {
            return null;
          }
          var dtstart = aComponent.getFirstProperty("dtstart").getFirstValue();
          var change;
          function convert_tzoffset(offset) {
            return offset.factor * (offset.hours * 3600 + offset.minutes * 60);
          }
          function init_changes() {
            var changebase = {};
            changebase.is_daylight = aComponent.name == "daylight";
            changebase.utcOffset = convert_tzoffset(
              aComponent.getFirstProperty("tzoffsetto").getFirstValue()
            );
            changebase.prevUtcOffset = convert_tzoffset(
              aComponent.getFirstProperty("tzoffsetfrom").getFirstValue()
            );
            return changebase;
          }
          if (!aComponent.hasProperty("rrule") && !aComponent.hasProperty("rdate")) {
            change = init_changes();
            change.year = dtstart.year;
            change.month = dtstart.month;
            change.day = dtstart.day;
            change.hour = dtstart.hour;
            change.minute = dtstart.minute;
            change.second = dtstart.second;
            ICAL2.Timezone.adjust_change(
              change,
              0,
              0,
              0,
              -change.prevUtcOffset
            );
            changes.push(change);
          } else {
            var props = aComponent.getAllProperties("rdate");
            for (var rdatekey in props) {
              if (!props.hasOwnProperty(rdatekey)) {
                continue;
              }
              var rdate = props[rdatekey];
              var time = rdate.getFirstValue();
              change = init_changes();
              change.year = time.year;
              change.month = time.month;
              change.day = time.day;
              if (time.isDate) {
                change.hour = dtstart.hour;
                change.minute = dtstart.minute;
                change.second = dtstart.second;
                if (dtstart.zone != ICAL2.Timezone.utcTimezone) {
                  ICAL2.Timezone.adjust_change(
                    change,
                    0,
                    0,
                    0,
                    -change.prevUtcOffset
                  );
                }
              } else {
                change.hour = time.hour;
                change.minute = time.minute;
                change.second = time.second;
                if (time.zone != ICAL2.Timezone.utcTimezone) {
                  ICAL2.Timezone.adjust_change(
                    change,
                    0,
                    0,
                    0,
                    -change.prevUtcOffset
                  );
                }
              }
              changes.push(change);
            }
            var rrule = aComponent.getFirstProperty("rrule");
            if (rrule) {
              rrule = rrule.getFirstValue();
              change = init_changes();
              if (rrule.until && rrule.until.zone == ICAL2.Timezone.utcTimezone) {
                rrule.until.adjust(0, 0, 0, change.prevUtcOffset);
                rrule.until.zone = ICAL2.Timezone.localTimezone;
              }
              var iterator = rrule.iterator(dtstart);
              var occ;
              while (occ = iterator.next()) {
                change = init_changes();
                if (occ.year > aYear || !occ) {
                  break;
                }
                change.year = occ.year;
                change.month = occ.month;
                change.day = occ.day;
                change.hour = occ.hour;
                change.minute = occ.minute;
                change.second = occ.second;
                change.isDate = occ.isDate;
                ICAL2.Timezone.adjust_change(
                  change,
                  0,
                  0,
                  0,
                  -change.prevUtcOffset
                );
                changes.push(change);
              }
            }
          }
          return changes;
        },
        /**
         * The string representation of this timezone.
         * @return {String}
         */
        toString: function toString() {
          return this.tznames ? this.tznames : this.tzid;
        }
      };
      ICAL2.Timezone._compare_change_fn = function icaltimezone_compare_change_fn(a, b) {
        if (a.year < b.year)
          return -1;
        else if (a.year > b.year)
          return 1;
        if (a.month < b.month)
          return -1;
        else if (a.month > b.month)
          return 1;
        if (a.day < b.day)
          return -1;
        else if (a.day > b.day)
          return 1;
        if (a.hour < b.hour)
          return -1;
        else if (a.hour > b.hour)
          return 1;
        if (a.minute < b.minute)
          return -1;
        else if (a.minute > b.minute)
          return 1;
        if (a.second < b.second)
          return -1;
        else if (a.second > b.second)
          return 1;
        return 0;
      };
      ICAL2.Timezone.convert_time = function icaltimezone_convert_time(tt, from_zone, to_zone) {
        if (tt.isDate || from_zone.tzid == to_zone.tzid || from_zone == ICAL2.Timezone.localTimezone || to_zone == ICAL2.Timezone.localTimezone) {
          tt.zone = to_zone;
          return tt;
        }
        var utcOffset = from_zone.utcOffset(tt);
        tt.adjust(0, 0, 0, -utcOffset);
        utcOffset = to_zone.utcOffset(tt);
        tt.adjust(0, 0, 0, utcOffset);
        return null;
      };
      ICAL2.Timezone.fromData = function icaltimezone_fromData(aData) {
        var tt = new ICAL2.Timezone();
        return tt.fromData(aData);
      };
      ICAL2.Timezone.utcTimezone = ICAL2.Timezone.fromData({
        tzid: "UTC"
      });
      ICAL2.Timezone.localTimezone = ICAL2.Timezone.fromData({
        tzid: "floating"
      });
      ICAL2.Timezone.adjust_change = function icaltimezone_adjust_change(change, days, hours, minutes, seconds) {
        return ICAL2.Time.prototype.adjust.call(
          change,
          days,
          hours,
          minutes,
          seconds,
          change
        );
      };
      ICAL2.Timezone._minimumExpansionYear = -1;
      ICAL2.Timezone.MAX_YEAR = 2035;
      ICAL2.Timezone.EXTRA_COVERAGE = 5;
    })();
    ICAL2.TimezoneService = function() {
      var zones;
      var TimezoneService = {
        get count() {
          return Object.keys(zones).length;
        },
        reset: function() {
          zones = /* @__PURE__ */ Object.create(null);
          var utc = ICAL2.Timezone.utcTimezone;
          zones.Z = utc;
          zones.UTC = utc;
          zones.GMT = utc;
        },
        /**
         * Checks if timezone id has been registered.
         *
         * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
         * @return {Boolean}        False, when not present
         */
        has: function(tzid) {
          return !!zones[tzid];
        },
        /**
         * Returns a timezone by its tzid if present.
         *
         * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
         * @return {?ICAL.Timezone} The timezone, or null if not found
         */
        get: function(tzid) {
          return zones[tzid];
        },
        /**
         * Registers a timezone object or component.
         *
         * @param {String=} name
         *        The name of the timezone. Defaults to the component's TZID if not
         *        passed.
         * @param {ICAL.Component|ICAL.Timezone} zone
         *        The initialized zone or vtimezone.
         */
        register: function(name, timezone) {
          if (name instanceof ICAL2.Component) {
            if (name.name === "vtimezone") {
              timezone = new ICAL2.Timezone(name);
              name = timezone.tzid;
            }
          }
          if (timezone instanceof ICAL2.Timezone) {
            zones[name] = timezone;
          } else {
            throw new TypeError("timezone must be ICAL.Timezone or ICAL.Component");
          }
        },
        /**
         * Removes a timezone by its tzid from the list.
         *
         * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
         * @return {?ICAL.Timezone} The removed timezone, or null if not registered
         */
        remove: function(tzid) {
          return delete zones[tzid];
        }
      };
      TimezoneService.reset();
      return TimezoneService;
    }();
    (function() {
      ICAL2.Time = function icaltime(data, zone) {
        this.wrappedJSObject = this;
        var time = this._time = /* @__PURE__ */ Object.create(null);
        time.year = 0;
        time.month = 1;
        time.day = 1;
        time.hour = 0;
        time.minute = 0;
        time.second = 0;
        time.isDate = false;
        this.fromData(data, zone);
      };
      ICAL2.Time._dowCache = {};
      ICAL2.Time._wnCache = {};
      ICAL2.Time.prototype = {
        /**
         * The class identifier.
         * @constant
         * @type {String}
         * @default "icaltime"
         */
        icalclass: "icaltime",
        _cachedUnixTime: null,
        /**
         * The type name, to be used in the jCal object. This value may change and
         * is strictly defined by the {@link ICAL.Time#isDate isDate} member.
         * @readonly
         * @type {String}
         * @default "date-time"
         */
        get icaltype() {
          return this.isDate ? "date" : "date-time";
        },
        /**
         * The timezone for this time.
         * @type {ICAL.Timezone}
         */
        zone: null,
        /**
         * Internal uses to indicate that a change has been made and the next read
         * operation must attempt to normalize the value (for example changing the
         * day to 33).
         *
         * @type {Boolean}
         * @private
         */
        _pendingNormalization: false,
        /**
         * Returns a clone of the time object.
         *
         * @return {ICAL.Time}              The cloned object
         */
        clone: function() {
          return new ICAL2.Time(this._time, this.zone);
        },
        /**
         * Reset the time instance to epoch time
         */
        reset: function icaltime_reset() {
          this.fromData(ICAL2.Time.epochTime);
          this.zone = ICAL2.Timezone.utcTimezone;
        },
        /**
         * Reset the time instance to the given date/time values.
         *
         * @param {Number} year             The year to set
         * @param {Number} month            The month to set
         * @param {Number} day              The day to set
         * @param {Number} hour             The hour to set
         * @param {Number} minute           The minute to set
         * @param {Number} second           The second to set
         * @param {ICAL.Timezone} timezone  The timezone to set
         */
        resetTo: function icaltime_resetTo(year, month, day, hour, minute, second, timezone) {
          this.fromData({
            year,
            month,
            day,
            hour,
            minute,
            second,
            zone: timezone
          });
        },
        /**
         * Set up the current instance from the Javascript date value.
         *
         * @param {?Date} aDate     The Javascript Date to read, or null to reset
         * @param {Boolean} useUTC  If true, the UTC values of the date will be used
         */
        fromJSDate: function icaltime_fromJSDate(aDate, useUTC) {
          if (!aDate) {
            this.reset();
          } else {
            if (useUTC) {
              this.zone = ICAL2.Timezone.utcTimezone;
              this.year = aDate.getUTCFullYear();
              this.month = aDate.getUTCMonth() + 1;
              this.day = aDate.getUTCDate();
              this.hour = aDate.getUTCHours();
              this.minute = aDate.getUTCMinutes();
              this.second = aDate.getUTCSeconds();
            } else {
              this.zone = ICAL2.Timezone.localTimezone;
              this.year = aDate.getFullYear();
              this.month = aDate.getMonth() + 1;
              this.day = aDate.getDate();
              this.hour = aDate.getHours();
              this.minute = aDate.getMinutes();
              this.second = aDate.getSeconds();
            }
          }
          this._cachedUnixTime = null;
          return this;
        },
        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {Object} aData            Time initialization
         * @param {Number=} aData.year      The year for this date
         * @param {Number=} aData.month     The month for this date
         * @param {Number=} aData.day       The day for this date
         * @param {Number=} aData.hour      The hour for this date
         * @param {Number=} aData.minute    The minute for this date
         * @param {Number=} aData.second    The second for this date
         * @param {Boolean=} aData.isDate   If true, the instance represents a date
         *                                    (as opposed to a date-time)
         * @param {ICAL.Timezone=} aZone    Timezone this position occurs in
         */
        fromData: function fromData(aData, aZone) {
          if (aData) {
            for (var key in aData) {
              if (Object.prototype.hasOwnProperty.call(aData, key)) {
                if (key === "icaltype")
                  continue;
                this[key] = aData[key];
              }
            }
          }
          if (aZone) {
            this.zone = aZone;
          }
          if (aData && !("isDate" in aData)) {
            this.isDate = !("hour" in aData);
          } else if (aData && "isDate" in aData) {
            this.isDate = aData.isDate;
          }
          if (aData && "timezone" in aData) {
            var zone = ICAL2.TimezoneService.get(
              aData.timezone
            );
            this.zone = zone || ICAL2.Timezone.localTimezone;
          }
          if (aData && "zone" in aData) {
            this.zone = aData.zone;
          }
          if (!this.zone) {
            this.zone = ICAL2.Timezone.localTimezone;
          }
          this._cachedUnixTime = null;
          return this;
        },
        /**
         * Calculate the day of week.
         * @param {ICAL.Time.weekDay=} aWeekStart
         *        The week start weekday, defaults to SUNDAY
         * @return {ICAL.Time.weekDay}
         */
        dayOfWeek: function icaltime_dayOfWeek(aWeekStart) {
          var firstDow = aWeekStart || ICAL2.Time.SUNDAY;
          var dowCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + firstDow;
          if (dowCacheKey in ICAL2.Time._dowCache) {
            return ICAL2.Time._dowCache[dowCacheKey];
          }
          var q = this.day;
          var m = this.month + (this.month < 3 ? 12 : 0);
          var Y = this.year - (this.month < 3 ? 1 : 0);
          var h = q + Y + ICAL2.helpers.trunc((m + 1) * 26 / 10) + ICAL2.helpers.trunc(Y / 4);
          if (true) {
            h += ICAL2.helpers.trunc(Y / 100) * 6 + ICAL2.helpers.trunc(Y / 400);
          } else {
            h += 5;
          }
          h = (h + 7 - firstDow) % 7 + 1;
          ICAL2.Time._dowCache[dowCacheKey] = h;
          return h;
        },
        /**
         * Calculate the day of year.
         * @return {Number}
         */
        dayOfYear: function dayOfYear() {
          var is_leap = ICAL2.Time.isLeapYear(this.year) ? 1 : 0;
          var diypm = ICAL2.Time.daysInYearPassedMonth;
          return diypm[is_leap][this.month - 1] + this.day;
        },
        /**
         * Returns a copy of the current date/time, rewound to the start of the
         * week. The resulting ICAL.Time instance is of icaltype date, even if this
         * is a date-time.
         *
         * @param {ICAL.Time.weekDay=} aWeekStart
         *        The week start weekday, defaults to SUNDAY
         * @return {ICAL.Time}      The start of the week (cloned)
         */
        startOfWeek: function startOfWeek(aWeekStart) {
          var firstDow = aWeekStart || ICAL2.Time.SUNDAY;
          var result = this.clone();
          result.day -= (this.dayOfWeek() + 7 - firstDow) % 7;
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * Returns a copy of the current date/time, shifted to the end of the week.
         * The resulting ICAL.Time instance is of icaltype date, even if this is a
         * date-time.
         *
         * @param {ICAL.Time.weekDay=} aWeekStart
         *        The week start weekday, defaults to SUNDAY
         * @return {ICAL.Time}      The end of the week (cloned)
         */
        endOfWeek: function endOfWeek(aWeekStart) {
          var firstDow = aWeekStart || ICAL2.Time.SUNDAY;
          var result = this.clone();
          result.day += (7 - this.dayOfWeek() + firstDow - ICAL2.Time.SUNDAY) % 7;
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * Returns a copy of the current date/time, rewound to the start of the
         * month. The resulting ICAL.Time instance is of icaltype date, even if
         * this is a date-time.
         *
         * @return {ICAL.Time}      The start of the month (cloned)
         */
        startOfMonth: function startOfMonth() {
          var result = this.clone();
          result.day = 1;
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * Returns a copy of the current date/time, shifted to the end of the
         * month.  The resulting ICAL.Time instance is of icaltype date, even if
         * this is a date-time.
         *
         * @return {ICAL.Time}      The end of the month (cloned)
         */
        endOfMonth: function endOfMonth() {
          var result = this.clone();
          result.day = ICAL2.Time.daysInMonth(result.month, result.year);
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * Returns a copy of the current date/time, rewound to the start of the
         * year. The resulting ICAL.Time instance is of icaltype date, even if
         * this is a date-time.
         *
         * @return {ICAL.Time}      The start of the year (cloned)
         */
        startOfYear: function startOfYear() {
          var result = this.clone();
          result.day = 1;
          result.month = 1;
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * Returns a copy of the current date/time, shifted to the end of the
         * year.  The resulting ICAL.Time instance is of icaltype date, even if
         * this is a date-time.
         *
         * @return {ICAL.Time}      The end of the year (cloned)
         */
        endOfYear: function endOfYear() {
          var result = this.clone();
          result.day = 31;
          result.month = 12;
          result.isDate = true;
          result.hour = 0;
          result.minute = 0;
          result.second = 0;
          return result;
        },
        /**
         * First calculates the start of the week, then returns the day of year for
         * this date. If the day falls into the previous year, the day is zero or negative.
         *
         * @param {ICAL.Time.weekDay=} aFirstDayOfWeek
         *        The week start weekday, defaults to SUNDAY
         * @return {Number}     The calculated day of year
         */
        startDoyWeek: function startDoyWeek(aFirstDayOfWeek) {
          var firstDow = aFirstDayOfWeek || ICAL2.Time.SUNDAY;
          var delta = this.dayOfWeek() - firstDow;
          if (delta < 0)
            delta += 7;
          return this.dayOfYear() - delta;
        },
        /**
         * Get the dominical letter for the current year. Letters range from A - G
         * for common years, and AG to GF for leap years.
         *
         * @param {Number} yr           The year to retrieve the letter for
         * @return {String}             The dominical letter.
         */
        getDominicalLetter: function() {
          return ICAL2.Time.getDominicalLetter(this.year);
        },
        /**
         * Finds the nthWeekDay relative to the current month (not day).  The
         * returned value is a day relative the month that this month belongs to so
         * 1 would indicate the first of the month and 40 would indicate a day in
         * the following month.
         *
         * @param {Number} aDayOfWeek   Day of the week see the day name constants
         * @param {Number} aPos         Nth occurrence of a given week day values
         *        of 1 and 0 both indicate the first weekday of that type. aPos may
         *        be either positive or negative
         *
         * @return {Number} numeric value indicating a day relative
         *                   to the current month of this time object
         */
        nthWeekDay: function icaltime_nthWeekDay(aDayOfWeek, aPos) {
          var daysInMonth = ICAL2.Time.daysInMonth(this.month, this.year);
          var weekday;
          var pos = aPos;
          var start = 0;
          var otherDay = this.clone();
          if (pos >= 0) {
            otherDay.day = 1;
            if (pos != 0) {
              pos--;
            }
            start = otherDay.day;
            var startDow = otherDay.dayOfWeek();
            var offset = aDayOfWeek - startDow;
            if (offset < 0)
              offset += 7;
            start += offset;
            start -= aDayOfWeek;
            weekday = aDayOfWeek;
          } else {
            otherDay.day = daysInMonth;
            var endDow = otherDay.dayOfWeek();
            pos++;
            weekday = endDow - aDayOfWeek;
            if (weekday < 0) {
              weekday += 7;
            }
            weekday = daysInMonth - weekday;
          }
          weekday += pos * 7;
          return start + weekday;
        },
        /**
         * Checks if current time is the nth weekday, relative to the current
         * month.  Will always return false when rule resolves outside of current
         * month.
         *
         * @param {ICAL.Time.weekDay} aDayOfWeek       Day of week to check
         * @param {Number} aPos                        Relative position
         * @return {Boolean}                           True, if it is the nth weekday
         */
        isNthWeekDay: function(aDayOfWeek, aPos) {
          var dow = this.dayOfWeek();
          if (aPos === 0 && dow === aDayOfWeek) {
            return true;
          }
          var day = this.nthWeekDay(aDayOfWeek, aPos);
          if (day === this.day) {
            return true;
          }
          return false;
        },
        /**
         * Calculates the ISO 8601 week number. The first week of a year is the
         * week that contains the first Thursday. The year can have 53 weeks, if
         * January 1st is a Friday.
         *
         * Note there are regions where the first week of the year is the one that
         * starts on January 1st, which may offset the week number. Also, if a
         * different week start is specified, this will also affect the week
         * number.
         *
         * @see ICAL.Time.weekOneStarts
         * @param {ICAL.Time.weekDay} aWeekStart        The weekday the week starts with
         * @return {Number}                             The ISO week number
         */
        weekNumber: function weekNumber(aWeekStart) {
          var wnCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + aWeekStart;
          if (wnCacheKey in ICAL2.Time._wnCache) {
            return ICAL2.Time._wnCache[wnCacheKey];
          }
          var week1;
          var dt = this.clone();
          dt.isDate = true;
          var isoyear = this.year;
          if (dt.month == 12 && dt.day > 25) {
            week1 = ICAL2.Time.weekOneStarts(isoyear + 1, aWeekStart);
            if (dt.compare(week1) < 0) {
              week1 = ICAL2.Time.weekOneStarts(isoyear, aWeekStart);
            } else {
              isoyear++;
            }
          } else {
            week1 = ICAL2.Time.weekOneStarts(isoyear, aWeekStart);
            if (dt.compare(week1) < 0) {
              week1 = ICAL2.Time.weekOneStarts(--isoyear, aWeekStart);
            }
          }
          var daysBetween = dt.subtractDate(week1).toSeconds() / 86400;
          var answer = ICAL2.helpers.trunc(daysBetween / 7) + 1;
          ICAL2.Time._wnCache[wnCacheKey] = answer;
          return answer;
        },
        /**
         * Adds the duration to the current time. The instance is modified in
         * place.
         *
         * @param {ICAL.Duration} aDuration         The duration to add
         */
        addDuration: function icaltime_add(aDuration) {
          var mult = aDuration.isNegative ? -1 : 1;
          var second = this.second;
          var minute = this.minute;
          var hour = this.hour;
          var day = this.day;
          second += mult * aDuration.seconds;
          minute += mult * aDuration.minutes;
          hour += mult * aDuration.hours;
          day += mult * aDuration.days;
          day += mult * 7 * aDuration.weeks;
          this.second = second;
          this.minute = minute;
          this.hour = hour;
          this.day = day;
          this._cachedUnixTime = null;
        },
        /**
         * Subtract the date details (_excluding_ timezone).  Useful for finding
         * the relative difference between two time objects excluding their
         * timezone differences.
         *
         * @param {ICAL.Time} aDate     The date to substract
         * @return {ICAL.Duration}      The difference as a duration
         */
        subtractDate: function icaltime_subtract(aDate) {
          var unixTime = this.toUnixTime() + this.utcOffset();
          var other = aDate.toUnixTime() + aDate.utcOffset();
          return ICAL2.Duration.fromSeconds(unixTime - other);
        },
        /**
         * Subtract the date details, taking timezones into account.
         *
         * @param {ICAL.Time} aDate  The date to subtract
         * @return {ICAL.Duration}  The difference in duration
         */
        subtractDateTz: function icaltime_subtract_abs(aDate) {
          var unixTime = this.toUnixTime();
          var other = aDate.toUnixTime();
          return ICAL2.Duration.fromSeconds(unixTime - other);
        },
        /**
         * Compares the ICAL.Time instance with another one.
         *
         * @param {ICAL.Duration} aOther        The instance to compare with
         * @return {Number}                     -1, 0 or 1 for less/equal/greater
         */
        compare: function icaltime_compare(other) {
          var a = this.toUnixTime();
          var b = other.toUnixTime();
          if (a > b)
            return 1;
          if (b > a)
            return -1;
          return 0;
        },
        /**
         * Compares only the date part of this instance with another one.
         *
         * @param {ICAL.Duration} other         The instance to compare with
         * @param {ICAL.Timezone} tz            The timezone to compare in
         * @return {Number}                     -1, 0 or 1 for less/equal/greater
         */
        compareDateOnlyTz: function icaltime_compareDateOnlyTz(other, tz) {
          function cmp(attr) {
            return ICAL2.Time._cmp_attr(a, b, attr);
          }
          var a = this.convertToZone(tz);
          var b = other.convertToZone(tz);
          var rc = 0;
          if ((rc = cmp("year")) != 0)
            return rc;
          if ((rc = cmp("month")) != 0)
            return rc;
          if ((rc = cmp("day")) != 0)
            return rc;
          return rc;
        },
        /**
         * Convert the instance into another timezone. The returned ICAL.Time
         * instance is always a copy.
         *
         * @param {ICAL.Timezone} zone      The zone to convert to
         * @return {ICAL.Time}              The copy, converted to the zone
         */
        convertToZone: function convertToZone(zone) {
          var copy = this.clone();
          var zone_equals = this.zone.tzid == zone.tzid;
          if (!this.isDate && !zone_equals) {
            ICAL2.Timezone.convert_time(copy, this.zone, zone);
          }
          copy.zone = zone;
          return copy;
        },
        /**
         * Calculates the UTC offset of the current date/time in the timezone it is
         * in.
         *
         * @return {Number}     UTC offset in seconds
         */
        utcOffset: function utc_offset() {
          if (this.zone == ICAL2.Timezone.localTimezone || this.zone == ICAL2.Timezone.utcTimezone) {
            return 0;
          } else {
            return this.zone.utcOffset(this);
          }
        },
        /**
         * Returns an RFC 5545 compliant ical representation of this object.
         *
         * @return {String} ical date/date-time
         */
        toICALString: function() {
          var string = this.toString();
          if (string.length > 10) {
            return ICAL2.design.icalendar.value["date-time"].toICAL(string);
          } else {
            return ICAL2.design.icalendar.value.date.toICAL(string);
          }
        },
        /**
         * The string representation of this date/time, in jCal form
         * (including : and - separators).
         * @return {String}
         */
        toString: function toString() {
          var result = this.year + "-" + ICAL2.helpers.pad2(this.month) + "-" + ICAL2.helpers.pad2(this.day);
          if (!this.isDate) {
            result += "T" + ICAL2.helpers.pad2(this.hour) + ":" + ICAL2.helpers.pad2(this.minute) + ":" + ICAL2.helpers.pad2(this.second);
            if (this.zone === ICAL2.Timezone.utcTimezone) {
              result += "Z";
            }
          }
          return result;
        },
        /**
         * Converts the current instance to a Javascript date
         * @return {Date}
         */
        toJSDate: function toJSDate() {
          if (this.zone == ICAL2.Timezone.localTimezone) {
            if (this.isDate) {
              return new Date(this.year, this.month - 1, this.day);
            } else {
              return new Date(
                this.year,
                this.month - 1,
                this.day,
                this.hour,
                this.minute,
                this.second,
                0
              );
            }
          } else {
            return new Date(this.toUnixTime() * 1e3);
          }
        },
        _normalize: function icaltime_normalize() {
          var isDate = this._time.isDate;
          if (this._time.isDate) {
            this._time.hour = 0;
            this._time.minute = 0;
            this._time.second = 0;
          }
          this.adjust(0, 0, 0, 0);
          return this;
        },
        /**
         * Adjust the date/time by the given offset
         *
         * @param {Number} aExtraDays       The extra amount of days
         * @param {Number} aExtraHours      The extra amount of hours
         * @param {Number} aExtraMinutes    The extra amount of minutes
         * @param {Number} aExtraSeconds    The extra amount of seconds
         * @param {Number=} aTime           The time to adjust, defaults to the
         *                                    current instance.
         */
        adjust: function icaltime_adjust(aExtraDays, aExtraHours, aExtraMinutes, aExtraSeconds, aTime) {
          var minutesOverflow, hoursOverflow, daysOverflow = 0, yearsOverflow = 0;
          var second, minute, hour, day;
          var daysInMonth;
          var time = aTime || this._time;
          if (!time.isDate) {
            second = time.second + aExtraSeconds;
            time.second = second % 60;
            minutesOverflow = ICAL2.helpers.trunc(second / 60);
            if (time.second < 0) {
              time.second += 60;
              minutesOverflow--;
            }
            minute = time.minute + aExtraMinutes + minutesOverflow;
            time.minute = minute % 60;
            hoursOverflow = ICAL2.helpers.trunc(minute / 60);
            if (time.minute < 0) {
              time.minute += 60;
              hoursOverflow--;
            }
            hour = time.hour + aExtraHours + hoursOverflow;
            time.hour = hour % 24;
            daysOverflow = ICAL2.helpers.trunc(hour / 24);
            if (time.hour < 0) {
              time.hour += 24;
              daysOverflow--;
            }
          }
          if (time.month > 12) {
            yearsOverflow = ICAL2.helpers.trunc((time.month - 1) / 12);
          } else if (time.month < 1) {
            yearsOverflow = ICAL2.helpers.trunc(time.month / 12) - 1;
          }
          time.year += yearsOverflow;
          time.month -= 12 * yearsOverflow;
          day = time.day + aExtraDays + daysOverflow;
          if (day > 0) {
            for (; ; ) {
              daysInMonth = ICAL2.Time.daysInMonth(time.month, time.year);
              if (day <= daysInMonth) {
                break;
              }
              time.month++;
              if (time.month > 12) {
                time.year++;
                time.month = 1;
              }
              day -= daysInMonth;
            }
          } else {
            while (day <= 0) {
              if (time.month == 1) {
                time.year--;
                time.month = 12;
              } else {
                time.month--;
              }
              day += ICAL2.Time.daysInMonth(time.month, time.year);
            }
          }
          time.day = day;
          this._cachedUnixTime = null;
          return this;
        },
        /**
         * Sets up the current instance from unix time, the number of seconds since
         * January 1st, 1970.
         *
         * @param {Number} seconds      The seconds to set up with
         */
        fromUnixTime: function fromUnixTime(seconds) {
          this.zone = ICAL2.Timezone.utcTimezone;
          var epoch = ICAL2.Time.epochTime.clone();
          epoch.adjust(0, 0, 0, seconds);
          this.year = epoch.year;
          this.month = epoch.month;
          this.day = epoch.day;
          this.hour = epoch.hour;
          this.minute = epoch.minute;
          this.second = Math.floor(epoch.second);
          this._cachedUnixTime = null;
        },
        /**
         * Converts the current instance to seconds since January 1st 1970.
         *
         * @return {Number}         Seconds since 1970
         */
        toUnixTime: function toUnixTime() {
          if (this._cachedUnixTime !== null) {
            return this._cachedUnixTime;
          }
          var offset = this.utcOffset();
          var ms = Date.UTC(
            this.year,
            this.month - 1,
            this.day,
            this.hour,
            this.minute,
            this.second - offset
          );
          this._cachedUnixTime = ms / 1e3;
          return this._cachedUnixTime;
        },
        /**
         * Converts time to into Object which can be serialized then re-created
         * using the constructor.
         *
         * @example
         * // toJSON will automatically be called
         * var json = JSON.stringify(mytime);
         *
         * var deserialized = JSON.parse(json);
         *
         * var time = new ICAL.Time(deserialized);
         *
         * @return {Object}
         */
        toJSON: function() {
          var copy = [
            "year",
            "month",
            "day",
            "hour",
            "minute",
            "second",
            "isDate"
          ];
          var result = /* @__PURE__ */ Object.create(null);
          var i = 0;
          var len = copy.length;
          var prop;
          for (; i < len; i++) {
            prop = copy[i];
            result[prop] = this[prop];
          }
          if (this.zone) {
            result.timezone = this.zone.tzid;
          }
          return result;
        }
      };
      (function setupNormalizeAttributes() {
        function defineAttr(attr) {
          Object.defineProperty(ICAL2.Time.prototype, attr, {
            get: function getTimeAttr() {
              if (this._pendingNormalization) {
                this._normalize();
                this._pendingNormalization = false;
              }
              return this._time[attr];
            },
            set: function setTimeAttr(val) {
              if (attr === "isDate" && val && !this._time.isDate) {
                this.adjust(0, 0, 0, 0);
              }
              this._cachedUnixTime = null;
              this._pendingNormalization = true;
              this._time[attr] = val;
              return val;
            }
          });
        }
        if ("defineProperty" in Object) {
          defineAttr("year");
          defineAttr("month");
          defineAttr("day");
          defineAttr("hour");
          defineAttr("minute");
          defineAttr("second");
          defineAttr("isDate");
        }
      })();
      ICAL2.Time.daysInMonth = function icaltime_daysInMonth(month, year) {
        var _daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var days = 30;
        if (month < 1 || month > 12)
          return days;
        days = _daysInMonth[month];
        if (month == 2) {
          days += ICAL2.Time.isLeapYear(year);
        }
        return days;
      };
      ICAL2.Time.isLeapYear = function isLeapYear(year) {
        if (year <= 1752) {
          return year % 4 == 0;
        } else {
          return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
        }
      };
      ICAL2.Time.fromDayOfYear = function icaltime_fromDayOfYear(aDayOfYear, aYear) {
        var year = aYear;
        var doy = aDayOfYear;
        var tt = new ICAL2.Time();
        tt.auto_normalize = false;
        var is_leap = ICAL2.Time.isLeapYear(year) ? 1 : 0;
        if (doy < 1) {
          year--;
          is_leap = ICAL2.Time.isLeapYear(year) ? 1 : 0;
          doy += ICAL2.Time.daysInYearPassedMonth[is_leap][12];
          return ICAL2.Time.fromDayOfYear(doy, year);
        } else if (doy > ICAL2.Time.daysInYearPassedMonth[is_leap][12]) {
          is_leap = ICAL2.Time.isLeapYear(year) ? 1 : 0;
          doy -= ICAL2.Time.daysInYearPassedMonth[is_leap][12];
          year++;
          return ICAL2.Time.fromDayOfYear(doy, year);
        }
        tt.year = year;
        tt.isDate = true;
        for (var month = 11; month >= 0; month--) {
          if (doy > ICAL2.Time.daysInYearPassedMonth[is_leap][month]) {
            tt.month = month + 1;
            tt.day = doy - ICAL2.Time.daysInYearPassedMonth[is_leap][month];
            break;
          }
        }
        tt.auto_normalize = true;
        return tt;
      };
      ICAL2.Time.fromStringv2 = function fromString(str) {
        return new ICAL2.Time({
          year: parseInt(str.substr(0, 4), 10),
          month: parseInt(str.substr(5, 2), 10),
          day: parseInt(str.substr(8, 2), 10),
          isDate: true
        });
      };
      ICAL2.Time.fromDateString = function(aValue) {
        return new ICAL2.Time({
          year: ICAL2.helpers.strictParseInt(aValue.substr(0, 4)),
          month: ICAL2.helpers.strictParseInt(aValue.substr(5, 2)),
          day: ICAL2.helpers.strictParseInt(aValue.substr(8, 2)),
          isDate: true
        });
      };
      ICAL2.Time.fromDateTimeString = function(aValue, prop) {
        if (aValue.length < 19) {
          throw new Error(
            'invalid date-time value: "' + aValue + '"'
          );
        }
        var zone;
        if (aValue[19] && aValue[19] === "Z") {
          zone = "Z";
        } else if (prop) {
          zone = prop.getParameter("tzid");
        }
        var time = new ICAL2.Time({
          year: ICAL2.helpers.strictParseInt(aValue.substr(0, 4)),
          month: ICAL2.helpers.strictParseInt(aValue.substr(5, 2)),
          day: ICAL2.helpers.strictParseInt(aValue.substr(8, 2)),
          hour: ICAL2.helpers.strictParseInt(aValue.substr(11, 2)),
          minute: ICAL2.helpers.strictParseInt(aValue.substr(14, 2)),
          second: ICAL2.helpers.strictParseInt(aValue.substr(17, 2)),
          timezone: zone
        });
        return time;
      };
      ICAL2.Time.fromString = function fromString(aValue, aProperty) {
        if (aValue.length > 10) {
          return ICAL2.Time.fromDateTimeString(aValue, aProperty);
        } else {
          return ICAL2.Time.fromDateString(aValue);
        }
      };
      ICAL2.Time.fromJSDate = function fromJSDate(aDate, useUTC) {
        var tt = new ICAL2.Time();
        return tt.fromJSDate(aDate, useUTC);
      };
      ICAL2.Time.fromData = function fromData(aData, aZone) {
        var t = new ICAL2.Time();
        return t.fromData(aData, aZone);
      };
      ICAL2.Time.now = function icaltime_now() {
        return ICAL2.Time.fromJSDate(/* @__PURE__ */ new Date(), false);
      };
      ICAL2.Time.weekOneStarts = function weekOneStarts(aYear, aWeekStart) {
        var t = ICAL2.Time.fromData({
          year: aYear,
          month: 1,
          day: 1,
          isDate: true
        });
        var dow = t.dayOfWeek();
        var wkst = aWeekStart || ICAL2.Time.DEFAULT_WEEK_START;
        if (dow > ICAL2.Time.THURSDAY) {
          t.day += 7;
        }
        if (wkst > ICAL2.Time.THURSDAY) {
          t.day -= 7;
        }
        t.day -= dow - wkst;
        return t;
      };
      ICAL2.Time.getDominicalLetter = function(yr) {
        var LTRS = "GFEDCBA";
        var dom = (yr + (yr / 4 | 0) + (yr / 400 | 0) - (yr / 100 | 0) - 1) % 7;
        var isLeap = ICAL2.Time.isLeapYear(yr);
        if (isLeap) {
          return LTRS[(dom + 6) % 7] + LTRS[dom];
        } else {
          return LTRS[dom];
        }
      };
      ICAL2.Time.epochTime = ICAL2.Time.fromData({
        year: 1970,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        isDate: false,
        timezone: "Z"
      });
      ICAL2.Time._cmp_attr = function _cmp_attr(a, b, attr) {
        if (a[attr] > b[attr])
          return 1;
        if (a[attr] < b[attr])
          return -1;
        return 0;
      };
      ICAL2.Time.daysInYearPassedMonth = [
        [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
        [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]
      ];
      ICAL2.Time.SUNDAY = 1;
      ICAL2.Time.MONDAY = 2;
      ICAL2.Time.TUESDAY = 3;
      ICAL2.Time.WEDNESDAY = 4;
      ICAL2.Time.THURSDAY = 5;
      ICAL2.Time.FRIDAY = 6;
      ICAL2.Time.SATURDAY = 7;
      ICAL2.Time.DEFAULT_WEEK_START = ICAL2.Time.MONDAY;
    })();
    (function() {
      ICAL2.VCardTime = function(data, zone, icaltype) {
        this.wrappedJSObject = this;
        var time = this._time = /* @__PURE__ */ Object.create(null);
        time.year = null;
        time.month = null;
        time.day = null;
        time.hour = null;
        time.minute = null;
        time.second = null;
        this.icaltype = icaltype || "date-and-or-time";
        this.fromData(data, zone);
      };
      ICAL2.helpers.inherits(
        ICAL2.Time,
        ICAL2.VCardTime,
        /** @lends ICAL.VCardTime */
        {
          /**
           * The class identifier.
           * @constant
           * @type {String}
           * @default "vcardtime"
           */
          icalclass: "vcardtime",
          /**
           * The type name, to be used in the jCal object.
           * @type {String}
           * @default "date-and-or-time"
           */
          icaltype: "date-and-or-time",
          /**
           * The timezone. This can either be floating, UTC, or an instance of
           * ICAL.UtcOffset.
           * @type {ICAL.Timezone|ICAL.UtcOFfset}
           */
          zone: null,
          /**
           * Returns a clone of the vcard date/time object.
           *
           * @return {ICAL.VCardTime}     The cloned object
           */
          clone: function() {
            return new ICAL2.VCardTime(this._time, this.zone, this.icaltype);
          },
          _normalize: function() {
            return this;
          },
          /**
           * @inheritdoc
           */
          utcOffset: function() {
            if (this.zone instanceof ICAL2.UtcOffset) {
              return this.zone.toSeconds();
            } else {
              return ICAL2.Time.prototype.utcOffset.apply(this, arguments);
            }
          },
          /**
           * Returns an RFC 6350 compliant representation of this object.
           *
           * @return {String}         vcard date/time string
           */
          toICALString: function() {
            return ICAL2.design.vcard.value[this.icaltype].toICAL(this.toString());
          },
          /**
           * The string representation of this date/time, in jCard form
           * (including : and - separators).
           * @return {String}
           */
          toString: function toString() {
            var p2 = ICAL2.helpers.pad2;
            var y = this.year, m = this.month, d = this.day;
            var h = this.hour, mm = this.minute, s = this.second;
            var hasYear = y !== null, hasMonth = m !== null, hasDay = d !== null;
            var hasHour = h !== null, hasMinute = mm !== null, hasSecond = s !== null;
            var datepart = (hasYear ? p2(y) + (hasMonth || hasDay ? "-" : "") : hasMonth || hasDay ? "--" : "") + (hasMonth ? p2(m) : "") + (hasDay ? "-" + p2(d) : "");
            var timepart = (hasHour ? p2(h) : "-") + (hasHour && hasMinute ? ":" : "") + (hasMinute ? p2(mm) : "") + (!hasHour && !hasMinute ? "-" : "") + (hasMinute && hasSecond ? ":" : "") + (hasSecond ? p2(s) : "");
            var zone;
            if (this.zone === ICAL2.Timezone.utcTimezone) {
              zone = "Z";
            } else if (this.zone instanceof ICAL2.UtcOffset) {
              zone = this.zone.toString();
            } else if (this.zone === ICAL2.Timezone.localTimezone) {
              zone = "";
            } else if (this.zone instanceof ICAL2.Timezone) {
              var offset = ICAL2.UtcOffset.fromSeconds(this.zone.utcOffset(this));
              zone = offset.toString();
            } else {
              zone = "";
            }
            switch (this.icaltype) {
              case "time":
                return timepart + zone;
              case "date-and-or-time":
              case "date-time":
                return datepart + (timepart == "--" ? "" : "T" + timepart + zone);
              case "date":
                return datepart;
            }
            return null;
          }
        }
      );
      ICAL2.VCardTime.fromDateAndOrTimeString = function(aValue, aIcalType) {
        function part(v, s, e) {
          return v ? ICAL2.helpers.strictParseInt(v.substr(s, e)) : null;
        }
        var parts = aValue.split("T");
        var dt = parts[0], tmz = parts[1];
        var splitzone = tmz ? ICAL2.design.vcard.value.time._splitZone(tmz) : [];
        var zone = splitzone[0], tm = splitzone[1];
        var stoi = ICAL2.helpers.strictParseInt;
        var dtlen = dt ? dt.length : 0;
        var tmlen = tm ? tm.length : 0;
        var hasDashDate = dt && dt[0] == "-" && dt[1] == "-";
        var hasDashTime = tm && tm[0] == "-";
        var o = {
          year: hasDashDate ? null : part(dt, 0, 4),
          month: hasDashDate && (dtlen == 4 || dtlen == 7) ? part(dt, 2, 2) : dtlen == 7 ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 5, 2) : null,
          day: dtlen == 5 ? part(dt, 3, 2) : dtlen == 7 && hasDashDate ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 8, 2) : null,
          hour: hasDashTime ? null : part(tm, 0, 2),
          minute: hasDashTime && tmlen == 3 ? part(tm, 1, 2) : tmlen > 4 ? hasDashTime ? part(tm, 1, 2) : part(tm, 3, 2) : null,
          second: tmlen == 4 ? part(tm, 2, 2) : tmlen == 6 ? part(tm, 4, 2) : tmlen == 8 ? part(tm, 6, 2) : null
        };
        if (zone == "Z") {
          zone = ICAL2.Timezone.utcTimezone;
        } else if (zone && zone[3] == ":") {
          zone = ICAL2.UtcOffset.fromString(zone);
        } else {
          zone = null;
        }
        return new ICAL2.VCardTime(o, zone, aIcalType);
      };
    })();
    (function() {
      var DOW_MAP = {
        SU: ICAL2.Time.SUNDAY,
        MO: ICAL2.Time.MONDAY,
        TU: ICAL2.Time.TUESDAY,
        WE: ICAL2.Time.WEDNESDAY,
        TH: ICAL2.Time.THURSDAY,
        FR: ICAL2.Time.FRIDAY,
        SA: ICAL2.Time.SATURDAY
      };
      var REVERSE_DOW_MAP = {};
      for (var key in DOW_MAP) {
        if (DOW_MAP.hasOwnProperty(key)) {
          REVERSE_DOW_MAP[DOW_MAP[key]] = key;
        }
      }
      var COPY_PARTS = [
        "BYSECOND",
        "BYMINUTE",
        "BYHOUR",
        "BYDAY",
        "BYMONTHDAY",
        "BYYEARDAY",
        "BYWEEKNO",
        "BYMONTH",
        "BYSETPOS"
      ];
      ICAL2.Recur = function icalrecur(data) {
        this.wrappedJSObject = this;
        this.parts = {};
        if (data && typeof data === "object") {
          this.fromData(data);
        }
      };
      ICAL2.Recur.prototype = {
        /**
         * An object holding the BY-parts of the recurrence rule
         * @type {Object}
         */
        parts: null,
        /**
         * The interval value for the recurrence rule.
         * @type {Number}
         */
        interval: 1,
        /**
         * The week start day
         *
         * @type {ICAL.Time.weekDay}
         * @default ICAL.Time.MONDAY
         */
        wkst: ICAL2.Time.MONDAY,
        /**
         * The end of the recurrence
         * @type {?ICAL.Time}
         */
        until: null,
        /**
         * The maximum number of occurrences
         * @type {?Number}
         */
        count: null,
        /**
         * The frequency value.
         * @type {ICAL.Recur.frequencyValues}
         */
        freq: null,
        /**
         * The class identifier.
         * @constant
         * @type {String}
         * @default "icalrecur"
         */
        icalclass: "icalrecur",
        /**
         * The type name, to be used in the jCal object.
         * @constant
         * @type {String}
         * @default "recur"
         */
        icaltype: "recur",
        /**
         * Create a new iterator for this recurrence rule. The passed start date
         * must be the start date of the event, not the start of the range to
         * search in.
         *
         * @example
         * var recur = comp.getFirstPropertyValue('rrule');
         * var dtstart = comp.getFirstPropertyValue('dtstart');
         * var iter = recur.iterator(dtstart);
         * for (var next = iter.next(); next; next = iter.next()) {
         *   if (next.compare(rangeStart) < 0) {
         *     continue;
         *   }
         *   console.log(next.toString());
         * }
         *
         * @param {ICAL.Time} aStart        The item's start date
         * @return {ICAL.RecurIterator}     The recurrence iterator
         */
        iterator: function(aStart) {
          return new ICAL2.RecurIterator({
            rule: this,
            dtstart: aStart
          });
        },
        /**
         * Returns a clone of the recurrence object.
         *
         * @return {ICAL.Recur}      The cloned object
         */
        clone: function clone() {
          return new ICAL2.Recur(this.toJSON());
        },
        /**
         * Checks if the current rule is finite, i.e. has a count or until part.
         *
         * @return {Boolean}        True, if the rule is finite
         */
        isFinite: function isfinite() {
          return !!(this.count || this.until);
        },
        /**
         * Checks if the current rule has a count part, and not limited by an until
         * part.
         *
         * @return {Boolean}        True, if the rule is by count
         */
        isByCount: function isbycount() {
          return !!(this.count && !this.until);
        },
        /**
         * Adds a component (part) to the recurrence rule. This is not a component
         * in the sense of {@link ICAL.Component}, but a part of the recurrence
         * rule, i.e. BYMONTH.
         *
         * @param {String} aType            The name of the component part
         * @param {Array|String} aValue     The component value
         */
        addComponent: function addPart(aType, aValue) {
          var ucname = aType.toUpperCase();
          if (ucname in this.parts) {
            this.parts[ucname].push(aValue);
          } else {
            this.parts[ucname] = [aValue];
          }
        },
        /**
         * Sets the component value for the given by-part.
         *
         * @param {String} aType        The component part name
         * @param {Array} aValues       The component values
         */
        setComponent: function setComponent(aType, aValues) {
          this.parts[aType.toUpperCase()] = aValues.slice();
        },
        /**
         * Gets (a copy) of the requested component value.
         *
         * @param {String} aType        The component part name
         * @return {Array}              The component part value
         */
        getComponent: function getComponent(aType) {
          var ucname = aType.toUpperCase();
          return ucname in this.parts ? this.parts[ucname].slice() : [];
        },
        /**
         * Retrieves the next occurrence after the given recurrence id. See the
         * guide on {@tutorial terminology} for more details.
         *
         * NOTE: Currently, this method iterates all occurrences from the start
         * date. It should not be called in a loop for performance reasons. If you
         * would like to get more than one occurrence, you can iterate the
         * occurrences manually, see the example on the
         * {@link ICAL.Recur#iterator iterator} method.
         *
         * @param {ICAL.Time} aStartTime        The start of the event series
         * @param {ICAL.Time} aRecurrenceId     The date of the last occurrence
         * @return {ICAL.Time}                  The next occurrence after
         */
        getNextOccurrence: function getNextOccurrence(aStartTime, aRecurrenceId) {
          var iter = this.iterator(aStartTime);
          var next, cdt;
          do {
            next = iter.next();
          } while (next && next.compare(aRecurrenceId) <= 0);
          if (next && aRecurrenceId.zone) {
            next.zone = aRecurrenceId.zone;
          }
          return next;
        },
        /**
         * Sets up the current instance using members from the passed data object.
         *
         * @param {Object} data                               An object with members of the recurrence
         * @param {ICAL.Recur.frequencyValues=} data.freq     The frequency value
         * @param {Number=} data.interval                     The INTERVAL value
         * @param {ICAL.Time.weekDay=} data.wkst              The week start value
         * @param {ICAL.Time=} data.until                     The end of the recurrence set
         * @param {Number=} data.count                        The number of occurrences
         * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
         * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
         * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
         * @param {Array.<String>=} data.byday                The BYDAY values
         * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
         * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
         * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
         * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
         * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
         */
        fromData: function(data) {
          for (var key2 in data) {
            var uckey = key2.toUpperCase();
            if (uckey in partDesign) {
              if (Array.isArray(data[key2])) {
                this.parts[uckey] = data[key2];
              } else {
                this.parts[uckey] = [data[key2]];
              }
            } else {
              this[key2] = data[key2];
            }
          }
          if (this.interval && typeof this.interval != "number") {
            optionDesign.INTERVAL(this.interval, this);
          }
          if (this.wkst && typeof this.wkst != "number") {
            this.wkst = ICAL2.Recur.icalDayToNumericDay(this.wkst);
          }
          if (this.until && !(this.until instanceof ICAL2.Time)) {
            this.until = ICAL2.Time.fromString(this.until);
          }
        },
        /**
         * The jCal representation of this recurrence type.
         * @return {Object}
         */
        toJSON: function() {
          var res = /* @__PURE__ */ Object.create(null);
          res.freq = this.freq;
          if (this.count) {
            res.count = this.count;
          }
          if (this.interval > 1) {
            res.interval = this.interval;
          }
          for (var k in this.parts) {
            if (!this.parts.hasOwnProperty(k)) {
              continue;
            }
            var kparts = this.parts[k];
            if (Array.isArray(kparts) && kparts.length == 1) {
              res[k.toLowerCase()] = kparts[0];
            } else {
              res[k.toLowerCase()] = ICAL2.helpers.clone(this.parts[k]);
            }
          }
          if (this.until) {
            res.until = this.until.toString();
          }
          if ("wkst" in this && this.wkst !== ICAL2.Time.DEFAULT_WEEK_START) {
            res.wkst = ICAL2.Recur.numericDayToIcalDay(this.wkst);
          }
          return res;
        },
        /**
         * The string representation of this recurrence rule.
         * @return {String}
         */
        toString: function icalrecur_toString() {
          var str = "FREQ=" + this.freq;
          if (this.count) {
            str += ";COUNT=" + this.count;
          }
          if (this.interval > 1) {
            str += ";INTERVAL=" + this.interval;
          }
          for (var k in this.parts) {
            if (this.parts.hasOwnProperty(k)) {
              str += ";" + k + "=" + this.parts[k];
            }
          }
          if (this.until) {
            str += ";UNTIL=" + this.until.toICALString();
          }
          if ("wkst" in this && this.wkst !== ICAL2.Time.DEFAULT_WEEK_START) {
            str += ";WKST=" + ICAL2.Recur.numericDayToIcalDay(this.wkst);
          }
          return str;
        }
      };
      function parseNumericValue(type, min, max, value) {
        var result = value;
        if (value[0] === "+") {
          result = value.substr(1);
        }
        result = ICAL2.helpers.strictParseInt(result);
        if (min !== void 0 && value < min) {
          throw new Error(
            type + ': invalid value "' + value + '" must be > ' + min
          );
        }
        if (max !== void 0 && value > max) {
          throw new Error(
            type + ': invalid value "' + value + '" must be < ' + min
          );
        }
        return result;
      }
      ICAL2.Recur.icalDayToNumericDay = function toNumericDay(string, aWeekStart) {
        var firstDow = aWeekStart || ICAL2.Time.SUNDAY;
        return (DOW_MAP[string] - firstDow + 7) % 7 + 1;
      };
      ICAL2.Recur.numericDayToIcalDay = function toIcalDay(num, aWeekStart) {
        var firstDow = aWeekStart || ICAL2.Time.SUNDAY;
        var dow = num + firstDow - ICAL2.Time.SUNDAY;
        if (dow > 7) {
          dow -= 7;
        }
        return REVERSE_DOW_MAP[dow];
      };
      var VALID_DAY_NAMES = /^(SU|MO|TU|WE|TH|FR|SA)$/;
      var VALID_BYDAY_PART = /^([+-])?(5[0-3]|[1-4][0-9]|[1-9])?(SU|MO|TU|WE|TH|FR|SA)$/;
      var ALLOWED_FREQ = [
        "SECONDLY",
        "MINUTELY",
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY"
      ];
      var optionDesign = {
        FREQ: function(value, dict, fmtIcal) {
          if (ALLOWED_FREQ.indexOf(value) !== -1) {
            dict.freq = value;
          } else {
            throw new Error(
              'invalid frequency "' + value + '" expected: "' + ALLOWED_FREQ.join(", ") + '"'
            );
          }
        },
        COUNT: function(value, dict, fmtIcal) {
          dict.count = ICAL2.helpers.strictParseInt(value);
        },
        INTERVAL: function(value, dict, fmtIcal) {
          dict.interval = ICAL2.helpers.strictParseInt(value);
          if (dict.interval < 1) {
            dict.interval = 1;
          }
        },
        UNTIL: function(value, dict, fmtIcal) {
          if (value.length > 10) {
            dict.until = ICAL2.design.icalendar.value["date-time"].fromICAL(value);
          } else {
            dict.until = ICAL2.design.icalendar.value.date.fromICAL(value);
          }
          if (!fmtIcal) {
            dict.until = ICAL2.Time.fromString(dict.until);
          }
        },
        WKST: function(value, dict, fmtIcal) {
          if (VALID_DAY_NAMES.test(value)) {
            dict.wkst = ICAL2.Recur.icalDayToNumericDay(value);
          } else {
            throw new Error('invalid WKST value "' + value + '"');
          }
        }
      };
      var partDesign = {
        BYSECOND: parseNumericValue.bind(this, "BYSECOND", 0, 60),
        BYMINUTE: parseNumericValue.bind(this, "BYMINUTE", 0, 59),
        BYHOUR: parseNumericValue.bind(this, "BYHOUR", 0, 23),
        BYDAY: function(value) {
          if (VALID_BYDAY_PART.test(value)) {
            return value;
          } else {
            throw new Error('invalid BYDAY value "' + value + '"');
          }
        },
        BYMONTHDAY: parseNumericValue.bind(this, "BYMONTHDAY", -31, 31),
        BYYEARDAY: parseNumericValue.bind(this, "BYYEARDAY", -366, 366),
        BYWEEKNO: parseNumericValue.bind(this, "BYWEEKNO", -53, 53),
        BYMONTH: parseNumericValue.bind(this, "BYMONTH", 1, 12),
        BYSETPOS: parseNumericValue.bind(this, "BYSETPOS", -366, 366)
      };
      ICAL2.Recur.fromString = function(string) {
        var data = ICAL2.Recur._stringToData(string, false);
        return new ICAL2.Recur(data);
      };
      ICAL2.Recur.fromData = function(aData) {
        return new ICAL2.Recur(aData);
      };
      ICAL2.Recur._stringToData = function(string, fmtIcal) {
        var dict = /* @__PURE__ */ Object.create(null);
        var values = string.split(";");
        var len = values.length;
        for (var i = 0; i < len; i++) {
          var parts = values[i].split("=");
          var ucname = parts[0].toUpperCase();
          var lcname = parts[0].toLowerCase();
          var name = fmtIcal ? lcname : ucname;
          var value = parts[1];
          if (ucname in partDesign) {
            var partArr = value.split(",");
            var partArrIdx = 0;
            var partArrLen = partArr.length;
            for (; partArrIdx < partArrLen; partArrIdx++) {
              partArr[partArrIdx] = partDesign[ucname](partArr[partArrIdx]);
            }
            dict[name] = partArr.length == 1 ? partArr[0] : partArr;
          } else if (ucname in optionDesign) {
            optionDesign[ucname](value, dict, fmtIcal);
          } else {
            dict[lcname] = value;
          }
        }
        return dict;
      };
    })();
    ICAL2.RecurIterator = function() {
      function icalrecur_iterator(options) {
        this.fromData(options);
      }
      icalrecur_iterator.prototype = {
        /**
         * True when iteration is finished.
         * @type {Boolean}
         */
        completed: false,
        /**
         * The rule that is being iterated
         * @type {ICAL.Recur}
         */
        rule: null,
        /**
         * The start date of the event being iterated.
         * @type {ICAL.Time}
         */
        dtstart: null,
        /**
         * The last occurrence that was returned from the
         * {@link ICAL.RecurIterator#next} method.
         * @type {ICAL.Time}
         */
        last: null,
        /**
         * The sequence number from the occurrence
         * @type {Number}
         */
        occurrence_number: 0,
        /**
         * The indices used for the {@link ICAL.RecurIterator#by_data} object.
         * @type {Object}
         * @private
         */
        by_indices: null,
        /**
         * If true, the iterator has already been initialized
         * @type {Boolean}
         * @private
         */
        initialized: false,
        /**
         * The initializd by-data.
         * @type {Object}
         * @private
         */
        by_data: null,
        /**
         * The expanded yeardays
         * @type {Array}
         * @private
         */
        days: null,
        /**
         * The index in the {@link ICAL.RecurIterator#days} array.
         * @type {Number}
         * @private
         */
        days_index: 0,
        /**
         * Initialize the recurrence iterator from the passed data object. This
         * method is usually not called directly, you can initialize the iterator
         * through the constructor.
         *
         * @param {Object} options                The iterator options
         * @param {ICAL.Recur} options.rule       The rule to iterate.
         * @param {ICAL.Time} options.dtstart     The start date of the event.
         * @param {Boolean=} options.initialized  When true, assume that options are
         *        from a previously constructed iterator. Initialization will not be
         *        repeated.
         */
        fromData: function(options) {
          this.rule = ICAL2.helpers.formatClassType(options.rule, ICAL2.Recur);
          if (!this.rule) {
            throw new Error("iterator requires a (ICAL.Recur) rule");
          }
          this.dtstart = ICAL2.helpers.formatClassType(options.dtstart, ICAL2.Time);
          if (!this.dtstart) {
            throw new Error("iterator requires a (ICAL.Time) dtstart");
          }
          if (options.by_data) {
            this.by_data = options.by_data;
          } else {
            this.by_data = ICAL2.helpers.clone(this.rule.parts, true);
          }
          if (options.occurrence_number)
            this.occurrence_number = options.occurrence_number;
          this.days = options.days || [];
          if (options.last) {
            this.last = ICAL2.helpers.formatClassType(options.last, ICAL2.Time);
          }
          this.by_indices = options.by_indices;
          if (!this.by_indices) {
            this.by_indices = {
              "BYSECOND": 0,
              "BYMINUTE": 0,
              "BYHOUR": 0,
              "BYDAY": 0,
              "BYMONTH": 0,
              "BYWEEKNO": 0,
              "BYMONTHDAY": 0
            };
          }
          this.initialized = options.initialized || false;
          if (!this.initialized) {
            this.init();
          }
        },
        /**
         * Intialize the iterator
         * @private
         */
        init: function icalrecur_iterator_init() {
          this.initialized = true;
          this.last = this.dtstart.clone();
          var parts = this.by_data;
          if ("BYDAY" in parts) {
            this.sort_byday_rules(parts.BYDAY);
          }
          if ("BYYEARDAY" in parts) {
            if ("BYMONTH" in parts || "BYWEEKNO" in parts || "BYMONTHDAY" in parts || "BYDAY" in parts) {
              throw new Error("Invalid BYYEARDAY rule");
            }
          }
          if ("BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
            throw new Error("BYWEEKNO does not fit to BYMONTHDAY");
          }
          if (this.rule.freq == "MONTHLY" && ("BYYEARDAY" in parts || "BYWEEKNO" in parts)) {
            throw new Error("For MONTHLY recurrences neither BYYEARDAY nor BYWEEKNO may appear");
          }
          if (this.rule.freq == "WEEKLY" && ("BYYEARDAY" in parts || "BYMONTHDAY" in parts)) {
            throw new Error("For WEEKLY recurrences neither BYMONTHDAY nor BYYEARDAY may appear");
          }
          if (this.rule.freq != "YEARLY" && "BYYEARDAY" in parts) {
            throw new Error("BYYEARDAY may only appear in YEARLY rules");
          }
          this.last.second = this.setup_defaults("BYSECOND", "SECONDLY", this.dtstart.second);
          this.last.minute = this.setup_defaults("BYMINUTE", "MINUTELY", this.dtstart.minute);
          this.last.hour = this.setup_defaults("BYHOUR", "HOURLY", this.dtstart.hour);
          this.last.day = this.setup_defaults("BYMONTHDAY", "DAILY", this.dtstart.day);
          this.last.month = this.setup_defaults("BYMONTH", "MONTHLY", this.dtstart.month);
          if (this.rule.freq == "WEEKLY") {
            if ("BYDAY" in parts) {
              var bydayParts = this.ruleDayOfWeek(parts.BYDAY[0], this.rule.wkst);
              var pos = bydayParts[0];
              var dow = bydayParts[1];
              var wkdy = dow - this.last.dayOfWeek(this.rule.wkst);
              if (this.last.dayOfWeek(this.rule.wkst) < dow && wkdy >= 0 || wkdy < 0) {
                this.last.day += wkdy;
              }
            } else {
              var dayName = ICAL2.Recur.numericDayToIcalDay(this.dtstart.dayOfWeek());
              parts.BYDAY = [dayName];
            }
          }
          if (this.rule.freq == "YEARLY") {
            for (; ; ) {
              this.expand_year_days(this.last.year);
              if (this.days.length > 0) {
                break;
              }
              this.increment_year(this.rule.interval);
            }
            this._nextByYearDay();
          }
          if (this.rule.freq == "MONTHLY" && this.has_by_data("BYDAY")) {
            var tempLast = null;
            var initLast = this.last.clone();
            var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
            for (var i in this.by_data.BYDAY) {
              if (!this.by_data.BYDAY.hasOwnProperty(i)) {
                continue;
              }
              this.last = initLast.clone();
              var bydayParts = this.ruleDayOfWeek(this.by_data.BYDAY[i]);
              var pos = bydayParts[0];
              var dow = bydayParts[1];
              var dayOfMonth = this.last.nthWeekDay(dow, pos);
              if (pos >= 6 || pos <= -6) {
                throw new Error("Malformed values in BYDAY part");
              }
              if (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
                if (tempLast && tempLast.month == initLast.month) {
                  continue;
                }
                while (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
                  this.increment_month();
                  daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
                  dayOfMonth = this.last.nthWeekDay(dow, pos);
                }
              }
              this.last.day = dayOfMonth;
              if (!tempLast || this.last.compare(tempLast) < 0) {
                tempLast = this.last.clone();
              }
            }
            this.last = tempLast.clone();
            if (this.has_by_data("BYMONTHDAY")) {
              this._byDayAndMonthDay(true);
            }
            if (this.last.day > daysInMonth || this.last.day == 0) {
              throw new Error("Malformed values in BYDAY part");
            }
          } else if (this.has_by_data("BYMONTHDAY")) {
            if (this.last.day < 0) {
              var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
              this.last.day = daysInMonth + this.last.day + 1;
            }
          }
        },
        /**
         * Retrieve the next occurrence from the iterator.
         * @return {ICAL.Time}
         */
        next: function icalrecur_iterator_next() {
          var before = this.last ? this.last.clone() : null;
          if (this.rule.count && this.occurrence_number >= this.rule.count || this.rule.until && this.last.compare(this.rule.until) > 0) {
            this.completed = true;
            return null;
          }
          if (this.occurrence_number == 0 && this.last.compare(this.dtstart) >= 0) {
            this.occurrence_number++;
            return this.last;
          }
          var valid;
          do {
            valid = 1;
            switch (this.rule.freq) {
              case "SECONDLY":
                this.next_second();
                break;
              case "MINUTELY":
                this.next_minute();
                break;
              case "HOURLY":
                this.next_hour();
                break;
              case "DAILY":
                this.next_day();
                break;
              case "WEEKLY":
                this.next_week();
                break;
              case "MONTHLY":
                valid = this.next_month();
                break;
              case "YEARLY":
                this.next_year();
                break;
              default:
                return null;
            }
          } while (!this.check_contracting_rules() || this.last.compare(this.dtstart) < 0 || !valid);
          if (this.last.compare(before) == 0) {
            throw new Error("Same occurrence found twice, protecting you from death by recursion");
          }
          if (this.rule.until && this.last.compare(this.rule.until) > 0) {
            this.completed = true;
            return null;
          } else {
            this.occurrence_number++;
            return this.last;
          }
        },
        next_second: function next_second() {
          return this.next_generic("BYSECOND", "SECONDLY", "second", "minute");
        },
        increment_second: function increment_second(inc) {
          return this.increment_generic(inc, "second", 60, "minute");
        },
        next_minute: function next_minute() {
          return this.next_generic(
            "BYMINUTE",
            "MINUTELY",
            "minute",
            "hour",
            "next_second"
          );
        },
        increment_minute: function increment_minute(inc) {
          return this.increment_generic(inc, "minute", 60, "hour");
        },
        next_hour: function next_hour() {
          return this.next_generic(
            "BYHOUR",
            "HOURLY",
            "hour",
            "monthday",
            "next_minute"
          );
        },
        increment_hour: function increment_hour(inc) {
          this.increment_generic(inc, "hour", 24, "monthday");
        },
        next_day: function next_day() {
          var has_by_day = "BYDAY" in this.by_data;
          var this_freq = this.rule.freq == "DAILY";
          if (this.next_hour() == 0) {
            return 0;
          }
          if (this_freq) {
            this.increment_monthday(this.rule.interval);
          } else {
            this.increment_monthday(1);
          }
          return 0;
        },
        next_week: function next_week() {
          var end_of_data = 0;
          if (this.next_weekday_by_week() == 0) {
            return end_of_data;
          }
          if (this.has_by_data("BYWEEKNO")) {
            var idx = ++this.by_indices.BYWEEKNO;
            if (this.by_indices.BYWEEKNO == this.by_data.BYWEEKNO.length) {
              this.by_indices.BYWEEKNO = 0;
              end_of_data = 1;
            }
            this.last.month = 1;
            this.last.day = 1;
            var week_no = this.by_data.BYWEEKNO[this.by_indices.BYWEEKNO];
            this.last.day += 7 * week_no;
            if (end_of_data) {
              this.increment_year(1);
            }
          } else {
            this.increment_monthday(7 * this.rule.interval);
          }
          return end_of_data;
        },
        /**
         * Normalize each by day rule for a given year/month.
         * Takes into account ordering and negative rules
         *
         * @private
         * @param {Number} year         Current year.
         * @param {Number} month        Current month.
         * @param {Array}  rules        Array of rules.
         *
         * @return {Array} sorted and normalized rules.
         *                 Negative rules will be expanded to their
         *                 correct positive values for easier processing.
         */
        normalizeByMonthDayRules: function(year, month, rules) {
          var daysInMonth = ICAL2.Time.daysInMonth(month, year);
          var newRules = [];
          var ruleIdx = 0;
          var len = rules.length;
          var rule;
          for (; ruleIdx < len; ruleIdx++) {
            rule = rules[ruleIdx];
            if (Math.abs(rule) > daysInMonth) {
              continue;
            }
            if (rule < 0) {
              rule = daysInMonth + (rule + 1);
            } else if (rule === 0) {
              continue;
            }
            if (newRules.indexOf(rule) === -1) {
              newRules.push(rule);
            }
          }
          return newRules.sort(function(a, b) {
            return a - b;
          });
        },
        /**
         * NOTES:
         * We are given a list of dates in the month (BYMONTHDAY) (23, etc..)
         * Also we are given a list of days (BYDAY) (MO, 2SU, etc..) when
         * both conditions match a given date (this.last.day) iteration stops.
         *
         * @private
         * @param {Boolean=} isInit     When given true will not increment the
         *                                current day (this.last).
         */
        _byDayAndMonthDay: function(isInit) {
          var byMonthDay;
          var byDay = this.by_data.BYDAY;
          var date;
          var dateIdx = 0;
          var dateLen;
          var dayLen = byDay.length;
          var dataIsValid = 0;
          var daysInMonth;
          var self = this;
          var lastDay = this.last.day;
          function initMonth() {
            daysInMonth = ICAL2.Time.daysInMonth(
              self.last.month,
              self.last.year
            );
            byMonthDay = self.normalizeByMonthDayRules(
              self.last.year,
              self.last.month,
              self.by_data.BYMONTHDAY
            );
            dateLen = byMonthDay.length;
            while (byMonthDay[dateIdx] <= lastDay && !(isInit && byMonthDay[dateIdx] == lastDay) && dateIdx < dateLen - 1) {
              dateIdx++;
            }
          }
          function nextMonth() {
            lastDay = 0;
            self.increment_month();
            dateIdx = 0;
            initMonth();
          }
          initMonth();
          if (isInit) {
            lastDay -= 1;
          }
          var monthsCounter = 48;
          while (!dataIsValid && monthsCounter) {
            monthsCounter--;
            date = lastDay + 1;
            if (date > daysInMonth) {
              nextMonth();
              continue;
            }
            var next = byMonthDay[dateIdx++];
            if (next >= date) {
              lastDay = next;
            } else {
              nextMonth();
              continue;
            }
            for (var dayIdx = 0; dayIdx < dayLen; dayIdx++) {
              var parts = this.ruleDayOfWeek(byDay[dayIdx]);
              var pos = parts[0];
              var dow = parts[1];
              this.last.day = lastDay;
              if (this.last.isNthWeekDay(dow, pos)) {
                dataIsValid = 1;
                break;
              }
            }
            if (!dataIsValid && dateIdx === dateLen) {
              nextMonth();
              continue;
            }
          }
          if (monthsCounter <= 0) {
            throw new Error("Malformed values in BYDAY combined with BYMONTHDAY parts");
          }
          return dataIsValid;
        },
        next_month: function next_month() {
          var this_freq = this.rule.freq == "MONTHLY";
          var data_valid = 1;
          if (this.next_hour() == 0) {
            return data_valid;
          }
          if (this.has_by_data("BYDAY") && this.has_by_data("BYMONTHDAY")) {
            data_valid = this._byDayAndMonthDay();
          } else if (this.has_by_data("BYDAY")) {
            var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
            var setpos = 0;
            var setpos_total = 0;
            if (this.has_by_data("BYSETPOS")) {
              var last_day = this.last.day;
              for (var day = 1; day <= daysInMonth; day++) {
                this.last.day = day;
                if (this.is_day_in_byday(this.last)) {
                  setpos_total++;
                  if (day <= last_day) {
                    setpos++;
                  }
                }
              }
              this.last.day = last_day;
            }
            data_valid = 0;
            for (var day = this.last.day + 1; day <= daysInMonth; day++) {
              this.last.day = day;
              if (this.is_day_in_byday(this.last)) {
                if (!this.has_by_data("BYSETPOS") || this.check_set_position(++setpos) || this.check_set_position(setpos - setpos_total - 1)) {
                  data_valid = 1;
                  break;
                }
              }
            }
            if (day > daysInMonth) {
              this.last.day = 1;
              this.increment_month();
              if (this.is_day_in_byday(this.last)) {
                if (!this.has_by_data("BYSETPOS") || this.check_set_position(1)) {
                  data_valid = 1;
                }
              } else {
                data_valid = 0;
              }
            }
          } else if (this.has_by_data("BYMONTHDAY")) {
            this.by_indices.BYMONTHDAY++;
            if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
              this.by_indices.BYMONTHDAY = 0;
              this.increment_month();
            }
            var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
            var day = this.by_data.BYMONTHDAY[this.by_indices.BYMONTHDAY];
            if (day < 0) {
              day = daysInMonth + day + 1;
            }
            if (day > daysInMonth) {
              this.last.day = 1;
              data_valid = this.is_day_in_byday(this.last);
            } else {
              this.last.day = day;
            }
          } else {
            this.increment_month();
            var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
            if (this.by_data.BYMONTHDAY[0] > daysInMonth) {
              data_valid = 0;
            } else {
              this.last.day = this.by_data.BYMONTHDAY[0];
            }
          }
          return data_valid;
        },
        next_weekday_by_week: function next_weekday_by_week() {
          var end_of_data = 0;
          if (this.next_hour() == 0) {
            return end_of_data;
          }
          if (!this.has_by_data("BYDAY")) {
            return 1;
          }
          for (; ; ) {
            var tt = new ICAL2.Time();
            this.by_indices.BYDAY++;
            if (this.by_indices.BYDAY == Object.keys(this.by_data.BYDAY).length) {
              this.by_indices.BYDAY = 0;
              end_of_data = 1;
            }
            var coded_day = this.by_data.BYDAY[this.by_indices.BYDAY];
            var parts = this.ruleDayOfWeek(coded_day);
            var dow = parts[1];
            dow -= this.rule.wkst;
            if (dow < 0) {
              dow += 7;
            }
            tt.year = this.last.year;
            tt.month = this.last.month;
            tt.day = this.last.day;
            var startOfWeek = tt.startDoyWeek(this.rule.wkst);
            if (dow + startOfWeek < 1) {
              if (!end_of_data) {
                continue;
              }
            }
            var next = ICAL2.Time.fromDayOfYear(
              startOfWeek + dow,
              this.last.year
            );
            this.last.year = next.year;
            this.last.month = next.month;
            this.last.day = next.day;
            return end_of_data;
          }
        },
        next_year: function next_year() {
          if (this.next_hour() == 0) {
            return 0;
          }
          if (++this.days_index == this.days.length) {
            this.days_index = 0;
            do {
              this.increment_year(this.rule.interval);
              this.expand_year_days(this.last.year);
            } while (this.days.length == 0);
          }
          this._nextByYearDay();
          return 1;
        },
        _nextByYearDay: function _nextByYearDay() {
          var doy = this.days[this.days_index];
          var year = this.last.year;
          if (doy < 1) {
            doy += 1;
            year += 1;
          }
          var next = ICAL2.Time.fromDayOfYear(doy, year);
          this.last.day = next.day;
          this.last.month = next.month;
        },
        /**
         * @param dow (eg: '1TU', '-1MO')
         * @param {ICAL.Time.weekDay=} aWeekStart The week start weekday
         * @return [pos, numericDow] (eg: [1, 3]) numericDow is relative to aWeekStart
         */
        ruleDayOfWeek: function ruleDayOfWeek(dow, aWeekStart) {
          var matches = dow.match(/([+-]?[0-9])?(MO|TU|WE|TH|FR|SA|SU)/);
          if (matches) {
            var pos = parseInt(matches[1] || 0, 10);
            dow = ICAL2.Recur.icalDayToNumericDay(matches[2], aWeekStart);
            return [pos, dow];
          } else {
            return [0, 0];
          }
        },
        next_generic: function next_generic(aRuleType, aInterval, aDateAttr, aFollowingAttr, aPreviousIncr) {
          var has_by_rule = aRuleType in this.by_data;
          var this_freq = this.rule.freq == aInterval;
          var end_of_data = 0;
          if (aPreviousIncr && this[aPreviousIncr]() == 0) {
            return end_of_data;
          }
          if (has_by_rule) {
            this.by_indices[aRuleType]++;
            var idx = this.by_indices[aRuleType];
            var dta = this.by_data[aRuleType];
            if (this.by_indices[aRuleType] == dta.length) {
              this.by_indices[aRuleType] = 0;
              end_of_data = 1;
            }
            this.last[aDateAttr] = dta[this.by_indices[aRuleType]];
          } else if (this_freq) {
            this["increment_" + aDateAttr](this.rule.interval);
          }
          if (has_by_rule && end_of_data && this_freq) {
            this["increment_" + aFollowingAttr](1);
          }
          return end_of_data;
        },
        increment_monthday: function increment_monthday(inc) {
          for (var i = 0; i < inc; i++) {
            var daysInMonth = ICAL2.Time.daysInMonth(this.last.month, this.last.year);
            this.last.day++;
            if (this.last.day > daysInMonth) {
              this.last.day -= daysInMonth;
              this.increment_month();
            }
          }
        },
        increment_month: function increment_month() {
          this.last.day = 1;
          if (this.has_by_data("BYMONTH")) {
            this.by_indices.BYMONTH++;
            if (this.by_indices.BYMONTH == this.by_data.BYMONTH.length) {
              this.by_indices.BYMONTH = 0;
              this.increment_year(1);
            }
            this.last.month = this.by_data.BYMONTH[this.by_indices.BYMONTH];
          } else {
            if (this.rule.freq == "MONTHLY") {
              this.last.month += this.rule.interval;
            } else {
              this.last.month++;
            }
            this.last.month--;
            var years = ICAL2.helpers.trunc(this.last.month / 12);
            this.last.month %= 12;
            this.last.month++;
            if (years != 0) {
              this.increment_year(years);
            }
          }
        },
        increment_year: function increment_year(inc) {
          this.last.year += inc;
        },
        increment_generic: function increment_generic(inc, aDateAttr, aFactor, aNextIncrement) {
          this.last[aDateAttr] += inc;
          var nextunit = ICAL2.helpers.trunc(this.last[aDateAttr] / aFactor);
          this.last[aDateAttr] %= aFactor;
          if (nextunit != 0) {
            this["increment_" + aNextIncrement](nextunit);
          }
        },
        has_by_data: function has_by_data(aRuleType) {
          return aRuleType in this.rule.parts;
        },
        expand_year_days: function expand_year_days(aYear) {
          var t = new ICAL2.Time();
          this.days = [];
          var parts = {};
          var rules = ["BYDAY", "BYWEEKNO", "BYMONTHDAY", "BYMONTH", "BYYEARDAY"];
          for (var p in rules) {
            if (rules.hasOwnProperty(p)) {
              var part = rules[p];
              if (part in this.rule.parts) {
                parts[part] = this.rule.parts[part];
              }
            }
          }
          if ("BYMONTH" in parts && "BYWEEKNO" in parts) {
            var valid = 1;
            var validWeeks = {};
            t.year = aYear;
            t.isDate = true;
            for (var monthIdx = 0; monthIdx < this.by_data.BYMONTH.length; monthIdx++) {
              var month = this.by_data.BYMONTH[monthIdx];
              t.month = month;
              t.day = 1;
              var first_week = t.weekNumber(this.rule.wkst);
              t.day = ICAL2.Time.daysInMonth(month, aYear);
              var last_week = t.weekNumber(this.rule.wkst);
              for (monthIdx = first_week; monthIdx < last_week; monthIdx++) {
                validWeeks[monthIdx] = 1;
              }
            }
            for (var weekIdx = 0; weekIdx < this.by_data.BYWEEKNO.length && valid; weekIdx++) {
              var weekno = this.by_data.BYWEEKNO[weekIdx];
              if (weekno < 52) {
                valid &= validWeeks[weekIdx];
              } else {
                valid = 0;
              }
            }
            if (valid) {
              delete parts.BYMONTH;
            } else {
              delete parts.BYWEEKNO;
            }
          }
          var partCount = Object.keys(parts).length;
          if (partCount == 0) {
            var t1 = this.dtstart.clone();
            t1.year = this.last.year;
            this.days.push(t1.dayOfYear());
          } else if (partCount == 1 && "BYMONTH" in parts) {
            for (var monthkey in this.by_data.BYMONTH) {
              if (!this.by_data.BYMONTH.hasOwnProperty(monthkey)) {
                continue;
              }
              var t2 = this.dtstart.clone();
              t2.year = aYear;
              t2.month = this.by_data.BYMONTH[monthkey];
              t2.isDate = true;
              this.days.push(t2.dayOfYear());
            }
          } else if (partCount == 1 && "BYMONTHDAY" in parts) {
            for (var monthdaykey in this.by_data.BYMONTHDAY) {
              if (!this.by_data.BYMONTHDAY.hasOwnProperty(monthdaykey)) {
                continue;
              }
              var t3 = this.dtstart.clone();
              var day_ = this.by_data.BYMONTHDAY[monthdaykey];
              if (day_ < 0) {
                var daysInMonth = ICAL2.Time.daysInMonth(t3.month, aYear);
                day_ = day_ + daysInMonth + 1;
              }
              t3.day = day_;
              t3.year = aYear;
              t3.isDate = true;
              this.days.push(t3.dayOfYear());
            }
          } else if (partCount == 2 && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
            for (var monthkey in this.by_data.BYMONTH) {
              if (!this.by_data.BYMONTH.hasOwnProperty(monthkey)) {
                continue;
              }
              var month_ = this.by_data.BYMONTH[monthkey];
              var daysInMonth = ICAL2.Time.daysInMonth(month_, aYear);
              for (var monthdaykey in this.by_data.BYMONTHDAY) {
                if (!this.by_data.BYMONTHDAY.hasOwnProperty(monthdaykey)) {
                  continue;
                }
                var day_ = this.by_data.BYMONTHDAY[monthdaykey];
                if (day_ < 0) {
                  day_ = day_ + daysInMonth + 1;
                }
                t.day = day_;
                t.month = month_;
                t.year = aYear;
                t.isDate = true;
                this.days.push(t.dayOfYear());
              }
            }
          } else if (partCount == 1 && "BYWEEKNO" in parts) {
          } else if (partCount == 2 && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
          } else if (partCount == 1 && "BYDAY" in parts) {
            this.days = this.days.concat(this.expand_by_day(aYear));
          } else if (partCount == 2 && "BYDAY" in parts && "BYMONTH" in parts) {
            for (var monthkey in this.by_data.BYMONTH) {
              if (!this.by_data.BYMONTH.hasOwnProperty(monthkey)) {
                continue;
              }
              var month = this.by_data.BYMONTH[monthkey];
              var daysInMonth = ICAL2.Time.daysInMonth(month, aYear);
              t.year = aYear;
              t.month = this.by_data.BYMONTH[monthkey];
              t.day = 1;
              t.isDate = true;
              var first_dow = t.dayOfWeek();
              var doy_offset = t.dayOfYear() - 1;
              t.day = daysInMonth;
              var last_dow = t.dayOfWeek();
              if (this.has_by_data("BYSETPOS")) {
                var set_pos_counter = 0;
                var by_month_day = [];
                for (var day = 1; day <= daysInMonth; day++) {
                  t.day = day;
                  if (this.is_day_in_byday(t)) {
                    by_month_day.push(day);
                  }
                }
                for (var spIndex = 0; spIndex < by_month_day.length; spIndex++) {
                  if (this.check_set_position(spIndex + 1) || this.check_set_position(spIndex - by_month_day.length)) {
                    this.days.push(doy_offset + by_month_day[spIndex]);
                  }
                }
              } else {
                for (var daycodedkey in this.by_data.BYDAY) {
                  if (!this.by_data.BYDAY.hasOwnProperty(daycodedkey)) {
                    continue;
                  }
                  var coded_day = this.by_data.BYDAY[daycodedkey];
                  var bydayParts = this.ruleDayOfWeek(coded_day);
                  var pos = bydayParts[0];
                  var dow = bydayParts[1];
                  var month_day;
                  var first_matching_day = (dow + 7 - first_dow) % 7 + 1;
                  var last_matching_day = daysInMonth - (last_dow + 7 - dow) % 7;
                  if (pos == 0) {
                    for (var day = first_matching_day; day <= daysInMonth; day += 7) {
                      this.days.push(doy_offset + day);
                    }
                  } else if (pos > 0) {
                    month_day = first_matching_day + (pos - 1) * 7;
                    if (month_day <= daysInMonth) {
                      this.days.push(doy_offset + month_day);
                    }
                  } else {
                    month_day = last_matching_day + (pos + 1) * 7;
                    if (month_day > 0) {
                      this.days.push(doy_offset + month_day);
                    }
                  }
                }
              }
            }
            this.days.sort(function(a, b) {
              return a - b;
            });
          } else if (partCount == 2 && "BYDAY" in parts && "BYMONTHDAY" in parts) {
            var expandedDays = this.expand_by_day(aYear);
            for (var daykey in expandedDays) {
              if (!expandedDays.hasOwnProperty(daykey)) {
                continue;
              }
              var day = expandedDays[daykey];
              var tt = ICAL2.Time.fromDayOfYear(day, aYear);
              if (this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
                this.days.push(day);
              }
            }
          } else if (partCount == 3 && "BYDAY" in parts && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
            var expandedDays = this.expand_by_day(aYear);
            for (var daykey in expandedDays) {
              if (!expandedDays.hasOwnProperty(daykey)) {
                continue;
              }
              var day = expandedDays[daykey];
              var tt = ICAL2.Time.fromDayOfYear(day, aYear);
              if (this.by_data.BYMONTH.indexOf(tt.month) >= 0 && this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
                this.days.push(day);
              }
            }
          } else if (partCount == 2 && "BYDAY" in parts && "BYWEEKNO" in parts) {
            var expandedDays = this.expand_by_day(aYear);
            for (var daykey in expandedDays) {
              if (!expandedDays.hasOwnProperty(daykey)) {
                continue;
              }
              var day = expandedDays[daykey];
              var tt = ICAL2.Time.fromDayOfYear(day, aYear);
              var weekno = tt.weekNumber(this.rule.wkst);
              if (this.by_data.BYWEEKNO.indexOf(weekno)) {
                this.days.push(day);
              }
            }
          } else if (partCount == 3 && "BYDAY" in parts && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
          } else if (partCount == 1 && "BYYEARDAY" in parts) {
            this.days = this.days.concat(this.by_data.BYYEARDAY);
          } else {
            this.days = [];
          }
          return 0;
        },
        expand_by_day: function expand_by_day(aYear) {
          var days_list = [];
          var tmp = this.last.clone();
          tmp.year = aYear;
          tmp.month = 1;
          tmp.day = 1;
          tmp.isDate = true;
          var start_dow = tmp.dayOfWeek();
          tmp.month = 12;
          tmp.day = 31;
          tmp.isDate = true;
          var end_dow = tmp.dayOfWeek();
          var end_year_day = tmp.dayOfYear();
          for (var daykey in this.by_data.BYDAY) {
            if (!this.by_data.BYDAY.hasOwnProperty(daykey)) {
              continue;
            }
            var day = this.by_data.BYDAY[daykey];
            var parts = this.ruleDayOfWeek(day);
            var pos = parts[0];
            var dow = parts[1];
            if (pos == 0) {
              var tmp_start_doy = (dow + 7 - start_dow) % 7 + 1;
              for (var doy = tmp_start_doy; doy <= end_year_day; doy += 7) {
                days_list.push(doy);
              }
            } else if (pos > 0) {
              var first;
              if (dow >= start_dow) {
                first = dow - start_dow + 1;
              } else {
                first = dow - start_dow + 8;
              }
              days_list.push(first + (pos - 1) * 7);
            } else {
              var last;
              pos = -pos;
              if (dow <= end_dow) {
                last = end_year_day - end_dow + dow;
              } else {
                last = end_year_day - end_dow + dow - 7;
              }
              days_list.push(last - (pos - 1) * 7);
            }
          }
          return days_list;
        },
        is_day_in_byday: function is_day_in_byday(tt) {
          for (var daykey in this.by_data.BYDAY) {
            if (!this.by_data.BYDAY.hasOwnProperty(daykey)) {
              continue;
            }
            var day = this.by_data.BYDAY[daykey];
            var parts = this.ruleDayOfWeek(day);
            var pos = parts[0];
            var dow = parts[1];
            var this_dow = tt.dayOfWeek();
            if (pos == 0 && dow == this_dow || tt.nthWeekDay(dow, pos) == tt.day) {
              return 1;
            }
          }
          return 0;
        },
        /**
         * Checks if given value is in BYSETPOS.
         *
         * @private
         * @param {Numeric} aPos position to check for.
         * @return {Boolean} false unless BYSETPOS rules exist
         *                   and the given value is present in rules.
         */
        check_set_position: function check_set_position(aPos) {
          if (this.has_by_data("BYSETPOS")) {
            var idx = this.by_data.BYSETPOS.indexOf(aPos);
            return idx !== -1;
          }
          return false;
        },
        sort_byday_rules: function icalrecur_sort_byday_rules(aRules) {
          for (var i = 0; i < aRules.length; i++) {
            for (var j = 0; j < i; j++) {
              var one = this.ruleDayOfWeek(aRules[j], this.rule.wkst)[1];
              var two = this.ruleDayOfWeek(aRules[i], this.rule.wkst)[1];
              if (one > two) {
                var tmp = aRules[i];
                aRules[i] = aRules[j];
                aRules[j] = tmp;
              }
            }
          }
        },
        check_contract_restriction: function check_contract_restriction(aRuleType, v) {
          var indexMapValue = icalrecur_iterator._indexMap[aRuleType];
          var ruleMapValue = icalrecur_iterator._expandMap[this.rule.freq][indexMapValue];
          var pass = false;
          if (aRuleType in this.by_data && ruleMapValue == icalrecur_iterator.CONTRACT) {
            var ruleType = this.by_data[aRuleType];
            for (var bydatakey in ruleType) {
              if (ruleType.hasOwnProperty(bydatakey)) {
                if (ruleType[bydatakey] == v) {
                  pass = true;
                  break;
                }
              }
            }
          } else {
            pass = true;
          }
          return pass;
        },
        check_contracting_rules: function check_contracting_rules() {
          var dow = this.last.dayOfWeek();
          var weekNo = this.last.weekNumber(this.rule.wkst);
          var doy = this.last.dayOfYear();
          return this.check_contract_restriction("BYSECOND", this.last.second) && this.check_contract_restriction("BYMINUTE", this.last.minute) && this.check_contract_restriction("BYHOUR", this.last.hour) && this.check_contract_restriction("BYDAY", ICAL2.Recur.numericDayToIcalDay(dow)) && this.check_contract_restriction("BYWEEKNO", weekNo) && this.check_contract_restriction("BYMONTHDAY", this.last.day) && this.check_contract_restriction("BYMONTH", this.last.month) && this.check_contract_restriction("BYYEARDAY", doy);
        },
        setup_defaults: function setup_defaults(aRuleType, req, deftime) {
          var indexMapValue = icalrecur_iterator._indexMap[aRuleType];
          var ruleMapValue = icalrecur_iterator._expandMap[this.rule.freq][indexMapValue];
          if (ruleMapValue != icalrecur_iterator.CONTRACT) {
            if (!(aRuleType in this.by_data)) {
              this.by_data[aRuleType] = [deftime];
            }
            if (this.rule.freq != req) {
              return this.by_data[aRuleType][0];
            }
          }
          return deftime;
        },
        /**
         * Convert iterator into a serialize-able object.  Will preserve current
         * iteration sequence to ensure the seamless continuation of the recurrence
         * rule.
         * @return {Object}
         */
        toJSON: function() {
          var result = /* @__PURE__ */ Object.create(null);
          result.initialized = this.initialized;
          result.rule = this.rule.toJSON();
          result.dtstart = this.dtstart.toJSON();
          result.by_data = this.by_data;
          result.days = this.days;
          result.last = this.last.toJSON();
          result.by_indices = this.by_indices;
          result.occurrence_number = this.occurrence_number;
          return result;
        }
      };
      icalrecur_iterator._indexMap = {
        "BYSECOND": 0,
        "BYMINUTE": 1,
        "BYHOUR": 2,
        "BYDAY": 3,
        "BYMONTHDAY": 4,
        "BYYEARDAY": 5,
        "BYWEEKNO": 6,
        "BYMONTH": 7,
        "BYSETPOS": 8
      };
      icalrecur_iterator._expandMap = {
        "SECONDLY": [1, 1, 1, 1, 1, 1, 1, 1],
        "MINUTELY": [2, 1, 1, 1, 1, 1, 1, 1],
        "HOURLY": [2, 2, 1, 1, 1, 1, 1, 1],
        "DAILY": [2, 2, 2, 1, 1, 1, 1, 1],
        "WEEKLY": [2, 2, 2, 2, 3, 3, 1, 1],
        "MONTHLY": [2, 2, 2, 2, 2, 3, 3, 1],
        "YEARLY": [2, 2, 2, 2, 2, 2, 2, 2]
      };
      icalrecur_iterator.UNKNOWN = 0;
      icalrecur_iterator.CONTRACT = 1;
      icalrecur_iterator.EXPAND = 2;
      icalrecur_iterator.ILLEGAL = 3;
      return icalrecur_iterator;
    }();
    ICAL2.RecurExpansion = function() {
      function formatTime(item) {
        return ICAL2.helpers.formatClassType(item, ICAL2.Time);
      }
      function compareTime(a, b) {
        return a.compare(b);
      }
      function isRecurringComponent(comp) {
        return comp.hasProperty("rdate") || comp.hasProperty("rrule") || comp.hasProperty("recurrence-id");
      }
      function RecurExpansion(options) {
        this.ruleDates = [];
        this.exDates = [];
        this.fromData(options);
      }
      RecurExpansion.prototype = {
        /**
         * True when iteration is fully completed.
         * @type {Boolean}
         */
        complete: false,
        /**
         * Array of rrule iterators.
         *
         * @type {ICAL.RecurIterator[]}
         * @private
         */
        ruleIterators: null,
        /**
         * Array of rdate instances.
         *
         * @type {ICAL.Time[]}
         * @private
         */
        ruleDates: null,
        /**
         * Array of exdate instances.
         *
         * @type {ICAL.Time[]}
         * @private
         */
        exDates: null,
        /**
         * Current position in ruleDates array.
         * @type {Number}
         * @private
         */
        ruleDateInc: 0,
        /**
         * Current position in exDates array
         * @type {Number}
         * @private
         */
        exDateInc: 0,
        /**
         * Current negative date.
         *
         * @type {ICAL.Time}
         * @private
         */
        exDate: null,
        /**
         * Current additional date.
         *
         * @type {ICAL.Time}
         * @private
         */
        ruleDate: null,
        /**
         * Start date of recurring rules.
         *
         * @type {ICAL.Time}
         */
        dtstart: null,
        /**
         * Last expanded time
         *
         * @type {ICAL.Time}
         */
        last: null,
        /**
         * Initialize the recurrence expansion from the data object. The options
         * object may also contain additional members, see the
         * {@link ICAL.RecurExpansion constructor} for more details.
         *
         * @param {Object} options
         *        Recurrence expansion options
         * @param {ICAL.Time} options.dtstart
         *        Start time of the event
         * @param {ICAL.Component=} options.component
         *        Component for expansion, required if not resuming.
         */
        fromData: function(options) {
          var start = ICAL2.helpers.formatClassType(options.dtstart, ICAL2.Time);
          if (!start) {
            throw new Error(".dtstart (ICAL.Time) must be given");
          } else {
            this.dtstart = start;
          }
          if (options.component) {
            this._init(options.component);
          } else {
            this.last = formatTime(options.last) || start.clone();
            if (!options.ruleIterators) {
              throw new Error(".ruleIterators or .component must be given");
            }
            this.ruleIterators = options.ruleIterators.map(function(item) {
              return ICAL2.helpers.formatClassType(item, ICAL2.RecurIterator);
            });
            this.ruleDateInc = options.ruleDateInc;
            this.exDateInc = options.exDateInc;
            if (options.ruleDates) {
              this.ruleDates = options.ruleDates.map(formatTime);
              this.ruleDate = this.ruleDates[this.ruleDateInc];
            }
            if (options.exDates) {
              this.exDates = options.exDates.map(formatTime);
              this.exDate = this.exDates[this.exDateInc];
            }
            if (typeof options.complete !== "undefined") {
              this.complete = options.complete;
            }
          }
        },
        /**
         * Retrieve the next occurrence in the series.
         * @return {ICAL.Time}
         */
        next: function() {
          var iter;
          var ruleOfDay;
          var next;
          var compare;
          var maxTries = 500;
          var currentTry = 0;
          while (true) {
            if (currentTry++ > maxTries) {
              throw new Error(
                "max tries have occured, rule may be impossible to forfill."
              );
            }
            next = this.ruleDate;
            iter = this._nextRecurrenceIter(this.last);
            if (!next && !iter) {
              this.complete = true;
              break;
            }
            if (!next || iter && next.compare(iter.last) > 0) {
              next = iter.last.clone();
              iter.next();
            }
            if (this.ruleDate === next) {
              this._nextRuleDay();
            }
            this.last = next;
            if (this.exDate) {
              compare = this.exDate.compare(this.last);
              if (compare < 0) {
                this._nextExDay();
              }
              if (compare === 0) {
                this._nextExDay();
                continue;
              }
            }
            return this.last;
          }
        },
        /**
         * Converts object into a serialize-able format. This format can be passed
         * back into the expansion to resume iteration.
         * @return {Object}
         */
        toJSON: function() {
          function toJSON(item) {
            return item.toJSON();
          }
          var result = /* @__PURE__ */ Object.create(null);
          result.ruleIterators = this.ruleIterators.map(toJSON);
          if (this.ruleDates) {
            result.ruleDates = this.ruleDates.map(toJSON);
          }
          if (this.exDates) {
            result.exDates = this.exDates.map(toJSON);
          }
          result.ruleDateInc = this.ruleDateInc;
          result.exDateInc = this.exDateInc;
          result.last = this.last.toJSON();
          result.dtstart = this.dtstart.toJSON();
          result.complete = this.complete;
          return result;
        },
        /**
         * Extract all dates from the properties in the given component. The
         * properties will be filtered by the property name.
         *
         * @private
         * @param {ICAL.Component} component        The component to search in
         * @param {String} propertyName             The property name to search for
         * @return {ICAL.Time[]}                    The extracted dates.
         */
        _extractDates: function(component, propertyName) {
          function handleProp(prop2) {
            idx = ICAL2.helpers.binsearchInsert(
              result,
              prop2,
              compareTime
            );
            result.splice(idx, 0, prop2);
          }
          var result = [];
          var props = component.getAllProperties(propertyName);
          var len = props.length;
          var i = 0;
          var prop;
          var idx;
          for (; i < len; i++) {
            props[i].getValues().forEach(handleProp);
          }
          return result;
        },
        /**
         * Initialize the recurrence expansion.
         *
         * @private
         * @param {ICAL.Component} component    The component to initialize from.
         */
        _init: function(component) {
          this.ruleIterators = [];
          this.last = this.dtstart.clone();
          if (!isRecurringComponent(component)) {
            this.ruleDate = this.last.clone();
            this.complete = true;
            return;
          }
          if (component.hasProperty("rdate")) {
            this.ruleDates = this._extractDates(component, "rdate");
            if (this.ruleDates[0] && this.ruleDates[0].compare(this.dtstart) < 0) {
              this.ruleDateInc = 0;
              this.last = this.ruleDates[0].clone();
            } else {
              this.ruleDateInc = ICAL2.helpers.binsearchInsert(
                this.ruleDates,
                this.last,
                compareTime
              );
            }
            this.ruleDate = this.ruleDates[this.ruleDateInc];
          }
          if (component.hasProperty("rrule")) {
            var rules = component.getAllProperties("rrule");
            var i = 0;
            var len = rules.length;
            var rule;
            var iter;
            for (; i < len; i++) {
              rule = rules[i].getFirstValue();
              iter = rule.iterator(this.dtstart);
              this.ruleIterators.push(iter);
              iter.next();
            }
          }
          if (component.hasProperty("exdate")) {
            this.exDates = this._extractDates(component, "exdate");
            this.exDateInc = ICAL2.helpers.binsearchInsert(
              this.exDates,
              this.last,
              compareTime
            );
            this.exDate = this.exDates[this.exDateInc];
          }
        },
        /**
         * Advance to the next exdate
         * @private
         */
        _nextExDay: function() {
          this.exDate = this.exDates[++this.exDateInc];
        },
        /**
         * Advance to the next rule date
         * @private
         */
        _nextRuleDay: function() {
          this.ruleDate = this.ruleDates[++this.ruleDateInc];
        },
        /**
         * Find and return the recurrence rule with the most recent event and
         * return it.
         *
         * @private
         * @return {?ICAL.RecurIterator}    Found iterator.
         */
        _nextRecurrenceIter: function() {
          var iters = this.ruleIterators;
          if (iters.length === 0) {
            return null;
          }
          var len = iters.length;
          var iter;
          var iterTime;
          var iterIdx = 0;
          var chosenIter;
          for (; iterIdx < len; iterIdx++) {
            iter = iters[iterIdx];
            iterTime = iter.last;
            if (iter.completed) {
              len--;
              if (iterIdx !== 0) {
                iterIdx--;
              }
              iters.splice(iterIdx, 1);
              continue;
            }
            if (!chosenIter || chosenIter.last.compare(iterTime) > 0) {
              chosenIter = iter;
            }
          }
          return chosenIter;
        }
      };
      return RecurExpansion;
    }();
    ICAL2.Event = function() {
      function Event2(component, options) {
        if (!(component instanceof ICAL2.Component)) {
          options = component;
          component = null;
        }
        if (component) {
          this.component = component;
        } else {
          this.component = new ICAL2.Component("vevent");
        }
        this._rangeExceptionCache = /* @__PURE__ */ Object.create(null);
        this.exceptions = /* @__PURE__ */ Object.create(null);
        this.rangeExceptions = [];
        if (options && options.strictExceptions) {
          this.strictExceptions = options.strictExceptions;
        }
        if (options && options.exceptions) {
          options.exceptions.forEach(this.relateException, this);
        } else if (this.component.parent && !this.isRecurrenceException()) {
          this.component.parent.getAllSubcomponents("vevent").forEach(function(event) {
            if (event.hasProperty("recurrence-id")) {
              this.relateException(event);
            }
          }, this);
        }
      }
      Event2.prototype = {
        THISANDFUTURE: "THISANDFUTURE",
        /**
         * List of related event exceptions.
         *
         * @type {ICAL.Event[]}
         */
        exceptions: null,
        /**
         * When true, will verify exceptions are related by their UUID.
         *
         * @type {Boolean}
         */
        strictExceptions: false,
        /**
         * Relates a given event exception to this object.  If the given component
         * does not share the UID of this event it cannot be related and will throw
         * an exception.
         *
         * If this component is an exception it cannot have other exceptions
         * related to it.
         *
         * @param {ICAL.Component|ICAL.Event} obj       Component or event
         */
        relateException: function(obj) {
          if (this.isRecurrenceException()) {
            throw new Error("cannot relate exception to exceptions");
          }
          if (obj instanceof ICAL2.Component) {
            obj = new ICAL2.Event(obj);
          }
          if (this.strictExceptions && obj.uid !== this.uid) {
            throw new Error("attempted to relate unrelated exception");
          }
          var id = obj.recurrenceId.toString();
          this.exceptions[id] = obj;
          if (obj.modifiesFuture()) {
            var item = [
              obj.recurrenceId.toUnixTime(),
              id
            ];
            var idx = ICAL2.helpers.binsearchInsert(
              this.rangeExceptions,
              item,
              compareRangeException
            );
            this.rangeExceptions.splice(idx, 0, item);
          }
        },
        /**
         * Checks if this record is an exception and has the RANGE=THISANDFUTURE
         * value.
         *
         * @return {Boolean}        True, when exception is within range
         */
        modifiesFuture: function() {
          if (!this.component.hasProperty("recurrence-id")) {
            return false;
          }
          var range = this.component.getFirstProperty("recurrence-id").getParameter("range");
          return range === this.THISANDFUTURE;
        },
        /**
         * Finds the range exception nearest to the given date.
         *
         * @param {ICAL.Time} time usually an occurrence time of an event
         * @return {?ICAL.Event} the related event/exception or null
         */
        findRangeException: function(time) {
          if (!this.rangeExceptions.length) {
            return null;
          }
          var utc = time.toUnixTime();
          var idx = ICAL2.helpers.binsearchInsert(
            this.rangeExceptions,
            [utc],
            compareRangeException
          );
          idx -= 1;
          if (idx < 0) {
            return null;
          }
          var rangeItem = this.rangeExceptions[idx];
          if (utc < rangeItem[0]) {
            return null;
          }
          return rangeItem[1];
        },
        /**
         * This object is returned by {@link ICAL.Event#getOccurrenceDetails getOccurrenceDetails}
         *
         * @typedef {Object} occurrenceDetails
         * @memberof ICAL.Event
         * @property {ICAL.Time} recurrenceId       The passed in recurrence id
         * @property {ICAL.Event} item              The occurrence
         * @property {ICAL.Time} startDate          The start of the occurrence
         * @property {ICAL.Time} endDate            The end of the occurrence
         */
        /**
         * Returns the occurrence details based on its start time.  If the
         * occurrence has an exception will return the details for that exception.
         *
         * NOTE: this method is intend to be used in conjunction
         *       with the {@link ICAL.Event#iterator iterator} method.
         *
         * @param {ICAL.Time} occurrence time occurrence
         * @return {ICAL.Event.occurrenceDetails} Information about the occurrence
         */
        getOccurrenceDetails: function(occurrence) {
          var id = occurrence.toString();
          var utcId = occurrence.convertToZone(ICAL2.Timezone.utcTimezone).toString();
          var item;
          var result = {
            //XXX: Clone?
            recurrenceId: occurrence
          };
          if (id in this.exceptions) {
            item = result.item = this.exceptions[id];
            result.startDate = item.startDate;
            result.endDate = item.endDate;
            result.item = item;
          } else if (utcId in this.exceptions) {
            item = this.exceptions[utcId];
            result.startDate = item.startDate;
            result.endDate = item.endDate;
            result.item = item;
          } else {
            var rangeExceptionId = this.findRangeException(
              occurrence
            );
            var end;
            if (rangeExceptionId) {
              var exception = this.exceptions[rangeExceptionId];
              result.item = exception;
              var startDiff = this._rangeExceptionCache[rangeExceptionId];
              if (!startDiff) {
                var original = exception.recurrenceId.clone();
                var newStart = exception.startDate.clone();
                original.zone = newStart.zone;
                startDiff = newStart.subtractDate(original);
                this._rangeExceptionCache[rangeExceptionId] = startDiff;
              }
              var start = occurrence.clone();
              start.zone = exception.startDate.zone;
              start.addDuration(startDiff);
              end = start.clone();
              end.addDuration(exception.duration);
              result.startDate = start;
              result.endDate = end;
            } else {
              end = occurrence.clone();
              end.addDuration(this.duration);
              result.endDate = end;
              result.startDate = occurrence;
              result.item = this;
            }
          }
          return result;
        },
        /**
         * Builds a recur expansion instance for a specific point in time (defaults
         * to startDate).
         *
         * @param {ICAL.Time} startTime     Starting point for expansion
         * @return {ICAL.RecurExpansion}    Expansion object
         */
        iterator: function(startTime) {
          return new ICAL2.RecurExpansion({
            component: this.component,
            dtstart: startTime || this.startDate
          });
        },
        /**
         * Checks if the event is recurring
         *
         * @return {Boolean}        True, if event is recurring
         */
        isRecurring: function() {
          var comp = this.component;
          return comp.hasProperty("rrule") || comp.hasProperty("rdate");
        },
        /**
         * Checks if the event describes a recurrence exception. See
         * {@tutorial terminology} for details.
         *
         * @return {Boolean}    True, if the event describes a recurrence exception
         */
        isRecurrenceException: function() {
          return this.component.hasProperty("recurrence-id");
        },
        /**
         * Returns the types of recurrences this event may have.
         *
         * Returned as an object with the following possible keys:
         *
         *    - YEARLY
         *    - MONTHLY
         *    - WEEKLY
         *    - DAILY
         *    - MINUTELY
         *    - SECONDLY
         *
         * @return {Object.<ICAL.Recur.frequencyValues, Boolean>}
         *          Object of recurrence flags
         */
        getRecurrenceTypes: function() {
          var rules = this.component.getAllProperties("rrule");
          var i = 0;
          var len = rules.length;
          var result = /* @__PURE__ */ Object.create(null);
          for (; i < len; i++) {
            var value = rules[i].getFirstValue();
            result[value.freq] = true;
          }
          return result;
        },
        /**
         * The uid of this event
         * @type {String}
         */
        get uid() {
          return this._firstProp("uid");
        },
        set uid(value) {
          this._setProp("uid", value);
        },
        /**
         * The start date
         * @type {ICAL.Time}
         */
        get startDate() {
          return this._firstProp("dtstart");
        },
        set startDate(value) {
          this._setTime("dtstart", value);
        },
        /**
         * The end date. This can be the result directly from the property, or the
         * end date calculated from start date and duration. Setting the property
         * will remove any duration properties.
         * @type {ICAL.Time}
         */
        get endDate() {
          var endDate = this._firstProp("dtend");
          if (!endDate) {
            var duration = this._firstProp("duration");
            endDate = this.startDate.clone();
            if (duration) {
              endDate.addDuration(duration);
            } else if (endDate.isDate) {
              endDate.day += 1;
            }
          }
          return endDate;
        },
        set endDate(value) {
          if (this.component.hasProperty("duration")) {
            this.component.removeProperty("duration");
          }
          this._setTime("dtend", value);
        },
        /**
         * The duration. This can be the result directly from the property, or the
         * duration calculated from start date and end date. Setting the property
         * will remove any `dtend` properties.
         * @type {ICAL.Duration}
         */
        get duration() {
          var duration = this._firstProp("duration");
          if (!duration) {
            return this.endDate.subtractDateTz(this.startDate);
          }
          return duration;
        },
        set duration(value) {
          if (this.component.hasProperty("dtend")) {
            this.component.removeProperty("dtend");
          }
          this._setProp("duration", value);
        },
        /**
         * The location of the event.
         * @type {String}
         */
        get location() {
          return this._firstProp("location");
        },
        set location(value) {
          return this._setProp("location", value);
        },
        /**
         * The attendees in the event
         * @type {ICAL.Property[]}
         * @readonly
         */
        get attendees() {
          return this.component.getAllProperties("attendee");
        },
        /**
         * The event summary
         * @type {String}
         */
        get summary() {
          return this._firstProp("summary");
        },
        set summary(value) {
          this._setProp("summary", value);
        },
        /**
         * The event description.
         * @type {String}
         */
        get description() {
          return this._firstProp("description");
        },
        set description(value) {
          this._setProp("description", value);
        },
        /**
         * The event color from [rfc7986](https://datatracker.ietf.org/doc/html/rfc7986)
         * @type {String}
         */
        get color() {
          return this._firstProp("color");
        },
        set color(value) {
          this._setProp("color", value);
        },
        /**
         * The organizer value as an uri. In most cases this is a mailto: uri, but
         * it can also be something else, like urn:uuid:...
         * @type {String}
         */
        get organizer() {
          return this._firstProp("organizer");
        },
        set organizer(value) {
          this._setProp("organizer", value);
        },
        /**
         * The sequence value for this event. Used for scheduling
         * see {@tutorial terminology}.
         * @type {Number}
         */
        get sequence() {
          return this._firstProp("sequence");
        },
        set sequence(value) {
          this._setProp("sequence", value);
        },
        /**
         * The recurrence id for this event. See {@tutorial terminology} for details.
         * @type {ICAL.Time}
         */
        get recurrenceId() {
          return this._firstProp("recurrence-id");
        },
        set recurrenceId(value) {
          this._setTime("recurrence-id", value);
        },
        /**
         * Set/update a time property's value.
         * This will also update the TZID of the property.
         *
         * TODO: this method handles the case where we are switching
         * from a known timezone to an implied timezone (one without TZID).
         * This does _not_ handle the case of moving between a known
         *  (by TimezoneService) timezone to an unknown timezone...
         *
         * We will not add/remove/update the VTIMEZONE subcomponents
         *  leading to invalid ICAL data...
         * @private
         * @param {String} propName     The property name
         * @param {ICAL.Time} time      The time to set
         */
        _setTime: function(propName, time) {
          var prop = this.component.getFirstProperty(propName);
          if (!prop) {
            prop = new ICAL2.Property(propName);
            this.component.addProperty(prop);
          }
          if (time.zone === ICAL2.Timezone.localTimezone || time.zone === ICAL2.Timezone.utcTimezone) {
            prop.removeParameter("tzid");
          } else {
            prop.setParameter("tzid", time.zone.tzid);
          }
          prop.setValue(time);
        },
        _setProp: function(name, value) {
          this.component.updatePropertyWithValue(name, value);
        },
        _firstProp: function(name) {
          return this.component.getFirstPropertyValue(name);
        },
        /**
         * The string representation of this event.
         * @return {String}
         */
        toString: function() {
          return this.component.toString();
        }
      };
      function compareRangeException(a, b) {
        if (a[0] > b[0])
          return 1;
        if (b[0] > a[0])
          return -1;
        return 0;
      }
      return Event2;
    }();
    ICAL2.ComponentParser = function() {
      function ComponentParser(options) {
        if (typeof options === "undefined") {
          options = {};
        }
        var key;
        for (key in options) {
          if (options.hasOwnProperty(key)) {
            this[key] = options[key];
          }
        }
      }
      ComponentParser.prototype = {
        /**
         * When true, parse events
         *
         * @type {Boolean}
         */
        parseEvent: true,
        /**
         * When true, parse timezones
         *
         * @type {Boolean}
         */
        parseTimezone: true,
        /* SAX like events here for reference */
        /**
         * Fired when parsing is complete
         * @callback
         */
        oncomplete: (
          /* istanbul ignore next */
          function() {
          }
        ),
        /**
         * Fired if an error occurs during parsing.
         *
         * @callback
         * @param {Error} err details of error
         */
        onerror: (
          /* istanbul ignore next */
          function(err) {
          }
        ),
        /**
         * Fired when a top level component (VTIMEZONE) is found
         *
         * @callback
         * @param {ICAL.Timezone} component     Timezone object
         */
        ontimezone: (
          /* istanbul ignore next */
          function(component) {
          }
        ),
        /**
         * Fired when a top level component (VEVENT) is found.
         *
         * @callback
         * @param {ICAL.Event} component    Top level component
         */
        onevent: (
          /* istanbul ignore next */
          function(component) {
          }
        ),
        /**
         * Process a string or parse ical object.  This function itself will return
         * nothing but will start the parsing process.
         *
         * Events must be registered prior to calling this method.
         *
         * @param {ICAL.Component|String|Object} ical      The component to process,
         *        either in its final form, as a jCal Object, or string representation
         */
        process: function(ical) {
          if (typeof ical === "string") {
            ical = ICAL2.parse(ical);
          }
          if (!(ical instanceof ICAL2.Component)) {
            ical = new ICAL2.Component(ical);
          }
          var components = ical.getAllSubcomponents();
          var i = 0;
          var len = components.length;
          var component;
          for (; i < len; i++) {
            component = components[i];
            switch (component.name) {
              case "vtimezone":
                if (this.parseTimezone) {
                  var tzid = component.getFirstPropertyValue("tzid");
                  if (tzid) {
                    this.ontimezone(new ICAL2.Timezone({
                      tzid,
                      component
                    }));
                  }
                }
                break;
              case "vevent":
                if (this.parseEvent) {
                  this.onevent(new ICAL2.Event(component));
                }
                break;
              default:
                continue;
            }
          }
          this.oncomplete();
        }
      };
      return ComponentParser;
    }();
  }
});

// app/routes/_index.tsx
var import_react = __toESM(require_react(), 1);
init_dist();
var ICAL = __toESM(require_ical(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}];
var BASE_API_URL = "http://ec2-3-144-236-30.us-east-2.compute.amazonaws.com:3002";
var Student = class {
  constructor(_id, name, email, calendarLink, originalCalendarLink, bedtime, emojis = []) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.calendarLink = calendarLink;
    this.originalCalendarLink = originalCalendarLink;
    this.bedtime = bedtime;
    this.emojis = emojis;
  }
};
var Assignment = class {
  constructor(_id, name, description, date) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.date = date;
  }
};
function Dash() {
  _s();
  const bottomRef = (0, import_react.useRef)(null);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = (0, import_react.useState)(false);
  const [showEmotes, setShowEmotes] = (0, import_react.useState)(true);
  const [response, setResponse] = (0, import_react.useState)("");
  const [signedIn, setSignedIn] = (0, import_react.useState)(false);
  const [assignments, setAssignments] = (0, import_react.useState)([]);
  const [currentStudent, setCurrentStudent] = (0, import_react.useState)(null);
  const [bedtime, setBedtime] = (0, import_react.useState)((currentStudent == null ? void 0 : currentStudent.bedtime) || "");
  const [name, setName] = (0, import_react.useState)((currentStudent == null ? void 0 : currentStudent.name) || "");
  const [calendarLink, setCalendarLink] = (0, import_react.useState)((currentStudent == null ? void 0 : currentStudent.calendarLink) || "");
  const [originalCalendarLink, setOriginalCalendarLink] = (0, import_react.useState)((currentStudent == null ? void 0 : currentStudent.originalCalendarLink) || "");
  const [email, setEmail] = (0, import_react.useState)((currentStudent == null ? void 0 : currentStudent.email) || "");
  const storedStudentId = typeof window !== "undefined" ? localStorage.getItem("studentId") : null;
  function isSignedIn() {
    return true;
  }
  const [students, setStudents] = (0, import_react.useState)([]);
  const fetchStudentData = async () => {
    try {
      const response2 = await fetch(`${BASE_API_URL}/students`);
      if (response2.ok) {
        const studentsData = await response2.json();
        const studentsList = studentsData.map((student) => new Student(student._id, student.name, student.email, student.calendarLink, student.originalCalendarLink, student.bedtime, student.emojis));
        setStudents(studentsList);
        const storedStudentId2 = localStorage.getItem("studentId");
        const currentStudentFromStorage = studentsList.find((student) => student._id === "651e54cab928f5556958a14d");
        if (currentStudentFromStorage && currentStudentFromStorage.calendarLink) {
          setCurrentStudent(currentStudentFromStorage);
          setBedtime(currentStudentFromStorage.bedtime);
          setOriginalCalendarLink(currentStudentFromStorage.originalCalendarLink);
          fetchAndParseICS(currentStudentFromStorage);
        }
      } else {
        console.error("Failed to fetch students:", response2.status, response2.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchAndParseICS = async (student) => {
    if (!student || !student._id) {
      console.error("Student or student ID is missing.");
      return;
    }
    try {
      const proxyURL = `${BASE_API_URL}/api/calendar/${student._id}`;
      const response2 = await fetch(proxyURL);
      if (response2.ok) {
        const data = await response2.text();
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");
        const parsedEvents = vevents.map((vevent) => new ICAL.Event(vevent));
        const assignmentsList = parsedEvents.map((event) => new Assignment(event.uid, event.summary, event.description, event.startDate.toJSDate()));
        setAssignments(assignmentsList);
      } else {
        console.error("Failed to fetch ICS:", response2.status, response2.statusText);
      }
    } catch (error) {
      console.error("Error fetching and parsing ICS:", error);
    }
  };
  (0, import_react.useEffect)(() => {
    document.body.style.overflow = "hidden";
    if (!isSignedIn()) {
      navigate("/onboarding");
    }
    if (storedStudentId) {
      fetchStudentDataById(storedStudentId);
    } else {
      fetchStudentData();
    }
  }, []);
  (0, import_react.useEffect)(() => {
    setName((currentStudent == null ? void 0 : currentStudent.name) || "");
    setCalendarLink((currentStudent == null ? void 0 : currentStudent.calendarLink) || "");
    setEmail((currentStudent == null ? void 0 : currentStudent.email) || "");
    setBedtime((currentStudent == null ? void 0 : currentStudent.bedtime) || "");
  }, [currentStudent]);
  (0, import_react.useEffect)(() => {
    if (currentStudent && currentStudent._id) {
      localStorage.setItem("studentId", currentStudent._id);
    }
  }, [currentStudent]);
  const fetchStudentDataById = async (_id) => {
    if (!_id) {
      console.error("Student ID is not provided.");
      return;
    }
    try {
      const response2 = await fetch(`${BASE_API_URL}/students/${_id}`);
      if (response2.ok) {
        const studentData = await response2.json();
        if (studentData) {
          const student = new Student(studentData._id, studentData.name, studentData.email, studentData.calendarLink, studentData.originalCalendarLink, studentData.bedtime, studentData.emojis);
          setCurrentStudent(student);
          setBedtime(student.bedtime);
          setOriginalCalendarLink(student.originalCalendarLink);
          fetchAndParseICS(student);
        } else {
          console.error("Student with ID not found:", _id);
          fetchStudentData();
        }
      } else {
        console.error("Error fetching student by ID:", response2.statusText);
      }
    } catch (error) {
      console.error("Error fetching student by ID:", error);
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      name,
      originalCalendarLink,
      calendarLink,
      email,
      bedtime
    };
    console.log("Form Data:", obj);
    console.log(obj.bedtime, typeof obj.bedtime);
    if (!currentStudent || !currentStudent._id) {
      console.error("Current student or student ID is missing.");
      return;
    }
    try {
      const response2 = await fetch(`${BASE_API_URL}/students/${currentStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      if (response2.ok) {
        console.log("Student data updated successfully.");
        setCurrentStudent((prevState) => ({
          ...prevState,
          ...obj
        }));
        setBedtime(obj.bedtime);
        setStudents((prevStudents) => {
          const updatedStudents = [...prevStudents];
          const studentIndex = updatedStudents.findIndex((stud) => stud._id === currentStudent._id);
          if (studentIndex !== -1) {
            updatedStudents[studentIndex] = {
              ...updatedStudents[studentIndex],
              ...obj
            };
          }
          return updatedStudents;
        });
        setShowSettings(false);
      } else {
        console.error("Error updating student data:", response2.statusText);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }
  function handleOriginalCalendarLinkChange(e) {
    setOriginalCalendarLink(e.target.value);
  }
  async function handleClick(emote) {
    if (!currentStudent || !currentStudent._id) {
      console.error("Current student or student ID is missing.");
      return;
    }
    document.body.style.overflow = "auto";
    setShowEmotes(false);
    switch (emote) {
      case 1: {
        setResponse("That's good to hear!");
        break;
      }
      case 2: {
        setResponse("Hope you feel better!");
        break;
      }
      case 3: {
        setResponse("Hope you feel better!");
        break;
      }
      case 4: {
        setResponse("Hope you feel better!");
        break;
      }
      default: {
        setResponse("Emote not recognized.");
        break;
      }
    }
    const emojiEvent = {
      emoji: emote,
      timestamp: /* @__PURE__ */ new Date()
    };
    try {
      const studentId = currentStudent == null ? void 0 : currentStudent._id;
      if (!studentId) {
        console.error("Student ID is not available.");
        return;
      }
      const response2 = await fetch(`${BASE_API_URL}/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emojiEvent
        })
      });
      if (!response2.ok) {
        console.error("Error updating emote:", response2.statusText);
      }
    } catch (error) {
      console.error("Error sending emote to server:", error);
    }
  }
  function scrollDown() {
    var startY = 0;
    var stopY = bottomRef.current.offsetTop;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20)
      speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY)
          leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY)
        leapY = stopY;
      timer++;
    }
    return false;
  }
  function scrollUp() {
    var stopY = 0;
    var startY = bottomRef.current.offsetTop;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20)
      speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY)
          leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY)
        leapY = stopY;
      timer++;
    }
    return false;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "scroll-smooth", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-[100vh]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-10 justify-center h-full", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row place-self-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "icons/Carrot_GreenHalo.svg", className: "place-self-center bg-contain w-96 h-96" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 345,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Countdown, { assignments, bedtime }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 346,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 344,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-5xl place-self-center", children: `Hey ${(currentStudent == null ? void 0 : currentStudent.name) || "there"}, it's ${getCurrentDay()}.` }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 348,
          columnNumber: 21
        }, this),
        showEmotes ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col place-self-center space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-medium text-3xl place-self-center", children: "How are you feeling today?" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 351,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row place-self-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-5xl", onClick: () => handleClick(1), children: "\u{1F603}" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 353,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-5xl", onClick: () => handleClick(2), children: "\u{1F4A9}" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 354,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-5xl", onClick: () => handleClick(3), children: "\u{1F614}" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 355,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-5xl", onClick: () => handleClick(4), children: "\u{1F621}" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 356,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 352,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 350,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 349,
          columnNumber: 35
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col place-self-center space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-medium text-3xl place-self-center", children: response }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 361,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-medium text-3xl place-self-center", children: "Your halo is red because you have 5 assignments coming up:" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 362,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 360,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "icons/down-arrow.svg", className: "place-self-center bg-contain absolute bottom-5 animate-bounce cursor-pointer", onClick: () => scrollDown() }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 364,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 359,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 343,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "fixed bottom-4 left-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "icons/settings.svg", onClick: () => setShowSettings(true) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 369,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 368,
        columnNumber: 17
      }, this),
      showSettings ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-auto my-6 mx-auto max-w-3xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gradient-to-tr from-fitalyst-green to-fitalyst-orange border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start justify-between pl-5 pr-5 pt-5 border-solid border-white rounded-t", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-3xl text-white font-bold", children: "Settings" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 379,
            columnNumber: 41
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 378,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { method: "post", encType: "multipart/form-data", action: "# ", onSubmit: handleSubmit, className: "relative p-6 grid grid-cols-2 grid-flow-row justify-evenly gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-fitalyst-orange font-bold text-2xl", children: "Name" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 386,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "name", className: "bg-fitalyst-light-blue border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", defaultValue: currentStudent == null ? void 0 : currentStudent.name, required: true }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 387,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 385,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-fitalyst-green font-bold text-2xl", children: "Bedtime" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 390,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "time", name: "bedtime", onChange: (e) => setBedtime(e.target.value), value: bedtime, className: "bg-fitalyst-light-blue border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", required: true }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 391,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 389,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-fitalyst-orange font-bold text-2xl", children: "Calendar Link" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 394,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "originalCalendarLink", className: "bg-fitalyst-light-blue border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", value: originalCalendarLink, onChange: handleOriginalCalendarLinkChange, required: true }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 395,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 393,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-fitalyst-green font-bold text-2xl", children: "Email" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 400,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", name: "email", className: "bg-fitalyst-light-blue border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", defaultValue: currentStudent == null ? void 0 : currentStudent.email, required: true }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 401,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 399,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-end p-6 rounded-b", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: () => setShowSettings(false), children: "Cancel" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 408,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "submit", onClick: () => setShowSettings(false), children: "Save Changes" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 412,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 407,
              columnNumber: 41
            }, this),
            (currentStudent == null ? void 0 : currentStudent.name) == null && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "submit", onClick: () => navigate("/onboarding"), children: "Onboard" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 418,
              columnNumber: 74
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 384,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 376,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 374,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 372,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 426,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 371,
        columnNumber: 33
      }, this) : null
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 342,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col w-full h-[100vh]", ref: bottomRef, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "icons/up-arrow.svg", className: "bg-contain place-self-center animate-bounce cursor-pointer p-8", onClick: () => scrollUp() }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 430,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col justify-center gap-0", children: assignments.sort((a, b) => a.date.toLocaleString() < b.date.toLocaleString() ? -1 : 1).slice(0, 5).map((assignment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AssignmentTile, { ...assignment }, assignment._id, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 432,
        columnNumber: 135
      }, this)) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 431,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 429,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 341,
    columnNumber: 10
  }, this);
}
_s(Dash, "3tuacHbNAcWTPc1vBrE6GWwoxfk=", false, function() {
  return [useNavigate];
});
_c = Dash;
function Countdown(props) {
  _s2();
  const [date, setDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
  (0, import_react.useEffect)(() => {
    const intervalId = setInterval(() => {
      setDate(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  var countDownDate = new Date(date);
  const [bedHour, bedMinute] = (typeof props.bedtime === "string" ? props.bedtime.split(":") : ["00", "00"]).map((num) => parseInt(num));
  var countDownTime = countDownDate.setHours(bedHour, bedMinute, 0, 0);
  var now = date.getTime();
  var distance = countDownTime - now;
  if (props.assignments.length > 0 && distance > 3 * 60 * 60 * 1e3 && Math.abs(props.assignments[0].date.getTime() - now) < 8 * 60 * 60 * 1e3) {
    var firstAssignment = props.assignments[0].date;
    distance = firstAssignment.getTime() - now;
  }
  if (distance < -4 * 60 * 60 * 1e3)
    distance += 24 * 60 * 60 * 1e3;
  if (distance < 0) {
    var text = "past";
    distance *= -1;
  } else {
    var text = "'til";
  }
  var days = Math.floor(distance / (1e3 * 60 * 60 * 24)) < 10 ? "0" + Math.floor(distance / (1e3 * 60 * 60 * 24)) : Math.floor(distance / (1e3 * 60 * 60 * 24));
  var hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)) < 10 ? "0" + Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)) : Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  var minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60)) < 10 ? "0" + Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60)) : Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60));
  var seconds = Math.floor(distance % (1e3 * 60) / 1e3) < 10 ? "0" + Math.floor(distance % (1e3 * 60) / 1e3) : Math.floor(distance % (1e3 * 60) / 1e3);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col place-self-center place-items-end", children: [
    days == 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: hours }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 474,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "h" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 475,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 473,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: minutes }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 478,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "m" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 479,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 477,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: seconds }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 482,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "s" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 483,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 481,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 472,
      columnNumber: 27
    }, this),
    days != 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: days }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 488,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "d" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 489,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 487,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: hours }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 492,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "h" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 493,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 491,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: minutes }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 496,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "m" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 497,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 495,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row px-2 place-items-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-9xl tabular-nums", children: seconds }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 500,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-light text-6xl", children: "s" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 501,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 499,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 486,
      columnNumber: 27
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-white font-bold text-5xl underline", children: [
      text,
      " \u{1F634}"
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 504,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 471,
    columnNumber: 10
  }, this);
}
_s2(Countdown, "Gqi45WOZhU2c0BLYX0HoJeiR0fk=");
_c2 = Countdown;
function AssignmentTile(props) {
  var distance = props.date.getTime() - (/* @__PURE__ */ new Date()).getTime();
  var days = Math.floor(distance / (1e3 * 60 * 60 * 24)) < 10 ? "0" + Math.floor(distance / (1e3 * 60 * 60 * 24)) : Math.floor(distance / (1e3 * 60 * 60 * 24));
  var hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)) < 10 ? "0" + Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)) : Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row w-full p-2 overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-none w-1/6 h-40 border-4 rounded-l-xl text-white font-medium text-xl text-center flex items-center justify-center overflow-hidden", children: props.name }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 514,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grow h-40 border-t-4 border-b-4 text-white font-medium text-2xl underline text-center flex items-center justify-center overflow-hidden", children: props.description }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 517,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-none w-1/6 h-40 border-4 rounded-r-2xl text-white font-medium text-2xl text-center flex items-center justify-center overflow-hidden", children: [
      days,
      "d ",
      hours,
      "h"
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 520,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 513,
    columnNumber: 10
  }, this);
}
_c3 = AssignmentTile;
function getCurrentDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[(/* @__PURE__ */ new Date()).getDay()];
}
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "Dash");
$RefreshReg$(_c2, "Countdown");
$RefreshReg$(_c3, "AssignmentTile");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Dash as default,
  links
};
//# sourceMappingURL=/build/routes/_index-AYE6VSHX.js.map
