import { Button, ToggleButton, type ButtonProps } from "lai-components/src";
import { CompGroup, CompPanel } from "../UI/CompPanel";
import { useState } from "react";

function TestButton() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [shape, setShape] = useState<ButtonProps["shape"]>("round");

  return (
    <CompPanel title="Button" className="row-span-3">
      <CompGroup legend="type">
        <Button isDisabled={isDisabled} shape={shape} variant="base">
          base
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="primary">
          primary
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="secondary">
          secondary
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="accent">
          accent
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="success">
          success
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="warning">
          warning
        </Button>
        <Button isDisabled={isDisabled} shape={shape} variant="error">
          error
        </Button>
      </CompGroup>
      <CompGroup legend="toggle props">
        <ToggleButton
          isSelected={isDisabled}
          onChange={() => setIsDisabled(!isDisabled)}
        >
          {isDisabled ? "isDisabeld:true" : "isDisabeld:false"}
        </ToggleButton>
        <ToggleButton
          isSelected={shape === "round"}
          onChange={() => setShape((s) => (s === "round" ? "circle" : "round"))}
        >
          {shape === "circle" ? "shape:circle" : "shape:round"}
        </ToggleButton>
      </CompGroup>
    </CompPanel>
  );
}

export default TestButton;
