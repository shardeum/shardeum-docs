import React from 'react';
// Assuming Callout is available, adjust the import path if necessary
// e.g., import { Callout } from 'nextra/components'; or a local path
import { Callout } from 'fumadocs-ui/components/callout';

export default function SmartContractWarningCallout() {
  return (
    <Callout type="warn">
      Shardeum release is a phased rollout, and the initial test version of dApp & smart contract support is expected to be available in Q2 of 2025. Our aim is to work with the community to make this the fastest, parallel executing and affordable EVM platform and we can't wait to get started
    </Callout>
  );
};

