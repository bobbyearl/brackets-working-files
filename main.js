/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/**
* Simple extension to remove the max-height rule on the Working Files area.
*
* Bobby Earl
* bobby@simplyearl.com
**/
define(function (require, exports, module) {
  "use strict";

  var CommandManager = brackets.getModule("command/CommandManager"),
      Menus = brackets.getModule("command/Menus"),
      PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
      prefs = PreferencesManager.getExtensionPrefs("tallerWorkingFiles"),
      menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU),
      commandId = 'bobbyearl.taller-working-files',
      prefKey = 'taller';

    // Create our handler
  CommandManager.register("Taller Working Files", commandId, function() {
    prefs.set(prefKey, !prefs.get(prefKey));
    prefs.save();
  });

    // Add our item to the menu
  menu.addMenuItem(commandId);

  // Set the state of the working files area when our preference is changed
  prefs.definePreference(prefKey, 'boolean', 'false').on('change', function() {
    var on = prefs.get(prefKey);
    CommandManager.get(commandId).setChecked(on);
    $('.open-files-container').css('max-height', on ? 'none' : '200px');
  });
});
