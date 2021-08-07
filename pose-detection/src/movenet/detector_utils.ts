/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {MOVENET_CONFIG, MOVENET_ESTIMATION_CONFIG, VALID_MODELS} from './constants';
import {MoveNetEstimationConfig, MoveNetModelConfig} from './types';

export function validateModelConfig(modelConfig: MoveNetModelConfig):
    MoveNetModelConfig {
  const config = modelConfig == null ? MOVENET_CONFIG : {...modelConfig};

  if (!modelConfig.modelType) {
    modelConfig.modelType = 'SinglePose.Lightning';
  } else if (VALID_MODELS.indexOf(config.modelType) < 0) {
    throw new Error(
        `Invalid architecture ${config.modelType}. ` +
        `Should be one of ${VALID_MODELS}`);
  }

  if (config.enableSmoothing == null) {
    config.enableSmoothing = true;
  }

  if (config.minPoseScore != null &&
      (config.minPoseScore < 0.0 || config.minPoseScore > 1.0)) {
    throw new Error(`minPoseScore should be between 0.0 and 1.0`);
  }

  return config;
}

export function validateEstimationConfig(
    estimationConfig: MoveNetEstimationConfig): MoveNetEstimationConfig {
  const config = estimationConfig == null ? MOVENET_ESTIMATION_CONFIG :
                                            {...estimationConfig};

  return config;
}
