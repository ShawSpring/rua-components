/**
 * @title Introduction
 */
//todo: 导入并渲染readme.md
//@ts-ignore
// import Readme from "../../components/README.mdx";
import Readme from "@components/README.mdx";

import { Button } from "rua-components/src/Button/index.js";
export default function () {
  return (
    <>
      <Readme />
    </>
  );
}
