import React from 'react';

import { Callout } from 'fumadocs-ui/components/callout';

export default function SmartContractWarningCallout() {
  return (
    <Callout type="warn">
      Smart contracts and dApps are not yet supported on Shardeum. The beta version is expected in Q2 2025, with full launch planned for Q3 2025. We are working closely with the community to build the fastest, most affordable parallel-executing EVM platform and we can't wait to get started.
    </Callout>
  );
};