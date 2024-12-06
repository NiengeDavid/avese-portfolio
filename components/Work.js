import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'

export const Skills = ({ title, cards }) => {
	return (
		<div id="skills" className="bg-secondary py-5 px-5">
			<div className="container">
				<h1 className="text-primary fw-bold">{title}</h1>
				<div className="d-flex flex-row flex-wrap justify-content-center">
					{cards.map((value, index) => (
						<Card
							key={index}
							title={value.title}
							description={value.description}
							link={value.link} 
							scope={value.scope}
							/>
					))}
				</div>
			</div>
		</div>
	);
}

export const Education = ({ title, cards }) => {
	return (
		<div id="skills" className="bg-white py-5 px-5">
			<div className="container">
				<h1 className="text-primary fw-bold">{title}</h1>
				<div className="d-flex flex-row flex-wrap justify-content-center">
					{cards.map((value, index) => (
						<Card
							key={index}
							title={value.title}
							description={value.description}
							link={value.link} 
							scope={value.scope}
							/>
					))}
				</div>
			</div>
		</div>
	);
}

export const Skill = ({ title, skills }) => {
	return (
		<div id="skills" className="bg-secondary py-5 px-5">
			<div className="container">
				<h1 className="text-primary fw-bold">{title}</h1>
				<div className="d-flex flex-row flex-wrap justify-content-start">
					{skills.map((value, index) => (
						<li key={index} className="text-dar px-3 py-2 text-start text-nowrap">{value}</li>
					))}
				</div>
			</div>
		</div>
	);
}

export const Projects = ({ title, cards }) => {
	return (
		<div id="projects" className="bg-primary py-5 px-5">
			<div className="container">
				<h1 className="text-light fw-bold">Check out my courses</h1>
				<div className="d-flex flex-row flex-wrap justify-content-center">
					{cards.map((value, index) => (
						<Card
							key={index}
							title={value.title}
							description={value.description}
							icons={value.icons} />
					))}
				</div>
				{/* <div className="text-center">
					<button type="button" className="btn btn-outline-light">See More</button>
				</div> */}
			</div>
		</div>
	);
}

export const Card = ({ title, description, icons, scope }) => {
	return (
		<div className="card py-3 px-3 mx-sm-4 my-4 card-work" style={{ width: "20rem" }}>
			<h4 className="text-primary">{title}</h4>
			<p className="text-dark">{description}</p>
			<div className="text-end">
				{icons && icons.map((value, index) => (
					<Link key={index} href={value.link}>
						<a target="_blank" rel="noreferrer">
							<FontAwesomeIcon className="icon-style mx-1" icon={value.icon} size="2x" />
						</a>
					</Link>
				))}
			</div>
			<div className="text-start d-flex flex-column flex-wrap">
				{scope && scope.map((value, index) => (
					<span key={index} className="text-muted">{value}</span>
				))}
			</div>
		</div>
	);
}