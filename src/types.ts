import { Request, Response, NextFunction } from 'express';
export type Job = {
  job: string
};

export type Target = {
  targets: string[],
  labels: Job
};

export type TargetsArray = Target[];

export type JobArray = string[];

export type TargetIpArray = string[];

export type ResponseObject = (req: Request, res: Response, next: NextFunction) => void;

export type PanelObject = {
  title: string;
  expression: string;
  graphType: 'gauge' | 'line';
}