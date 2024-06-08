import { LButton } from "lai-components/src";
import { CompGroup, CompPanel } from "../UI/CompPanel";

function TestButton() {
  return (
    <CompPanel title="Button" className="row-span-6">
      <CompGroup legend="type">
        <LButton type="base">base</LButton>
        <LButton type="primary">primary</LButton>
        <LButton type="secondary">secondary</LButton>
        <LButton type="accent">accent</LButton>
        <LButton type="error">error</LButton>
        <LButton type="success">success</LButton>
        <LButton type="warning">warning</LButton>
      </CompGroup>

      <CompGroup legend="shape">
        <LButton type="secondary">rounded</LButton>
        <LButton shape="square" type="secondary">
          square
        </LButton>
        <LButton shape="circle" type="secondary">
          circle
        </LButton>
      </CompGroup>

      <CompGroup legend="size" className="gap-2">
        <LButton size="small" type="success">
          small
        </LButton>
        <LButton size="middle" type="success">
          middle
        </LButton>
        <LButton size="large" type="success">
          large
        </LButton>
      </CompGroup>

      <CompGroup legend='fill="outline"'>
        <LButton type="base" fill="outline">
          base
        </LButton>
        <LButton type="primary" fill="outline">
          primary
        </LButton>
        <LButton type="secondary" fill="outline">
          secondary
        </LButton>
        <LButton type="accent" fill="outline">
          accent
        </LButton>
        <LButton type="error" fill="outline">
          error
        </LButton>
        <LButton type="success" fill="outline">
          success
        </LButton>
        <LButton type="warning" fill="outline">
          warning
        </LButton>
      </CompGroup>

      <CompGroup legend='fill="text"'>
        <LButton type="base" fill="text">
          base
        </LButton>
        <LButton type="primary" fill="text">
          primary
        </LButton>
        <LButton type="secondary" fill="text">
          secondary
        </LButton>
        <LButton type="accent" fill="text">
          accent
        </LButton>
        <LButton type="error" fill="text">
          error
        </LButton>
        <LButton type="success" fill="text">
          success
        </LButton>
        <LButton type="warning" fill="text">
          warning
        </LButton>
      </CompGroup>
    </CompPanel>
  );
}

export default TestButton;
