'use client';
import { EditableText } from './editable-text';
import { EditableButton } from './editable-button';
import { EditableContainer } from './editable-container';

export const elementsMap: Record<string, unknown> = {
  Text: EditableText,
  Button: EditableButton,
  Container: EditableContainer,
  Card: EditableContainer,
};
