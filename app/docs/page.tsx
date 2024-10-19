import { DocsFeatures } from '@/components/doc_featuers'
import { Youtube } from '@/components/youtube'
import React from 'react'

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen px-20 pt-10 gap-10">
        <h1 className="sm:text-4xl font-bold text-center mb-5 text-2xl text-muted-foreground">Documentation</h1>
        <section id='youtube' className='px-10 w-full'>
          <div className='flex gap-4 lg:flex-row flex-col'>
            <Youtube/>
            <DocsFeatures/>
          </div>
        </section>
        <section id='readme' className='w-full px-14 py-10'>
        <div>
        <h1 className='text-2xl pb-2 font-semibold'>Project Overview</h1>
        <p className='text-muted-foreground pb-6'>
          The Valorant Team Builder AI Assistant is designed to help users create the best possible team for competing in international Valorant tournaments. By leveraging historical data and advanced LLM, this assistant provides reliable and strategic team formation suggestions.
        </p>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Scope</h2>

        <h3 className='text-xl font-semibold' >Data Collection</h3>
        <ul className='text-muted-foreground'>
          <li>Gather data from the last 3 years of Valorant competition.</li>
          <li>
            Data points include:
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> - Player's Combat Scores</li>
              <li> - Kill/Death Ratio (K/D Ratio)</li>
              <li> - Years of Competitive Valorant Experiences</li>
              <li> - Player roles (Duelist, Initiator, Controller, Sentinel)</li>
            </ul>
          </li>
        </ul>

        <h3 className='font-semibold'>Data Processing and Model Training</h3>
        <ul className='text-muted-foreground pb-6' >
          <li>
            - Use AWS AOSS (Amazon OpenSearch Service) for indexing, and generate Retrieval-Augmented Generation (RAG) to ease LLM on retrieving the data.
          </li>
          <li>- Integrate LLM models with indexed RAG, providing reliable suggestions based on historical performance to users.</li>
        </ul>

        <h3 className='font-semibold'>User Interface</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Develop a web page where users can ask for team formation suggestions.</li>
          <li> - Display results in a graphical illustration to enhance user engagement and understanding.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Features</h2>

        <h3 className='font-semibold'>Historical Data Analysis</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Analyze player performance over the last 3 years to identify trends and key metrics, indexed by Amazon AOSS.</li>
        </ul>

        <h3 className='font-semibold'>AI-Powered Suggestions</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Utilize LLM model to generate team formation suggestions based on historical data, managed by Amazon Bedrock agent.</li>
        </ul>

        <h3 className='font-semibold'>Interactive UI</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Provide a user-friendly interface with graphical illustrations of suggested team formations, backend powered by Amazon EC2.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>System Architecture</h2>
        <img
          src='/docs/workflow.png'
          alt='system-architecture'
          className='w-full p-10'
          />
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li>
            - The system architecture is designed to efficiently process and analyze large datasets, integrating seamlessly with LLM, RAG & APIs to deliver accurate team-building recommendations.
          </li>
          <li> - It includes data collection, processing, generating indexes, and a user-friendly interface for displaying results.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Integration with LLM & RAG</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li>
          - The AI Assistant integrates with a Large Language Model (LLM) using the AWS Bedrock agent.
          </li>
          <li> - This allows the system to utilize advanced natural language processing capabilities to generate insightful suggestions.</li>
          <li> - With RAG, this enhances reliable team formation suggestions based on historical data indexed by Amazon OpenSearch Service.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Unique Capabilities</h2>

        <h3 className='font-semibold'>Historical Data Analysis</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Analyzes player performance over the last 3 years to identify trends and key metrics.</li>
        </ul>

        <h3 className='font-semibold'>AI-Powered Suggestions</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Utilizes a RAG model to generate team formation suggestions based on historical data.</li>
        </ul>

        <h3 className='font-semibold'>Interactive UI</h3>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Provides a user-friendly interface with graphical illustrations of suggested team formations.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Key Features</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li><strong> - Role Specialization:</strong> Ensures balanced team compositions by considering player roles.</li>
          <li><strong> - Performance Metrics:</strong> Evaluates players based on scores, K/D Ratio, experience, and other key metrics.</li>
          <li><strong> - Adaptability:</strong> Offers suggestions that can adapt to different game scenarios and strategies.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Data Models and Visualization</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - BIOT uses advanced data models to process and analyze player performance data.</li>
          <li> - Visualization tools are integrated to present the results in an engaging and easy-to-understand format, enhancing the user experience.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Error Handling and System Reliability</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Robust error-handling mechanisms are in place to ensure system reliability.</li>
          <li> - Implemented multiple pre-commands for the LLM-models, ensuring the AI agent's scope stays within Valorant Team Formation.</li>
          <li> - BIOT is designed to handle data inconsistencies and provide accurate suggestions even in the presence of incomplete or noisy data.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Use Cases and Examples</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li><strong> - Team Formation:</strong> Users can get suggestions for forming a balanced and competitive team.</li>
          <li><strong> - Performance Analysis:</strong> Analyze the performance of individual players or teams over time.</li>
          <li><strong> - Strategy Development:</strong> Develop game strategies based on historical performance data.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Key Challenges and Solutions</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li>
            <strong> - Data Integration:</strong> Ensuring that all data files are correctly read and integrated is crucial. Implementing more robust data validation and integration processes to handle multiple files accurately.
          </li>
          <li>
            <strong> - Model Limitation:</strong> Addressing the limitations of the RAG model in handling large datasets or multiple files. This might involve optimizing the model or exploring alternative models that can better manage complex data inputs.
          </li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Implementation and Usage</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - BIOT is designed for ease of use, with a straightforward interface for inputting data and receiving suggestions.</li>
          <li> - Users can interact with BIOT through a web-based platform, making it accessible from anywhere and on any device.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Development and Deployment</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - The development process involves data collection, model training, and UI design.</li>
          <li> - Deployment is managed through AWS services, ensuring scalability and reliability.</li>
        </ul>

        <h2 className='text-2xl pb-4 pt-2 font-semibold'>Future Directions and Conclusions</h2>
        <ul className='text-muted-foreground pb-6 pl-2'>
          <li> - Enhance BIOT's accuracy with more variables and a broader range of player statistics.</li>
          <li> - Add Versus Mode, which will analyze the win rate of both teams when they compete based on historical data.</li>
        </ul>
      </div>
      </section>
    </div>

  )
}
