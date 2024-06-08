import { Radio, RadioGroup } from "rua-components/src";
import { CompGroup, CompPanel } from "../UI/CompPanel";

function TestRadio() {
  return (
    <CompPanel title="Button" className="row-span-2">
      <CompGroup legend="type">
        <RadioGroup>
          <Radio value="苹果" isDisabled></Radio>
        </RadioGroup>
      </CompGroup>
    </CompPanel>
  );
}

export default TestRadio;
