import { RigidBody } from "@react-three/rapier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import handleSound from "../../../data/sounds/sound";
import {
  testAxisCheck,
  testBuildCheck,
} from "../../../stores/reducers/stateSlice";
import { nftBuildSave, tileUpdate } from "../../../stores/reducers/userSlice";
import { Well } from "../../models/objects/Well";
import Tile from "./Tile";

const Ground = () => {
  const dispatch = useDispatch();
  const tileArr = useSelector((state) => state.user.tile);
  const num = Math.sqrt(tileArr.length);
  const [itemNum, itemName] = useSelector((state) => state.game.selectItem);
  const eventLock = useSelector((state) => state.state.eventLock);
  const textC = useSelector((state) => state.state.testBuild);
  const textB = useSelector((state) => state.user.nftBuildList);

  const handleClick = (data, tileIndex, test) => {
    if (!eventLock && !textC) {
      handleSound("action");
      if (data.status === null && itemName.includes("씨앗")) {
        const timeDate = new Date().toLocaleDateString().slice(0, -1);
        dispatch(
          tileUpdate({
            tile: { newData: itemName, index: tileIndex, timeDate },
          })
        );
      } else if (itemName === "삽") {
        dispatch(
          tileUpdate({
            tile: { newData: null, index: tileIndex, timeDate: null },
          })
        );
      }
    } else if (textC) {
      console.log(data);
      dispatch(nftBuildSave({ build: { x: test[0], z: test[1] } }));
      dispatch(
        testBuildCheck({
          check: false,
        })
      );
    }
  };

  const testCheck = (axis) => {
    dispatch(
      testAxisCheck({
        check: axis,
      })
    );
  };

  return (
    <group position={[0, 0, 0]}>
      {tileArr.map((tileData, index) => (
        <Tile
          key={index}
          tileData={tileData}
          numX={index % num}
          numZ={Math.floor(index / num)}
          index={index}
          handleClick={handleClick}
          testCheck={testCheck}
        />
      ))}
      <RigidBody colliders="hull" type="fixed">
        <group position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh receiveShadow>
            <planeGeometry args={[250, 250]} />
            <meshStandardMaterial color={"#90c57c"} />
          </mesh>
        </group>
      </RigidBody>

      {/* 설치 test 입니다! */}
      {textB.map((model, index) => (
        <group position={[model.x, 0, model.z]} scale={0.2}>
          <Well />
        </group>
      ))}
    </group>
  );
};

export default Ground;
