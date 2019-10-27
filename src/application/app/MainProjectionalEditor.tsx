import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { PiEditor, ProjectionalEditor } from "@projectit/core";

import { MyToolbarComponent } from "./toolbars/MyToolbarComponent";
import { PiEditorWithToolbar } from "./toolbars/ToolBarDefinition";
import { DemoEditor } from "./DemoEditor";
import { DemoProjection } from "../../editor/DemoProjection";
import { DemoActions } from "../../editor/DemoActions";
import { DemoContext } from "../../editor/DemoContext";

type Editor = "Demo" ;

@observer
export class MainProjectionalEditor extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
        this.initEditors();
    }

    render() {
        var editor: PiEditorWithToolbar;
            editor = this.demoEditor;
        return (
            <div>
                {editor.mytoolbarItems &&
                (editor.mytoolbarItems.length > 0 && (
                    <MyToolbarComponent editor={editor} toolbar={editor}/>
                ))}
                <div>
                    <ProjectionalEditor editor={editor}/>
                </div>
            </div>
        );
    }

    private demoEditor: DemoEditor;

    initEditors() {
        const demoCtx = new DemoContext();
        const demoActions = new DemoActions();
        const demoProjection = new DemoProjection();
        this.demoEditor = new DemoEditor(demoCtx, demoProjection, demoActions);
        demoProjection.setEditor(this.demoEditor);
    }
}
