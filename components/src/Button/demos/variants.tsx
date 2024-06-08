/**
 * @title button variants
 * @description button variants description
 */
import { Button, ToggleButton, type ButtonProps } from "rua-components/src";
import { useState } from "react";

export default function () {
  const [isDisabled, setIsDisabled] = useState(false);
  const [shape, setShape] = useState<ButtonProps["shape"]>("round");
  return (
    <div className="row-span-3">
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
    </div>
  );
}
