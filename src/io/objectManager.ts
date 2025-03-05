import { serviceCall } from "../services/serviceCall";
import { logging } from "../utils";
import { getConfig } from "../config/appConfig";
import { InvokeServiceArgs } from "./interfaces";
import { testData } from "../data/testData";

export class ObjectManager {
    protected logger = logging.getLogger('ObjectManager');
    
    invokeServiceCall(data: any, operation: string, controller: string, httpMethod: string): Promise<any> {
        // If using test data, return mock data
        if (getConfig('useTestData')) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Return appropriate test data based on controller and operation
                    switch (controller) {
                        case 'Structures':
                            resolve(testData.structures);
                            break;
                        case 'Items':
                            resolve(testData.items);
                            break;
                        case 'Storages':
                            resolve(testData.storages);
                            break;
                        default:
                            resolve([]);
                    }
                }, 500); // Simulate network delay
            });
        }

        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error("promise timeout"))
            }, getConfig('api').timeout);

            const args: InvokeServiceArgs = {
                operation: operation,
                controller: controller,
                httpMethod: httpMethod,
                fetchApiUrl: getConfig('api').baseUrl,
                requestData: data,
                responseHandler: {
                    success: (result: any) => {
                        console.log(result);
                        resolve(result);
                        clearTimeout(timeoutId);
                    },
                    error: (err: any) => {
                        logging.errorHandler.next("ErrorMessage." + operation);
                        this.logger.error(err);
                        reject(err);
                        clearTimeout(timeoutId);
                    }
                }
            };
            serviceCall.invokeApiService(args);
        });
    }
}