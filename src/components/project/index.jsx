import { Fragment } from 'react';
import { AiOutlineStar, AiOutlineFork } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { ga, languageColor, skeleton } from '../../helpers/utils';

const Project = ({ repo, loading, github, googleAnalytics }) => {
  if (!loading && Array.isArray(repo) && repo.length === 0) {
    return <></>;
  }

  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < github.limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({ width: 'w-32', height: 'h-8' })}
                  </h5>
                </span>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({
                  width: 'w-full',
                  height: 'h-4',
                  className: 'mb-2',
                })}
                {skeleton({ width: 'w-full', height: 'h-4' })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-grow">
                <span className="mr-3 flex items-center">
                  {skeleton({ width: 'w-12', height: 'h-4' })}
                </span>
                <span className="flex items-center">
                  {skeleton({ width: 'w-12', height: 'h-4' })}
                </span>
              </div>
              <div>
                <span className="flex items-center">
                  {skeleton({ width: 'w-12', height: 'h-4' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return array;
  };

  const renderProjects = () => {
      // return repo.map((item, index) => (
      return [
      {
        html_url: 'https://github.com/jmyapple9/CS6135-PDA-VLSI-hw1',
        name: 'Place and Route Tool (PDA HW1)',
        description: 'Completed the P&R flow using Cadence Innovus for a given synthesized standard-cell design while optimizing timing, chip area, and total wirelength without violating any DRC constraints.',
        language: 'C++',
          forks_count: 0,
          stargazers_count: 0,
        },
        {
          html_url: 'https://github.com/jmyapple9/CS6135-PDA-VLSI-hw2',
          name: 'Two-way Min-cut Partitioning (PDA HW2)',
          description: 'Implemented the Fiduccia–Mattheyses algorithm to partition cells into two groups for different die technologies, ensuring the area utilization constraint of each die is not violated. The result cut size decreased by 40% on average.',
          language: 'C++',
          forks_count: 0,
          stargazers_count: 0,
        },
        {
          html_url: 'https://github.com/jmyapple9/CS6135-PDA-VLSI-hw3',
          name: 'Fixed-outline Floorplan Design (PDA HW3)',
          description: 'Implemented an algorithm to place fixed-position hard modules and minimum-area soft modules within a fixed outline, ensuring no overlaps and minimizing the total weighted HPWL. The result HPWL decreased by 48% on average.',
          language: 'C++',
          forks_count: 0,
          stargazers_count: 0,
        },
        { 
          html_url: 'https://github.com/jmyapple9/CS6135-PDA-VLSI-hw4',
          name: 'Global Placement (PDA HW4)',
          description: 'Implemented a global placer to position modules on a chip. Given modules, nets, and pins, it allows overlaps but distributes them for easier later legalization. The result objective (weighted wirelength + density) decreased by 96% on average.',
          language: 'C++',
          forks_count: 0,
          stargazers_count: 0,
        },
        { 
            html_url: 'https://github.com/jmyapple9/fpga_final_project',
            name: 'FPGA legalization & Detailed Placement (FPGA Final Project)',
            description: 'Implemented an algorithm for FPGA legalization and detailed placement to convert global placement results into a legal placement, minimizing the total HPWL. The result HPWL decreased by 36% on average.',
            language: 'C++',
            forks_count: 0,
            stargazers_count: 0,
        },
        {
          html_url: 'https://github.com/jmyapple9/nthu-course-filter',
          name: 'NTHU Course Filter',
          description: 'This custom Tkinter GUI app uses a web crawler to get course info for NTHU\'s 113th semester, allowing users to easily filter courses by department, location, and schedule.',
          language: 'Python',
          forks_count: 0,
          stargazers_count: 0,
        },
      ].map((item,index)=> (
      <a
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        href={item.html_url}
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalytics?.id) {
              ga.event({
                action: 'Click project',
                params: {
                  project: item.name,
                },
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.html_url, '_blank');
        }}
      >
        <div className="flex justify-between flex-col p-8 h-full w-full">
          <div>
            <div className="flex items-center opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="text-base-content inline-block w-5 h-5 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              <span>
                <h5 className="card-title text-lg text-base-content">
                  {item.name}
                </h5>
              </span>
            </div>
            <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          </div>
          <div className="flex justify-between text-sm text-base-content text-opacity-60">
            <div className="flex flex-grow">
              <span className="mr-3 flex items-center">
                <AiOutlineStar className="mr-0.5" />
                <span>{item.stargazers_count}</span>
              </span>
              <span className="flex items-center">
                <AiOutlineFork className="mr-0.5" />
                <span>{item.forks_count}</span>
              </span>
            </div>
            <div>
              <span className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: languageColor(item.language) }}
                />
                <span>{item.language}</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h5 className="card-title">
                    {loading ? (
                      skeleton({ width: 'w-28', height: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                        My Projects
                      </span>
                    )}
                  </h5>
                  {loading ? (
                    skeleton({ width: 'w-10', height: 'h-5' })
                  ) : (
                    <a
                      href={`https://github.com/${github.username}?tab=repositories`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base-content opacity-50"
                    >
                      See All
                    </a>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading || !repo ? renderSkeleton() : renderProjects()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Project.propTypes = {
  repo: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  github: PropTypes.object.isRequired,
  googleAnalytics: PropTypes.object.isRequired,
};

export default Project;
