import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Upload } from "../icons";
import { FileDropzone } from "./FileDropzone";

/**
 * Drag-and-drop surface for file uploads. Accepts files via the native picker
 * (click anywhere on the surface or use the optional action button) or via
 * drag-and-drop. Compose the visible content through `FileDropzone.Icon`,
 * `FileDropzone.Caption` and the optional `FileDropzone.Action`.
 *
 * ```tsx
 * <FileDropzone
 *   accept=".xlsx,.csv,.tsv,.numbers"
 *   onFilesSelected={(files) => console.log(files)}
 * >
 *   <FileDropzone.Icon>
 *     <Upload />
 *   </FileDropzone.Icon>
 *   <FileDropzone.Caption>
 *     Add your .xlsx, .csv, .tsv
 *     <br />
 *     or numbers file
 *   </FileDropzone.Caption>
 *   <FileDropzone.Action>Subir archivo</FileDropzone.Action>
 * </FileDropzone>
 * ```
 */
const meta = {
  title: "Components/FileDropzone",
  component: FileDropzone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FileDropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="ui:w-[472px]">
      <FileDropzone accept=".xlsx,.csv,.tsv,.numbers">
        <FileDropzone.Icon>
          <Upload />
        </FileDropzone.Icon>
        <FileDropzone.Caption>
          Add your .xslx, .csv, .tsv
          <br />
          or numbers file
        </FileDropzone.Caption>
      </FileDropzone>
    </div>
  ),
};

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <div className="ui:w-[472px]">
      <FileDropzone accept=".xlsx,.csv,.tsv,.numbers">
        <FileDropzone.Icon>
          <Upload />
        </FileDropzone.Icon>
        <FileDropzone.Caption>
          Add your .xslx, .csv, .tsv
          <br />
          or numbers file
        </FileDropzone.Caption>
        <FileDropzone.Action>Subir archivo</FileDropzone.Action>
      </FileDropzone>
    </div>
  ),
};

export const Disabled: Story = {
  name: "State · disabled",
  render: () => (
    <div className="ui:w-[472px]">
      <FileDropzone disabled accept=".xlsx,.csv,.tsv,.numbers">
        <FileDropzone.Icon>
          <Upload />
        </FileDropzone.Icon>
        <FileDropzone.Caption>
          Add your .xslx, .csv, .tsv
          <br />
          or numbers file
        </FileDropzone.Caption>
        <FileDropzone.Action>Subir archivo</FileDropzone.Action>
      </FileDropzone>
    </div>
  ),
};

export const Invalid: Story = {
  name: "State · invalid",
  render: () => (
    <div className="ui:w-[472px]">
      <FileDropzone aria-invalid accept=".xlsx,.csv,.tsv,.numbers">
        <FileDropzone.Icon>
          <Upload />
        </FileDropzone.Icon>
        <FileDropzone.Caption>
          Add your .xslx, .csv, .tsv
          <br />
          or numbers file
        </FileDropzone.Caption>
        <FileDropzone.Action>Subir archivo</FileDropzone.Action>
      </FileDropzone>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [files, setFiles] = useState<File[]>([]);
      return (
        <div className="ui:flex ui:w-[472px] ui:flex-col ui:gap-3">
          <FileDropzone
            multiple
            accept=".xlsx,.csv,.tsv,.numbers"
            onFilesSelected={(next) => setFiles(next)}
          >
            <FileDropzone.Icon>
              <Upload />
            </FileDropzone.Icon>
            <FileDropzone.Caption>
              Add your .xslx, .csv, .tsv
              <br />
              or numbers file
            </FileDropzone.Caption>
            <FileDropzone.Action>Subir archivo</FileDropzone.Action>
          </FileDropzone>
          {files.length > 0 ? (
            <ul className="ui:flex ui:flex-col ui:gap-1 ui:rounded ui:bg-background-100 ui:p-3 ui:text-[12px] ui:text-text-default">
              {files.map((f) => (
                <li key={`${f.name}-${f.size}`}>
                  {f.name} — {f.size} bytes
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    };
    return <Demo />;
  },
};
