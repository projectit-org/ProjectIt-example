import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { MyToolbarComponent } from "./toolbars/MyToolbarComponent";
import { PiEditorWithToolbar } from "./toolbars/ToolBarDefinition";
import { MyToolbarItem } from "./toolbars/MyToolbarItem";

import { PiEditor, ProjectionalEditor } from "@projectit/core";

import { DemoEditor } from "./DemoEditor";
import { TutorialProjection } from "../../editor/TutorialProjection";
import { DemoActions } from "../../editor/DemoActions";
import { DemoContext } from "../../editor/DemoContext";

type Editor = "Demo" ;

@observer
export class MainProjectionalEditor extends React.Component<any, {}> {
    toolbar = {
        mytoolbarItems: [
            { id: "1", label: "DemoT", onClick: (ed: PiEditor) => (this.editorType = "Demo") },
        ]
    };

    @observable editorType: Editor = "Demo";

    constructor(props: any) {
        super(props);
        this.initEditors();
    }

    render() {
        var editor: PiEditorWithToolbar;
            editor = this.demoEditor;
        return (
            <div>
                {this.toolbar.mytoolbarItems && this.toolbar.mytoolbarItems.length > 0 && (
                    <MyToolbarComponent editor={editor} toolbar={this.toolbar}/>
                )}
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
        const demoProjection = new TutorialProjection();
        this.demoEditor = new DemoEditor(demoCtx, demoProjection, demoActions);
        demoProjection.setEditor(this.demoEditor);
    }
}
