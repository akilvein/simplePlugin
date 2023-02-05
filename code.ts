figma.showUI(__html__);

figma.on("selectionchange", () => {
    if (figma.currentPage.selection.length != 1)
    {
      figma.ui.postMessage(
        JSON.stringify(
          {
            type: 'show-props',
            name: 'Select single element',
            string_id: '',
            on_click: '',
            get_data: '',
            set_enabled: false
          }
        )
      );

      return;
    }

    var name = figma.currentPage.selection[0].name;
    var string_id = figma.currentPage.selection[0].getSharedPluginData('ui_converter', 'string_id');
    var on_click = figma.currentPage.selection[0].getSharedPluginData('ui_converter', 'on_click');
    var get_data = figma.currentPage.selection[0].getSharedPluginData('ui_converter', 'get_data');
    
    /*
    console.log("=== reading props ===")
    console.log("name: " + name)
    console.log("string_id: " + string_id)
    console.log("on_click: " + on_click)  
    console.log("get_data: " + get_data)  
    */

    figma.ui.postMessage(
      JSON.stringify(
        {
          type: 'show-props',
          name: name,
          string_id: string_id,
          on_click: on_click,
          get_data: get_data,
          set_enabled: true
        }
      )
    );
  }
)

figma.ui.onmessage = msg => {
  if (msg.type === 'set-props') 
  {
    if (figma.currentPage.selection.length == 1)
    {
      //console.log("=== Setting props ===")

      var string_id = msg.string_id;
      var on_click = msg.on_click;
      var get_data = msg.get_data;

      if (string_id != '') {
        figma.currentPage.selection[0].setSharedPluginData('ui_converter', 'string_id', string_id);
      }

      if (on_click != '') {
        figma.currentPage.selection[0].setSharedPluginData('ui_converter', 'on_click', on_click);
      }

      if (get_data != '') {
        figma.currentPage.selection[0].setSharedPluginData('ui_converter', 'get_data', get_data);
      }
    }
  }
};
