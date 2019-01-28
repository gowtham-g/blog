/*
 *   Plugin developed by CTRL+N.
 *
 *   LICENCE: GPL, LGPL, MPL
 *   NON-COMMERCIAL PLUGIN.
 *
 *   Website: https://www.ctrplusn.net/
 *   Facebook: https://www.facebook.com/ctrlplusn.net/
 *
 */
CKEDITOR.plugins.add('uploadimage', {
    icons: 'uploadimage',
    lang: 'fr,en',
    version: 1.1,
    init: function (editor) {
        // Command
        editor.addCommand('uploadimage', new CKEDITOR.dialogCommand('uploadimageDialog'));
        // Toolbar button
        editor.ui.addButton('UploadImage', {
            label: editor.lang.uploadimage.button,
            command: 'uploadimage',
            toolbar: 'insert'
        });
        // Dialog window
        CKEDITOR.dialog.add('uploadimageDialog', this.path + 'dialogs/uploadimageDialog.js');
    }
});