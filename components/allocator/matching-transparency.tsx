"use client";

import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MatchingTransparency, QfEstimateContext } from "@/lib/types";

type MatchingTransparencyProps = {
  matchingTransparency: MatchingTransparency;
  qfEstimateContext: QfEstimateContext;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatInteger(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatWallet(walletAddress: string) {
  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function MatchingTransparencyCard({
  matchingTransparency,
  qfEstimateContext,
}: MatchingTransparencyProps) {
  const visibleDonors = matchingTransparency.donorTraces.slice(0, 16);
  const hiddenDonorCount = Math.max(
    0,
    matchingTransparency.donorTraces.length - visibleDonors.length,
  );

  return (
    <Card className="panel-border bg-card/90 shadow-[0_24px_70px_-54px_color-mix(in_oklab,var(--color-primary)_20%,transparent)]">
      <CardHeader className="border-border/70 gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="eyebrow text-muted-foreground">
            Matching transparency
          </p>
          <CardTitle className="text-foreground text-2xl font-semibold tracking-[-0.03em]">
            Badge-weighting trace
          </CardTitle>
          <p className="text-muted-foreground max-w-3xl text-sm leading-6">
            The canonical estimate checks{" "}
            {qfEstimateContext.badgeContractName} ownership on Ethereum against
            each donation timestamp. Verified badge-holder donations are
            weighted 4x inside the QF formula. Unresolved donations stay
            unboosted.
          </p>
        </div>

        <a
          href={`https://eth.trusteeglobal.com/address/${qfEstimateContext.badgeContractAddress}`}
          target="_blank"
          rel="noreferrer"
          className="border-border/75 bg-background/78 text-foreground hover:border-primary/30 hover:bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-px"
        >
          {qfEstimateContext.badgeContractSymbol} contract
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Verified wallets</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {formatInteger(matchingTransparency.verifiedBadgeDonorWalletCount)}
            </p>
          </div>
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Verified donations</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {formatInteger(matchingTransparency.verifiedBadgeDonationCount)}
            </p>
          </div>
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Verified badge $</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {formatCurrency(matchingTransparency.verifiedBadgeRaisedUsd)}
            </p>
          </div>
          <div className="border-border/75 bg-background/78 rounded-[1.2rem] border px-4 py-3">
            <p className="eyebrow text-muted-foreground">Unresolved</p>
            <p className="text-foreground mt-2 text-xl font-semibold">
              {formatInteger(matchingTransparency.unresolvedDonationCount)}
            </p>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              {formatCurrency(matchingTransparency.unresolvedRaisedUsd)}
            </p>
          </div>
        </div>

        <div className="border-border/80 bg-background/72 rounded-[1.6rem] border">
          <div className="border-border/70 px-4 py-4 md:flex md:items-end md:justify-between">
            <div className="space-y-1">
              <p className="eyebrow text-muted-foreground">
                Verified donor ledger
              </p>
              <p className="text-foreground text-base font-semibold">
                Wallet-level weighting
              </p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm md:mt-0">
              Showing {formatInteger(visibleDonors.length)} of{" "}
              {formatInteger(matchingTransparency.donorTraces.length)} verified
              wallets.
            </p>
          </div>

          {visibleDonors.length > 0 ? (
            <>
              <div className="hidden md:block">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Wallet</TableHead>
                      <TableHead>Window</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Donations</TableHead>
                      <TableHead>Actual $</TableHead>
                      <TableHead>Weighted $</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleDonors.map((donor) => (
                      <TableRow key={donor.walletAddress}>
                        <TableCell className="font-mono text-xs">
                          {formatWallet(donor.walletAddress)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(donor.firstDonationAt)} to{" "}
                          {formatDate(donor.lastDonationAt)}
                        </TableCell>
                        <TableCell>
                          {formatInteger(donor.projectCount)}
                        </TableCell>
                        <TableCell>
                          {formatInteger(donor.donationCount)}
                        </TableCell>
                        <TableCell>{formatCurrency(donor.actualUsd)}</TableCell>
                        <TableCell>
                          {formatCurrency(donor.weightedUsd)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-3 p-3 md:hidden">
                {visibleDonors.map((donor) => (
                  <div
                    key={donor.walletAddress}
                    className="border-border/75 bg-background/82 rounded-[1.4rem] border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-foreground font-mono text-sm font-semibold">
                          {formatWallet(donor.walletAddress)}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {formatDate(donor.firstDonationAt)} to{" "}
                          {formatDate(donor.lastDonationAt)}
                        </p>
                      </div>
                      <p className="text-foreground text-right text-sm font-semibold">
                        {formatCurrency(donor.actualUsd)}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                        <p className="eyebrow text-muted-foreground">
                          Projects
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatInteger(donor.projectCount)}
                        </p>
                      </div>
                      <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                        <p className="eyebrow text-muted-foreground">
                          Donations
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatInteger(donor.donationCount)}
                        </p>
                      </div>
                      <div className="border-border/70 bg-secondary/18 rounded-[1.05rem] border p-3">
                        <p className="eyebrow text-muted-foreground">
                          Weighted
                        </p>
                        <p className="text-foreground mt-2 text-sm font-semibold">
                          {formatCurrency(donor.weightedUsd)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="px-4 py-6">
              <p className="text-muted-foreground text-sm leading-6">
                No verified badge-holder donations were detected yet.
              </p>
            </div>
          )}
        </div>

        <div className="border-border/75 bg-background/72 rounded-[1.35rem] border px-4 py-4">
          <p className="text-foreground text-sm font-semibold">
            Resolution rule
          </p>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Verified rows come from donation timestamps joined against badge
            transfer history. Anonymous donations with no visible wallet remain
            unresolved instead of being guessed from token symbols or wallet
            heuristics.
          </p>
          {hiddenDonorCount > 0 ? (
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {formatInteger(hiddenDonorCount)} additional verified wallets are
              omitted from this panel to keep the page readable.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
